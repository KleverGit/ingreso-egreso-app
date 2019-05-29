import { NgModule } from '@angular/core';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducers';

@NgModule({
    declarations: [
        DashboardComponent,
        DetalleComponent,
        EstadisticaComponent,
        IngresoEgresoComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        DashboardRoutingModule,
        // Cargar lazyStore
        StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
    ],
    providers: [
    ],
    exports: [
        DetalleComponent,
        EstadisticaComponent,
        IngresoEgresoComponent,
        DashboardComponent
    ]
})
export class IngresoEgresoModule {

}
