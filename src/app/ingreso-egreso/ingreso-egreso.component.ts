import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  public forma: FormGroup;
  public tipo = 'ingreso';
  public subscription: Subscription;
  public cargando: boolean;

  constructor(private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl('0', Validators.min(0)),
    });

    this.subscription = this.store.select('ui').subscribe(resp => {
      this.cargando = resp.isLoading;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction);
    const ingresoEgreso = new IngresoEgresoModel({ ...this.forma.value, tipo: this.tipo });
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(resp => {
      this.store.dispatch(new DesactivarLoadingAction);
      Swal.fire({
        title: 'Exito',
        text: 'Ingreso egreso creado correctamente',
        type: 'success',
        confirmButtonText: 'Listo'
      });
    }).catch(
      err => {
        this.store.dispatch(new DesactivarLoadingAction);
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'Error al crear ingreso egreso',
          type: 'error',
          confirmButtonText: 'Listo'
        });
      }
    );

    this.forma.reset({
      'monto': 0
    });
  }

}
