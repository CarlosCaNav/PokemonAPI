import { Component } from '@angular/core';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-cuestionario',/* 
  standalone: true,
  imports: [], */
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent {
  preguntaNombre: Array<string> = [];

  respuestaCorrecta: Array<number> = [];


  constructor(
    public DatosService: DatosService,
  ) {
    for (var i = 0; i <= this.DatosService.numerosPokemonsVisibles; ++i) {
      this.preguntaNombre[i] = this.DatosService.listaPokemonsCuestionario[i].nombre;
    }
    var lugarAleatorio = Math.floor(Math.random() * (this.DatosService.numerosPokemonsVisibles));
    this.preguntaNombre[lugarAleatorio] = this.DatosService.listaPokemonsVisibles[0].nombre;
  }

  respuesta(eleccion: string) {
    if (eleccion == this.DatosService.listaPokemonsVisibles[0].nombre) {
      console.log("ole!");
    }
  }
}
