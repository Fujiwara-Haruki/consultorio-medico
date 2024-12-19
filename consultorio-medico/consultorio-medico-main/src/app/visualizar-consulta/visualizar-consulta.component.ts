import { Component } from '@angular/core';
import { PacienteService } from './paciente.service'; // Certifique-se de ajustar o caminho correto

@Component({
  selector: 'app-visualizar-consulta',
  standalone: false,
  templateUrl: './visualizar-consulta.component.html',
  styleUrls: ['./visualizar-consulta.component.css'],
})

export class VisualizarConsultaComponent {
  cpf: string = ''; // Armazena o CPF inserido pelo usuário
  consultas: any[] = []; // Armazena as consultas retornadas
  mensagem: string = ''; // Exibe mensagens como "Paciente sem consultas"

  constructor(private pacienteService: PacienteService) {}

  buscarConsultas() {
    // Valida o CPF antes de enviar a requisição
    if (!this.cpf) {
      this.mensagem = 'Por favor, insira o CPF do paciente.';
      this.consultas = [];
      return;
    }

    // Chama o serviço para buscar consultas pelo CPF
    this.pacienteService.getConsultasPorCpf(this.cpf).subscribe({
      next: (data: any) => {
        if (data.message) {
          // Caso o backend retorne uma mensagem
          this.mensagem = data.message;
          this.consultas = [];
        } else {
          // Caso existam consultas
          this.consultas = data;
          this.mensagem = '';
        }
      },
      error: (err: any) => {
        // Trata erros de requisição
        if (err.status === 404) {
          this.mensagem = 'Paciente não tem consultas registradas.';
        } else {
          this.mensagem = 'Erro ao buscar consultas. Tente novamente mais tarde.';
        }
        this.consultas = [];
      },
    });
  }
}
