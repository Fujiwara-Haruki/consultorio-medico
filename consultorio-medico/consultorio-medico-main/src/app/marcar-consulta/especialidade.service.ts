import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {
  private apiUrl = 'http://localhost:3000/api/especialidades'; // URL da sua API

  constructor(private http: HttpClient) { }

  getEspecialidades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Retorna a lista de especialidades
  }
}
