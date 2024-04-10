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
  numeroDePreguntas: number = 4;
  numeroDeRespuestas: number = 4;

  preguntas:  Record<string, Array<string> > = {
  "preguntaNombre": [],
  "preguntaPeso":  [],
  "preguntaNombreDos": [],
  "preguntaAltura":  [],}

  respuestasCorrectas: Array<number> = [];
  respuestasUsuario: Array<boolean> = [];



  constructor(
    public DatosService: DatosService,
  ) {
    for (var i = 0; i <= this.numeroDeRespuestas - 1; ++i) {
      this.preguntas["preguntaNombre"][i] = this.DatosService.listaPokemonsCuestionario[i].nombre;
    }
    for (var i = 0; i <= this.numeroDeRespuestas - 1; ++i) {
      this.preguntas["preguntaPeso"][i] = this.DatosService.listaPokemonsCuestionario[i].peso.toString();
    }
    for (var i = 0; i <= this.numeroDeRespuestas - 1; ++i) {
      this.preguntas["preguntaNombre"][i] = this.DatosService.listaPokemonsCuestionario[i].nombre;
    }
    for (var i = 0; i <= this.numeroDeRespuestas - 1; ++i) {
      this.preguntas["preguntaAltura"][i] = this.DatosService.listaPokemonsCuestionario[i].altura.toString();
    }
    for (var i = 0; i <= this.numeroDePreguntas - 1; ++i) {
      var lugarAleatorio = Math.floor(Math.random() * (this.numeroDeRespuestas));
      if(i == 1){
      this.preguntas["preguntaNombre"][lugarAleatorio] = this.DatosService.listaPokemonsVisibles[i].nombre;
      }
      else if(i == 2){
      this.preguntas["preguntaPeso"][lugarAleatorio] = this.DatosService.listaPokemonsVisibles[i].peso.toString();
      }
      else if(i == 3){
      this.preguntas["preguntaNombre"][lugarAleatorio] = this.DatosService.listaPokemonsVisibles[i].nombre;
      }
      else if(i == 4){
      this.preguntas["preguntaAltura"][lugarAleatorio] = this.DatosService.listaPokemonsVisibles[i].altura.toString();
      }
      this.respuestasCorrectas[i] = lugarAleatorio;
    }
  }

  respuesta(eleccion: string, numeroPregunta: number) {
    if (eleccion == this.DatosService.listaPokemonsVisibles[0].nombre ||
      eleccion == this.DatosService.listaPokemonsVisibles[1].peso.toString() ||
      eleccion == this.DatosService.listaPokemonsVisibles[2].nombre ||
      eleccion == this.DatosService.listaPokemonsVisibles[3].altura.toString()      
      ) {
        this.respuestasUsuario[numeroPregunta - 1] = true;
      console.log("ole!");
    }
    else {
      this.respuestasUsuario[numeroPregunta - 1] = false;
      console.log("uff");
    }
    this.DatosService.emergente = "pregunta" + (numeroPregunta + 1);
    console.log(this.DatosService.emergente);
    
      }
  
}
