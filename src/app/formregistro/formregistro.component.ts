import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formregistro',
  templateUrl: './formregistro.component.html',
  styleUrls: ['./formregistro.component.css']
})
export class FormregistroComponent implements OnInit {

  empleadoForm!: FormGroup;
  cargos = [
    {"id": 1, "description": "Gerente"},
    {"id": 2, "description": "Coordinador"},
    {"id": 3, "description": "Subdirector"},
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.empleadoForm = this.initForm();

  }

  onSubmint(): void {
    console.log(1);
  }

  initForm():FormGroup{
    return this.fb.group({
      name: ['', Validators.required],
      datebirth: ['', Validators.required],
      age: ['', Validators.required],
      position: ['', Validators.required],
      
    })
  }

}
