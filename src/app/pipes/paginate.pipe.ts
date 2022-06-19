import { Pipe, PipeTransform } from '@angular/core';
import Empleado from '../interfaces/empleado.interface';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  lengthA! : number;
  x!: number;
  
  transform(empleados: Empleado[], page_size: number, page_number: number, search: string): any[] {

    if(search != ''){
      const filtred = empleados.filter(empleado => empleado.id?.includes(search) || empleado.name.includes(search) || String(empleado.age).includes(search));
      page_size = page_size || 10 ;
      page_number = page_number || 1 ;
      --page_number
      this.lengthA = filtred.length;
      return filtred.slice(page_number*page_size, (page_number + 1)*page_size);
      
    }
    
    else{
      if(!empleados.length) return [];

      page_size = page_size || 10 ;
      page_number = page_number || 1 ;
      --page_number
      this.lengthA = empleados.length
      return empleados.slice(page_number*page_size, (page_number + 1)*page_size);
    }

  }
  
}

