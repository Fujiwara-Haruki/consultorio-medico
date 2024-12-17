import { Component } from '@angular/core';  
import { HttpClientModule } from '@angular/common/http';  

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['cadastrar-paciente.component.css'],
})
export class CadastrarPacienteComponent {
  paciente = {
    nome: '',
    cpf: '',
    email: '',
    nasc: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const url = 'http://localhost/cadastrar-paciente.php'; 

    this.http.post(url, this.paciente).subscribe({
      next: (response) => {
        console.log('Paciente cadastrado com sucesso:', response);
        alert('Paciente cadastrado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao cadastrar paciente:', err);
        alert('Erro ao cadastrar paciente!');
      }
    });
  }
}
