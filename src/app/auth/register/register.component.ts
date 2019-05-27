import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public cargando: boolean;
  constructor(private authService: AuthService, private store: Store<AppState>) {
    this.store.select('ui').subscribe(resp => {
      this.cargando = resp.isLoading;
    });
  }

  ngOnInit() {
  }

  onSubmit(data) {
    console.log(data);
    this.authService.crearUsuario(data.nombre, data.email, data.password);
  }

}
