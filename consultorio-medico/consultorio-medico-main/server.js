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
app.use(express.json());

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

// Rota para pegar todas as especialidades dos médicos
app.get('/api/especialidades', (req, res) => {
  const query = 'SELECT DISTINCT especialidade FROM medicos'; // Supondo que a tabela medicos tem uma coluna "especialidade"
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar especialidades: ', err);
      return res.status(500).json({ error: 'Erro ao buscar especialidades' });
    }
    res.json(results); // Retorna as especialidades
  });
});

app.get('/api/medicos/:especialidade', (req, res) => {
  const especialidade = req.params.especialidade;
  const query = 'SELECT * FROM medicos WHERE especialidade = ?';
  
  db.query(query, [especialidade], (err, results) => {
    if (err) {
      console.error('Erro ao buscar médicos: ', err);
      return res.status(500).json({ error: 'Erro ao buscar médicos' });
    }
    res.json(results); // Retorna os médicos encontrados
  });
});

// Buscar as datas disponíveis para um médico
app.get('/api/horarios-medicos/:medicoNome/datas', (req, res) => {
  const medicoNome = req.params.medicoNome;
  const query = 'SELECT DISTINCT data FROM horarios_medicos WHERE medico_nome = ?';

  db.query(query, [medicoNome], (err, results) => {
    if (err) {
      console.error('Erro ao buscar datas', err);
      return res.status(500).json({ error: 'Erro ao buscar datas disponíveis' });
    }
    res.json(results); // Retorna as datas disponíveis
  });
});

// Buscar os horários disponíveis para um médico em uma data específica
app.get('/api/horarios-medicos/:medicoNome/horarios', (req, res) => {
  const { medicoNome } = req.params;
  const { data } = req.query;
  const query = 'SELECT DISTINCT horario FROM horarios_medicos WHERE medico_nome = ? AND data = ?';

  db.query(query, [medicoNome, data], (err, results) => {
    if (err) {
      console.error('Erro ao buscar horários', err);
      return res.status(500).json({ error: 'Erro ao buscar horários disponíveis' });
    }
    res.json(results); // Retorna os horários disponíveis
  });
});

app.post('/api/marcar-consulta', (req, res) => {
  const { paciente_cpf, medico_nome, data, horario } = req.body;

  const query = 'INSERT INTO consultas (paciente_cpf, medico_nome, data, horario) VALUES (?, ?, ?, ?)';

  db.query(query, [paciente_cpf, medico_nome, data, horario], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao marcar consulta' });
    }
    res.status(201).json({ message: 'Consulta marcada com sucesso' });
  });
});

// Rota para registrar uma consulta
app.post('/api/consultas', (req, res) => {
  const { paciente_cpf, medico_nome, data, horario} = req.body;

  const query = `
    INSERT INTO consultas (paciente_cpf, medico_nome, data, horario) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [paciente_cpf, medico_nome, data, horario], (error, results) => {
    if (error) {
      console.error('Erro ao inserir consulta:', error);
      res.status(500).send({ success: false, message: 'Erro ao registrar a consulta.' });
    } else {
      res.status(201).send({ success: true, message: 'Consulta registrada com sucesso!' });
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
