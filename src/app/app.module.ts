import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Certifique-se de importar o HttpClientModule aqui

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarPacienteComponent } from './cadastrar-paciente/cadastrar-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarPacienteComponent,  // Declaração do componente
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,  // Adicione o HttpClientModule aqui
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
