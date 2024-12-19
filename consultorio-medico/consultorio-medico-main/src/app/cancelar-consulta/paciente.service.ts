import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:3000/api';  // URL do backend

  constructor(private http: HttpClient) {}

  // Buscar consultas pelo CPF
  getConsultasPorCpf(cpf: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pacientes/${cpf}/consultas`);
  }

  // Cancelar uma consulta
  cancelarConsulta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/consultas/${id}`);
  }
}
