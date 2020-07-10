import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '../../../../../node_modules/@angular/forms';
import { ApiService } from 'src/app/core/core/api.service';
import {Task} from '../../../core/core/models/Task';

@Component({
  selector: 'app-tarefadd',
  templateUrl: './tarefadd.component.html',
  styleUrls: ['./tarefadd.component.css']
})
export class TarefaddComponent implements OnInit {

  formCreateTarefa: FormGroup
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
  this.generateForm();
  }

  generateForm() {
    this.formCreateTarefa = this.formBuilder.group({
      name:[''],
      description:[''],
    });
  }

  createTarefa(): void {
    let name = this.formCreateTarefa.value['name']
    let description = this.formCreateTarefa.value['description']
    let task = new Task('1',name,description);
   
  }
}
