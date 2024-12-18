import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastrar-paciente',
  standalone: false,
  
  templateUrl: './cadastrar-paciente.component.html',
  styleUrl: './cadastrar-paciente.component.css'
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
      const url = 'http://localhost:3000/api/pacientes'; // URL da sua API

      this.http.post(url, this.paciente).subscribe({
          next: (response) => {
              console.log('Paciente cadastrado com sucesso:', response);
              alert('Paciente cadastrado com sucesso!');
          },
          error: (err) => {
              console.error('Erro ao cadastrar paciente:', err);
              alert('Erro ao cadastrar paciente!');
          },
      });
  }
}