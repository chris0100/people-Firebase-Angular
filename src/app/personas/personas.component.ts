import {Component, OnInit} from '@angular/core';
import {Persona} from '../persona.model';
import {LoggingService} from '../LoggingService.service';
import {PersonasService} from '../personas.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];

  constructor(private personasService: PersonasService, private router: Router) {
  }

  // Inicializador del arreglo personas usando el servicio
  ngOnInit(): void {
    // Carga las personas de la conexion que hace el service al data
    this.personasService.obtenerPersonas()
      .subscribe(
        (objPersonas: Persona[]) => {
          this.personas = objPersonas;
          // Llama al set para asignar lo cargado desde la BD
          this.personasService.setPersonas(objPersonas);
        }
      );
  }


  // metodo para agregar
  agregar(): void {
    this.router.navigate(['personas/agregar']);
  }


}
