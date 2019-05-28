import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  public ingEgListenerSubscription: Subscription = new Subscription();
  public ingEgListSubscription: Subscription = new Subscription();

  constructor(private angularFireDB: AngularFirestore, private authService: AuthService,
    private store: Store<AppState>) { }

  // ... es un modificador spread para crear nuevas referencias
  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {
    const userModel = this.authService.getUserModel();
    return this.angularFireDB.doc(`${userModel.uid}/ingresos-egresos`).collection('items').add({
      ...ingresoEgreso
    });
  }

  // Escucha cualquire cambio en los items
  initIngresoEgresoListener() {
    this.ingEgListenerSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth !== undefined && auth !== null)
      ).subscribe(resp => {
        console.log(resp.user);
        this.ingresoEgresoItems(resp.user.uid);
      });
  }

  private ingresoEgresoItems(uid: string) {
    this.ingEgListSubscription = this.angularFireDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges().pipe(
        map(
          docData => {
            return docData.map(doc => {
              return {
                ...doc.payload.doc.data(),
                uid: doc.payload.doc.id
              };
            });
          }
        )
      )
      .subscribe((col: any[]) => {
        this.store.dispatch(new SetItemsAction(col));
      });
  }

  cancelarSubscripciones() {
    this.ingEgListenerSubscription.unsubscribe();
    this.ingEgListSubscription.unsubscribe();
  }

  eliminarIngresoEgreso(uid: string) {
    const userModel = this.authService.getUserModel();
    return this.angularFireDB.doc(`${userModel.uid}/ingresos-egresos/items/${uid}`).delete();
  }
}
