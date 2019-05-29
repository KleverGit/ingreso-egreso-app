import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private authService: AuthService) { }

  canActivate() {
    return this.authService.isAuth();
  }


  // se necesita  solo una notificacion que sea emitida o si no nunca va a entrar
  // Para eso se usa el take(1) , solo utiliza una sola subscripcion
  canLoad() {
    return this.authService.isAuth().pipe(
      take(1)
    );
  }

}
