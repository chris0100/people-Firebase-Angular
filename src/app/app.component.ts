import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  titulo = 'listado de personas';

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyD8T1RD-r8GSQ1wx1X7Ncamz2j7Jw-y9zs',
      authDomain: 'listado-personas-ee849.firebaseapp.com'
    });
  }

  isAutenticado(): boolean{
    return this.loginService.isAutenticado();
  }


  salir(): void{
    this.loginService.logout();
  }


}


