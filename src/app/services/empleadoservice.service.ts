import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc, collectionSnapshots} from '@angular/fire/firestore';
import { CollectionReference, getDocFromServer, getDocs, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import Empleado from '../interfaces/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoserviceService {

  constructor(private firestore: Firestore) { }

  addEmpleado(empleado: Empleado){
    const empleadoRef = collection(this.firestore, 'empleados');
    return addDoc(empleadoRef, empleado);
  }

  getEmpleados(): Observable<Empleado[]>{
    const empleadoRef = collection(this.firestore, 'empleados');
    return collectionData(empleadoRef, {idField: 'id'}) as Observable<Empleado[]>;
  }


  deleteEmpleado(empleado: Empleado){
    const empleadoDocRef = doc(this.firestore, `empleados/${empleado.id}`);
    return deleteDoc(empleadoDocRef);
  }

  updateEmpleado(empleado: Empleado, data: any){
    const empleadoDocRef = doc(this.firestore, `empleados/${empleado.id}`);
    return setDoc(empleadoDocRef, data);
  }

  updateStatusEmpleado(empleado: Empleado, status: any){
    const empleadoDocRef = doc(this.firestore, `empleados/${empleado.id}`);
    return updateDoc(empleadoDocRef, {status});
  }

  updateStatusAge(empleado: Empleado, age: any){
    const empleadoDocRef = doc(this.firestore, `empleados/${empleado.id}`);
    return updateDoc(empleadoDocRef, {age});
  }
}
