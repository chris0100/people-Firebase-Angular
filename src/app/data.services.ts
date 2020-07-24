import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Persona} from './persona.model';
import {Observable} from 'rxjs';
import {LoginService} from './login/login.service';

@Injectable()
export class DataServices {

  constructor(private httpClient: HttpClient, private loginService: LoginService) {
  }


  // Cargar personas
  cargarPersonas(): Observable<object> {
    const token = this.loginService.getIdToken();
    return this.httpClient.get('https://listado-personas-ee849.firebaseio.com/datos.json?auth=' + token);
  }


  // Guardar personas
  guardarPersonas(personas: Persona[]): void {
    const token = this.loginService.getIdToken();
    this.httpClient.put('https://listado-personas-ee849.firebaseio.com/datos.json?auth=' + token, personas)
      .subscribe(
        response => console.log('guardado personas correctamente ' + response),
        error => console.log('Error al guardar personas: ' + error)
      );
  }


  // ModificarPersona
  modificarPersona(index: number, persona: Persona): void{
    const token = this.loginService.getIdToken();
    let url: string;
    url = 'https://listado-personas-ee849.firebaseio.com/datos/' + index + '.json?auth=' + token;
    this.httpClient.put(url, persona)
      .subscribe(
        response => console.log('resultado modificar persona: ' + response),
        error => console.log('Error en modificar persona: ' + error));
  }

  // Eliminar Persona
  eliminarPersona(index: number): void{
    const token = this.loginService.getIdToken();
    let url: string;
    url = 'https://listado-personas-ee849.firebaseio.com/datos/' + index + '.json?auth=' + token;
    this.httpClient.delete(url)
      .subscribe(
        response => console.log('resultado eliminar persona: ' + response),
        error => console.log('Error en eliminar persona: ' + error));
  }

}
