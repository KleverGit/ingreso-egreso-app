import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private ingEgService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingEgService.initIngresoEgresoListener();
  }

}
