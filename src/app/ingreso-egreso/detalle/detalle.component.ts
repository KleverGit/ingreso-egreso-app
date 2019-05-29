import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateIE } from '../ingreso-egreso.reducers';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  public items: IngresoEgresoModel[];
  public subscription: Subscription = new Subscription();

  constructor(private store: Store<AppStateIE>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso').subscribe(resp => {
      this.items = resp.items;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem(uid: string) {
    this.ingresoEgresoService.eliminarIngresoEgreso(uid).then(resp => {
      Swal.fire({
        title: 'Exito',
        text: 'Borrar ingreso egreso',
        type: 'success',
        confirmButtonText: 'Listo'
      });
    }).catch();
  }

}
