import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private apiUrl = 'http://localhost:3000/api'; // URL do backend

  constructor(private http: HttpClient) {}

  // Método para buscar consultas por CPF
  getConsultasPorCpf(cpf: string): Observable<any> {
    const apiUrl = `http://localhost:3000/api/pacientes/${cpf}/consultas`;
    return this.http.get(apiUrl);  // Certifique-se de que a URL está completa
  }
  
}
