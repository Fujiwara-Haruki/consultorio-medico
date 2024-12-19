import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosMedicosService {

    private apiUrl = 'http://localhost:3000/api';  // URL base do seu backend

    constructor(private http: HttpClient) { }
  
    // Buscar datas disponíveis para um médico
    getDatasDisponiveis(medicoNome: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/horarios-medicos/${medicoNome}/datas`);
    }
  
    // Buscar horários disponíveis para uma data e médico específicos
    getHorariosDisponiveis(medicoNome: string, data: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/horarios-medicos/${medicoNome}/horarios?data=${data}`);
    }
    registrarConsulta(consulta: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/consultas`, consulta);
    }
}