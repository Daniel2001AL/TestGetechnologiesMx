import { Conditional } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import Empleado from '../interfaces/empleado.interface';
import { PaginatePipe } from '../pipes/paginate.pipe';
import { EmpleadoserviceService } from '../services/empleadoservice.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],

})
export class PruebaComponent implements OnInit {
  public empleadoForm!: FormGroup;
  empleadosList!: Empleado[];
  search: string = '';
  isEdit = false;
  empleadoEdit!: any;
  cargos = [
    {"id": 1, "description": "Gerente"},
    {"id": 2, "description": "Coordinador"},
    {"id": 3, "description": "Subdirector"},
  ];

  page_size: number = 5;
  page_number: number=0;

  constructor(private fb: FormBuilder, private empleadoService: EmpleadoserviceService) { }

  ngOnInit(): void {
    this.empleadoForm = this.initForm();
    this.empleadoService.getEmpleados().subscribe(empleados => {
      this.empleadosList = empleados;
    })
  }

  
//METODO INICIALIZAR FORMULARIO
  initForm():FormGroup{
    return this.fb.group({
      name: ['', Validators.required],
      datebirth: ['', Validators.required],
      age: ['', Validators.required],
      position: ['', Validators.required],
      status:[true, Validators.required]
    })
  }

//METODO BARRA BUSQUEDAD ENVIO A PIPE
  onSearch(inSearch: string){
    this.search = inSearch;
  }


//METODO SUMBIT FORM 
  async onSubmint(){
    const data = this.empleadoForm.value;
    if(this.isEdit === false){
      await this.empleadoService.addEmpleado(data); 
    }else{
      this.empleadoService.updateEmpleado(this.empleadoEdit,data);
    }
    this.empleadoForm = this.initForm();
    this.isEdit = false;
  }

//METODO LLENADO FORMULARIO UPDATE
  updateForm(empleados: Empleado){
    if(empleados.status === true){
      alert("Empleado activo, Favor de cambiar status a incativo para editar");
      this.empleadoForm.disable();
    }else{
      this.empleadoForm.enable();
      this.isEdit = true;
      this.empleadoEdit = this.empleadosList.find(empleado => empleado.id === empleados.id);
      this.empleadoForm.setValue({
        name: this.empleadoEdit?.name,
        datebirth: this.empleadoEdit?.datebirth,
        age: this.empleadoEdit?.age,
        position: this.empleadoEdit?.position,
        status:this.empleadoEdit?.status
      })
    }
    
  }

  //METODO EDAD UPDATE
  updateAge(empleado: Empleado, age:any){
    console.log(age)
    this.empleadoService.updateStatusAge(empleado,age);
  }

  //METODO BORRAR EMPLEADO
  delete(empleado: Empleado){
    this.empleadoService.deleteEmpleado(empleado);
  }

//METODO CAMBIAR STATUS
  changeStatus(empleado: Empleado){
    this.empleadoService.updateStatusEmpleado(empleado, !empleado.status)
  }

  //METODO PARA HABILITAR FORMULARIO
  enable(){
    this.empleadoForm.enable()
  }


  //METODO LIMPIAR FORM
  clear(){
    this.isEdit = false;
    this.empleadoForm = this.initForm();
  }

//MANEJO EVENTOS PAGINACION
  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;
  }

}
