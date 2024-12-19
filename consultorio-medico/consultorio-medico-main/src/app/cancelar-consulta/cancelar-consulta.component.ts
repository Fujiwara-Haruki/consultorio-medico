import { Component } from '@angular/core';
import { PacienteService } from './paciente.service'; // Certifique-se de que o caminho esteja correto

@Component({
  selector: 'app-cancelar-consulta',
  standalone: false,
  templateUrl: './cancelar-consulta.component.html',
  styleUrls: ['./cancelar-consulta.component.css']
})
export class CancelarConsultaComponent {
  cpf: string = '';  // O CPF que o usuário vai buscar
  consultas: any[] = [];  // Lista de consultas encontradas
  mensagem: string = '';  // Mensagem de status (sucesso ou erro)

  constructor(private pacienteService: PacienteService) {}

  // Função para buscar as consultas com base no CPF
  buscarConsultas() {
    if (!this.cpf) {
      this.mensagem = 'Por favor, insira o CPF do paciente.';
      this.consultas = [];
      return;
    }

    // Chama o serviço para buscar as consultas
    this.pacienteService.getConsultasPorCpf(this.cpf).subscribe({
      next: (data) => {
        if (data.message) {
          this.mensagem = data.message;  // Mensagem de erro (caso não haja consultas)
          this.consultas = [];
        } else {
          this.consultas = data;  // Lista de consultas
          this.mensagem = '';
        }
      },
      error: (err) => {
        this.mensagem = 'Erro ao buscar consultas. Tente novamente mais tarde.';
        this.consultas = [];
      }
    });
  }

  // Função para cancelar uma consulta
  cancelarConsulta(id: number) {
    if (confirm('Você tem certeza que deseja cancelar esta consulta?')) {
      this.pacienteService.cancelarConsulta(id).subscribe({
        next: (data) => {
          this.mensagem = data.message;  // Mensagem de sucesso
          // Remover a consulta da lista de consultas exibidas
          this.consultas = this.consultas.filter((consulta) => consulta.id !== id);
        },
        error: (err) => {
          this.mensagem = 'Erro ao cancelar consulta. Tente novamente mais tarde.';
        }
      });
    }
  }
}
