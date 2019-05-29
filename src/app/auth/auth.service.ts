import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { UserModel } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, DeleteUserAction } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userModel: UserModel;

  constructor(private fireAuth: AngularFireAuth, private router: Router,
    private aFDB: AngularFirestore, private store: Store<AppState>) { }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction);
    this.fireAuth.auth.createUserWithEmailAndPassword(email, password).then(resp => {
      const user: UserModel = {
        uid: resp.user.uid,
        nombre: nombre,
        email: resp.user.email
      };

      this.aFDB.doc(`${user.uid}/usuario`).set(user).then(resp => {
        // navegar al dashborad
        this.router.navigate(['/']);
        this.store.dispatch(new DesactivarLoadingAction);
      });

    }).catch(err => {
      console.log(err);
      Swal.fire({
        title: 'Error al crear usuario!',
        text: err.message,
        type: 'error',
        confirmButtonText: 'Listo'
      });
      this.store.dispatch(new DesactivarLoadingAction);
    });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction);
    this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(resp => {
      this.router.navigate(['/']);
      this.store.dispatch(new DesactivarLoadingAction);
    }).catch(err => {
      console.log(err);
      Swal.fire({
        title: 'Error en el login!',
        text: err.message,
        type: 'error',
        confirmButtonText: 'Listo'
      });
      this.store.dispatch(new DesactivarLoadingAction);
    });
  }

  logout() {
    this.store.dispatch(new DeleteUserAction());
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
      if (fuser) {
        this.aFDB.doc(`${fuser.uid}/usuario`).valueChanges().subscribe((userModel: any) => {
          const user = new UserModel(userModel);
          const action = new SetUserAction(user);
          this.store.dispatch(action);
          this.userModel = user;
          console.log('Init auth user', userModel);
        });
      } else {
        this.userModel = null;
      }
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

  getUserModel() {
    return {
      ...this.userModel
    };
  }

}
