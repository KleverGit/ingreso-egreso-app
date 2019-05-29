import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { AppStateIE } from '../ingreso-egreso.reducers';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  public ingresos: number;
  public egresos: number;
  public contaringresos: number;
  public contaregresos: number;
  public subscription: Subscription;

  constructor(private store: Store<AppStateIE>) { }

  ngOnInit() {
    this.store.select('ingresoEgreso').subscribe(resp => {
      this.contarIngresoEgreso(resp.items);
    });
  }

  contarIngresoEgreso(items: IngresoEgresoModel[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.contaringresos = 0;
    this.contaregresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.contaringresos++;
        this.ingresos = this.ingresos + item.monto;
      } else {
        this.contaregresos++;
        this.egresos = this.egresos + item.monto;
      }
    });

  }

}
