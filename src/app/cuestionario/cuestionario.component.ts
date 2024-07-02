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

  enTransportadora: number = 0; /* llegado el momento, el número de pokemons que van de camino a la máquina de pienso */
  fallo: boolean = false; /* ejecutar la animación de fallo */
  libertad: boolean = false; /* ejecutar la animación de acierto */




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

  resultado() {
    const intervalId = setInterval(() => {
      this.enTransportadora += 1;

      if (this.respuestasUsuario[this.enTransportadora - 1] == false) {
        setTimeout(() => {
          this.fallo = true;
          console.log(this.fallo);
        }, 12200);

        setTimeout(() => {
          this.fallo = false;
          console.log(this.fallo);
        }, 14500);
      }/* 
      if (this.respuestasUsuario[contador - 1] == true) {
        setTimeout(() => {
          this.libertad = true;
          console.log(this.fallo);
        }, 11800);

        setTimeout(() => {
          this.libertad = false;
          console.log(this.fallo);
        }, 14000);
      } */
    }, 5000);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 60000)


    /* 
    for (var i = 0; i <= this.DatosService.numerosPokemonsVisibles; i++) {
      setTimeout(() => {
        this.enTransportadora = i;
        console.log(this.enTransportadora);
      }, 2500 * i);


      if (this.respuestasUsuario[i] == false) {
        setTimeout(() => {

          this.fallo = true;
          console.log(this.fallo);
        }, i * 12000);

        setTimeout(() => {
          this.fallo = false;
        }, i * 12200);
      }
    } */

  }
}
