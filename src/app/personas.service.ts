import {Persona} from './persona.model';
import {LoggingService} from './LoggingService.service';
import {Injectable, EventEmitter} from '@angular/core';
import {DataServices} from './data.services';
import {Observable} from 'rxjs';

@Injectable()
export class PersonasService {

  personas: Persona[] = [];
  saludar = new EventEmitter<number>();

  constructor(private loggingService: LoggingService, private dataService: DataServices) {
  }

  setPersonas(personas: Persona[]): void {
    this.personas = personas;
  }

  obtenerPersonas(): Observable<object> {
    return this.dataService.cargarPersonas();
  }


  // Agregar una persona
  agregarPersona(persona: Persona): void {
    this.loggingService.enviaMensajeAConsola('Agregamos persona:' + persona.nombre);

    // Si la BD retorna null, la inicializar en un arreglo vacio
    if (this.personas == null) {
      this.personas = [];
    }
    this.personas.push(persona);
    this.dataService.guardarPersonas(this.personas);
  }



  // Localizar una persona
  encontrarPersona(index: number): Persona {
    const persona: Persona = this.personas[index];
    return persona;
  }



  // Modificar una persona
  modificarPersona(index: number, persona: Persona): void {
    const personaAntigua = this.personas[index];

    // Se modifican los nuevos datos sobre el original ya indexado
    personaAntigua.nombre = persona.nombre;
    personaAntigua.apellido = persona.apellido;

    // Modifica datos en la base de datos
    this.dataService.modificarPersona(index, persona);
  }



  // Eliminar Persona
  eliminarPersona(index: number): void {
    this.personas.splice(index, 1);
    this.dataService.eliminarPersona(index);

    // Se vuelve a guardar el arreglo para inicializar los indices
    this.actualizacionPersonas();
  }



  // Actualiza los datos en la BD
  actualizacionPersonas(): void{
    if (this.personas != null){
      this.dataService.guardarPersonas(this.personas);
    }
  }


}
