import { Component, OnInit } from '@angular/core';
import { EspecialidadeService } from './especialidade.service'; // Importe o serviço
import { HorariosMedicosService } from './horarios-medicos.service'; // Importe o serviço
import { HttpClient } from '@angular/common/http'; // Importe HttpClient

@Component({
  selector: 'app-marcar-consulta',
  standalone: false, 
  templateUrl: './marcar-consulta.component.html',
  styleUrls: ['./marcar-consulta.component.css']
})

export class MarcarConsultaComponent implements OnInit {
  cpf: string = ''; // CPF do paciente
  especialidades: string[] = []; // Lista de especialidades
  medicos: any[] = []; // Lista de médicos filtrados
  especialidadeSelecionada: string = ''; // Especialidade selecionada pelo usuário
  medicoSelecionado: string = ''; // Médico selecionado pelo usuário
  dataSelecionada: string = ''; // Data da consulta
  horarioSelecionado: string = ''; // Horário da consulta
  datasDisponiveis: string[] = []; // Datas disponíveis para o médico
  horariosDisponiveis: string[] = []; // Horários disponíveis para o médico
  erroData: string = ''; // Mensagem de erro caso o paciente selecione uma data indisponível

  constructor(
    private especialidadeService: EspecialidadeService, 
    private horariosMedicosService: HorariosMedicosService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Buscar as especialidades ao carregar o componente
    this.especialidadeService.getEspecialidades().subscribe(
      (data) => {
        this.especialidades = data.map(item => item.especialidade); // Mapeia as especialidades
      },
      (error) => {
        console.error('Erro ao carregar especialidades', error);
      }
    );
  }

  // Função para filtrar os médicos pela especialidade selecionada
  filtrarMedicos(): void {
    if (this.especialidadeSelecionada) {
      this.http.get<any[]>(`http://localhost:3000/api/medicos/${this.especialidadeSelecionada}`).subscribe(
        (data) => {
          this.medicos = data; // Atualiza a lista de médicos com base na especialidade
        },
        (error) => {
          console.error('Erro ao carregar médicos', error);
        }
      );
    }
  }

  // Função para buscar as datas disponíveis para o médico
  filtrarDatasDisponiveis(): void {
    if (this.medicoSelecionado) {
      this.horariosMedicosService.getDatasDisponiveis(this.medicoSelecionado).subscribe(
        (data) => {
          this.datasDisponiveis = data.map(item => item.data); // Preenche as datas disponíveis
          this.erroData = ''; // Limpa qualquer erro anterior
        },
        (error) => {
          console.error('Erro ao carregar datas disponíveis', error);
          this.erroData = 'Erro ao carregar datas disponíveis. Tente novamente mais tarde.';
        }
      );
    }
  }

filtrarHorariosDisponiveis(): void {
    if (this.medicoSelecionado && this.dataSelecionada) {
    // Converter a data para o formato YYYY-MM-DD
    const data = new Date(this.dataSelecionada);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Meses começam do 0
    const dia = data.getDate().toString().padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`; // Formato YYYY-MM-DD

    console.log('Buscando horários para:', this.medicoSelecionado, 'na data:', dataFormatada);

    this.horariosMedicosService.getHorariosDisponiveis(this.medicoSelecionado, dataFormatada).subscribe(
      (data) => {
        console.log('Horários disponíveis:', data);
        if (Array.isArray(data) && data.length > 0) {
          this.horariosDisponiveis = data.map(item => item.horario); // Preenche os horários disponíveis
        } else {
          this.horariosDisponiveis = []; // Se não houver horários, limpa a lista
          this.erroData = 'Nenhum horário disponível para essa data.';
        }
      },
      (error) => {
        console.error('Erro ao carregar horários disponíveis', error);
        this.erroData = 'Erro ao carregar horários disponíveis. Tente novamente mais tarde.';
      }
    );
  }
}


  // Função para marcar a consulta
  marcarConsulta(): void {
    const consulta = {
      paciente_cpf: this.cpf,
      medico_nome: this.medicoSelecionado,
      data: this.dataSelecionada, // Certifique-se de que está no formato YYYY-MM-DD
      horario: this.horarioSelecionado, // Certifique-se de que está no formato HH:mm:ss
    };
  
    this.horariosMedicosService.registrarConsulta(consulta).subscribe(
      (response: any) => {
        alert('Consulta marcada com sucesso!');
        console.log('Consulta registrada:', response);
      },
      (error: any) => {
        alert('Erro ao marcar consulta. Tente novamente mais tarde.');
        console.error('Erro ao registrar consulta:', error);
      }
    );
  }
}
