import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';



@Injectable()
export class LoginService {
  token: string;

  constructor(private router: Router) {
  }


  // Metodo para autenticar y obtener token
  login(email: string, password: string): void {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          firebase.auth().currentUser.getIdToken()
            .then(
              token => {
                this.token = token;
                // Redirecciona a la pagina principal
                this.router.navigate(['/']);
              }
            );
        }
      );


  }


  // Regresa el token obtenido ya despues de autenticado
  getIdToken(): string{
    console.log('el token es ' + this.token);
    return this.token;
  }


  // Revisa si esta o no autenticado
  isAutenticado(): boolean{
    return this.token != null;
  }

  // Metodo para salir de la sesion
  logout(): void{
    firebase.auth().signOut()
      .then(() => {
        this.token = null;
        this.router.navigate(['login']);
      })
      .catch(error => console.log('error al salir de la sesion'));
  }

}
