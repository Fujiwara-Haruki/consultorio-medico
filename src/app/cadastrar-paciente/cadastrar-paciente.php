<?php
header("Access-Control-Allow-Origin: *"); // Permite requisições de qualquer origem
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Captura os dados enviados pelo Angular
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($data) {
    $nome = $data['nome'];
    $cpf = $data['cpf'];
    $email = $data['email'];
    $nasc = $data['nasc'];

    // Configuração do banco de dados
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "consultorio_medico";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die(json_encode(["error" => "Erro na conexão: " . $conn->connect_error]));
    }

    // Inserir os dados na tabela pacientes
    $sql = "INSERT INTO pacientes (nome, cpf, email, nasc) VALUES ('$nome', '$cpf', '$email', '$nasc')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Paciente cadastrado com sucesso!"]);
    } else {
        echo json_encode(["error" => "Erro ao cadastrar: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Dados inválidos."]);
}
?>
