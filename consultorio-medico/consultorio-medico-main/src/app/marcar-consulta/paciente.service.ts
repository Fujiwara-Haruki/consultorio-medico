// paciente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:3000/api';  // URL base do seu backend

  constructor(private http: HttpClient) { }

  // Verificar se o paciente está cadastrado
  verificarPaciente(cpf: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pacientes/${cpf}`);
  }

  // Buscar médicos disponíveis por especialidade
  buscarMedicos(especialidade: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medicos/${especialidade}`);
  }

  // Marcar uma consulta
  marcarConsulta(consulta: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/marcar-consulta`, consulta);
  }
}
