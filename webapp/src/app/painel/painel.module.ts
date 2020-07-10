import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelComponent } from './painel/painel.component';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatButtonModule} from '@angular/material/button'; 
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {AppRoutingModule} from '../app-routing.module';
import {TarefaComponent} from './painel/tarefa/tarefa.component';
import { TarefaddComponent } from './dialog/tarefadd/tarefadd.component';
import { AgendaddComponent } from './dialog/agendadd/agendadd.component'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PainelService } from './painel.service';
import { TarefaeditComponent } from './dialog/tarefaedit/tarefaedit.component';




@NgModule({
  declarations: [PainelComponent, TarefaComponent, AgendaddComponent, TarefaddComponent, TarefaeditComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    AppRoutingModule
    
  ],exports: [PainelComponent,TarefaComponent],
  providers: [PainelService,]
})
export class PainelModule { }
