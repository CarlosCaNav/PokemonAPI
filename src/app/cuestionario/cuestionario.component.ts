import { Component } from '@angular/core';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent {
  numeroDePreguntas: number = 4;
  numeroDeRespuestas: number = 4;

  preguntas: Record<string, Array<string>> = {
    "preguntaNombre": [],
    "preguntaPeso": [],
    "preguntaNombreDos": [],
    "preguntaAltura": [],
  }

  respuestasCorrectas: Array<number> = [];
  respuestasUsuario: Array<boolean> = [];



  constructor(
    public DatosService: DatosService,
  ) {
    for (var i = 0; i <= this.numeroDeRespuestas - 1; ++i) {
      this.preguntas["preguntaNombre"][i] = this.DatosService.listaPokemonsCuestionario[i].nombre;
      this.preguntas["preguntaPeso"][i] = this.DatosService.listaPokemonsCuestionario[i].peso.toString();
      this.preguntas["preguntaNombreDos"][i] = this.DatosService.listaPokemonsCuestionario[i].nombre;
      this.preguntas["preguntaAltura"][i] = this.DatosService.listaPokemonsCuestionario[i].altura.toString();
    }
    for (var i = 0; i <= this.numeroDePreguntas - 1; ++i) {
      var indiceAleatorio = Math.floor(Math.random() * (this.numeroDeRespuestas));


      switch (i) {
        case 0:
          this.preguntas["preguntaNombre"][indiceAleatorio] = this.DatosService.listaPokemonsVisibles[i].nombre;
          break;
        case 1:
          this.preguntas["preguntaPeso"][indiceAleatorio] = this.DatosService.listaPokemonsVisibles[i].peso.toString();
          break;
        case 2:
          this.preguntas["preguntaNombreDos"][indiceAleatorio] = this.DatosService.listaPokemonsVisibles[i].nombre;
          break;
        case 3:
          this.preguntas["preguntaAltura"][indiceAleatorio] = this.DatosService.listaPokemonsVisibles[i].altura.toString();
      }
      this.respuestasCorrectas[i] = indiceAleatorio;
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
