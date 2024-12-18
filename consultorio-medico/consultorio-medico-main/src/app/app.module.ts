import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import necessário
import { FormsModule } from '@angular/forms'; // Adicione esta linha

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcarConsultaComponent } from './marcar-consulta/marcar-consulta.component';
import { HomeComponent } from './home/home.component';
import { CancelarConsultaComponent } from './cancelar-consulta/cancelar-consulta.component';
import { VisualizarConsultaComponent } from './visualizar-consulta/visualizar-consulta.component';
import { CadastrarPacienteComponent } from './cadastrar-paciente/cadastrar-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    MarcarConsultaComponent,
    HomeComponent,
    CancelarConsultaComponent,
    VisualizarConsultaComponent,
    CadastrarPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Certifique-se de que este módulo está aqui
    FormsModule // Adicione esta linha
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
