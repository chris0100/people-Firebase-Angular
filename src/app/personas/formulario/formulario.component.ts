import {Component, OnInit} from '@angular/core';
import {Persona} from '../../persona.model';
import {LoggingService} from '../../LoggingService.service';
import {PersonasService} from '../../personas.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})


export class FormularioComponent implements OnInit {

  nombreInput: string;
  apellidoInput: string;
  index: number;
  modoEdicion: number;


  constructor(private loggingService: LoggingService, private personasService: PersonasService,
              private router: Router, private route: ActivatedRoute) {

    this.personasService.saludar.subscribe(
      (indice: number) => alert('El indice es: ' + (indice + 1))
    );
  }




  ngOnInit(): void {

    // Carga los parametros desde la ruta de edicion.
    this.index = this.route.snapshot.params.id;
    this.modoEdicion = +this.route.snapshot.queryParams.modoEdicion;


    // Si se carga el formulario en modod edicion, se localiza la persona.
    if (this.modoEdicion != null && this.modoEdicion === 1){
      const persona: Persona = this.personasService.encontrarPersona(this.index);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }
  }


  // acceder a referencia local de plantilla(formulario.html)
  // @ViewChild('nombreInput') nombreInput: ElementRef;
  // @ViewChild('apellidoInput') apellidoInput: ElementRef;


  onGuardarPersona(): void {
    // toma los valores ingresados en el input y crea un objeto
    const persona1 = new Persona(this.nombreInput, this.apellidoInput);

    // para editar
    if (this.modoEdicion != null && this.modoEdicion === 1){
      this.personasService.modificarPersona(this.index, persona1);
    }
    else{
      // Llama al metodo del servicio para inyectar el objeto persona.
      this.personasService.agregarPersona(persona1);
    }

    // Usamos el router para que despues de añadido me redireccione a la pagina principal
    this.router.navigate(['personas']);
  }


  eliminarPersona(): void{
    if (this.index != null){
      this.personasService.eliminarPersona(this.index);
    }

    // Redirecciona
    this.router.navigate(['personas']);
  }

}
