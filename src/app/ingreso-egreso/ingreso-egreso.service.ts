import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private angularFireDB: AngularFirestore, private authService: AuthService) { }

  // ... es un modificador spread para crear nuevas referencias
  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {
    const userModel = this.authService.getUserModel();
    return this.angularFireDB.doc(`${userModel.uid}/ingresos-egresos`).collection('items').add({
      ...ingresoEgreso
    });
  }
}
