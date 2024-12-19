const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuração do servidor Express
const app = express();
const port = 3000;  // Porta do servidor

// Configuração do CORS para permitir requisições do Angular
app.use(cors());

// Middleware para processar o corpo das requisições
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',  // Substitua pelo seu host de banco de dados
  user: 'root',       // Seu usuário de banco de dados
  password: '',       // Sua senha de banco de dados
  database: 'databasemedico'  // Seu banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados: ', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida!');
});

// Exemplo de rota para pegar todos os pacientes
app.get('/api/pacientes', (req, res) => {
  const query = 'SELECT * FROM pacientes';  // Exemplo de consulta SQL
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar pacientes: ', err);
      return res.status(500).json({ error: 'Erro ao buscar pacientes' });
    }
    res.json(results);  // Retorna os resultados como JSON
  });
});

// Exemplo de rota para cadastrar um paciente
app.post('/api/pacientes', (req, res) => {
  const { nome, cpf, email, nasc } = req.body;
  const query = 'INSERT INTO pacientes (nome, cpf, email, nasc) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, cpf, email, nasc], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar paciente: ', err);
      return res.status(500).json({ error: 'Erro ao cadastrar paciente' });
    }
    res.status(201).json({ message: 'Paciente cadastrado com sucesso!' });
  });
});

app.get('/api/pacientes/:cpf/consultas', (req, res) => {
  const { cpf } = req.params;

  db.query('SELECT * FROM consultas WHERE paciente_cpf = ?', [cpf], (error, results) => {
    res.json(results); // Retorna as consultas encontradas  
  });
});

// Rota para cancelar uma consulta
app.delete('/api/consultas/:id', (req, res) => {
  const consultaId = req.params.id;

  // Primeiro, vamos remover a consulta
  const deleteQuery = 'DELETE FROM consultas WHERE id = ?';

  db.query(deleteQuery, [consultaId], (err, results) => {
    if (err) {
      console.error('Erro ao cancelar consulta:', err);
      return res.status(500).json({ error: 'Erro ao cancelar consulta' });
    }

    // Se não houver consulta com esse ID
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Consulta não encontrada' });
    }

    res.status(200).json({ message: 'Consulta cancelada com sucesso' });
  });
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
