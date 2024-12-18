import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarPacienteComponent } from './cadastrar-paciente/cadastrar-paciente.component';
import { CancelarConsultaComponent } from './cancelar-consulta/cancelar-consulta.component';
import { HomeComponent } from './home/home.component';
import { MarcarConsultaComponent } from './marcar-consulta/marcar-consulta.component';
import { VisualizarConsultaComponent } from './visualizar-consulta/visualizar-consulta.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'cadastrar-paciente', component: CadastrarPacienteComponent },
  {path: 'marcar-consulta', component: MarcarConsultaComponent },
  {path: 'cancelar-consulta', component: CancelarConsultaComponent },
  {path: 'visualizar-consulta', component: VisualizarConsultaComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
