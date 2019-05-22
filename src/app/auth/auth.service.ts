import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  crearUsuario(nombre: string, email: string, password: string) {
    this.fireAuth.auth.createUserWithEmailAndPassword(email, password).then(resp => {
      // navegar al dashborad
      this.router.navigate(['/']);
    }).catch(err => {
      console.log(err);
      Swal.fire({
        title: 'Error al crear usuario!',
        text: err.message,
        type: 'error',
        confirmButtonText: 'Listo'
      });
    });
  }

  login(email: string, password: string) {
    this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(resp => {
      this.router.navigate(['/']);
    }).catch(err => {
      console.log(err);
      Swal.fire({
        title: 'Error en el login!',
        text: err.message,
        type: 'error',
        confirmButtonText: 'Listo'
      });
    });
  }

  logout() {
    this.fireAuth.auth.signOut().then(resp => {
      console.log('Exito logout');
    }).catch(err => {
      console.log(err);
      Swal.fire({
        title: 'Error al realizar logout!',
        text: err.message,
        type: 'error',
        confirmButtonText: 'Intentar mas tarde'
      });
    });
    this.router.navigate(['/login']);
  }

  initAuthListener() {
    this.fireAuth.authState.subscribe(fuser => {
      console.log('INIT LISTENER', fuser);
    });
  }

  isAuth() {
    return this.fireAuth.authState.pipe(
      map(fuser => {
        if (fuser == null) {
          this.router.navigate(['/login']);
        }
        return fuser != null;
      })
    );
  }

}
