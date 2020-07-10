import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelComponent } from './painel/painel/painel.component';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { TarefaComponent } from './painel/painel/tarefa/tarefa.component';

const routes: Routes = [
  {path: '', redirectTo: '/painel', pathMatch:'full'},
  {path: 'painel', component: PainelComponent
    ,children: [
      {path:'tarefas', component: TarefaComponent}
    ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
