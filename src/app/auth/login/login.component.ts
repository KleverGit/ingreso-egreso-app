import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  public cargando: boolean;
  public subscription: Subscription;
  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe(resp => {
      this.cargando = resp.isLoading;
    });
  }

  login(formData) {
    console.log(formData);
    this.authService.login(formData.email, formData.password);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
