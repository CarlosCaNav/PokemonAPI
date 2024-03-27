import { Component } from '@angular/core';
import { DatosService } from '../datos.service'; /* esto escrito a mano */

@Component({
  selector: 'app-campo',
  templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.css']
})
export class CampoComponent {

  pokemones: Array<Record<string, string | number>> = [];

  constructor(public DatosService: DatosService) { /* lo de los paréntes escrito a mano */

    var anteriorX: Array<number> = [];
    var anteriorY: Array<number> = [];
    var duracionMovimiento: number = 500;
    var duracionBucle: number = duracionMovimiento * (DatosService.numerosPokemonsVisibles + 1);
    var numeroDeMovimientos: number = Math.round(DatosService.tiempodemovimiento / (DatosService.numerosPokemonsVisibles + 1) * (1000 / duracionMovimiento));


    if (DatosService.fase == "campo") {
      for (let i = 0; i <= numeroDeMovimientos; ++i) { /* numero de movimientos de cada pokemon */
        setTimeout(() => {
          for (let j = 0; j <= DatosService.numerosPokemonsVisibles; ++j) { /* J = al número de pokemons que quieres que se muevan */

            setTimeout(() => {

              const top = Math.floor(Math.random() * (window.innerHeight - 400 + 1) + 200);
              const left = Math.floor(Math.random() * (window.innerWidth - 200));
              const z = Math.round(window.innerHeight * 10 / top)

              let sprite = '';
              let direccion = '';

              if (top >= anteriorY[j] && left >= anteriorX[j]) {
                sprite = "url(" + DatosService.listaPokemonsVisibles[j].urlSprite + ")";
                direccion = "scaleX(-1)";
              }
              else if (top < anteriorY[j] && left >= anteriorX[j]) {
                sprite = "url(" + DatosService.listaPokemonsVisibles[j].urlSpriteBack + ")";
                direccion = "scaleX(1)";
              }
              else if (top >= anteriorY[j] && left < anteriorX[j]) {
                sprite = "url(" + DatosService.listaPokemonsVisibles[j].urlSprite + ")";
                direccion = "scaleX(1)";
              }
              else if (top < anteriorY[j] && left < anteriorX[j]) {
                sprite = "url(" + DatosService.listaPokemonsVisibles[j].urlSpriteBack + ")";
                direccion = "scaleX(-1)";
              }

              anteriorY[j] = top;
              anteriorX[j] = left;

              this.pokemones[j] = {
                'margin-left': left + "px",
                'margin-top': top + "px",
                'scale': top / window.innerHeight * 3,
                'background-image': sprite,
                'transform': direccion,
                /* 'z-index': z, */
              };

              /* this.pokemones[j]['scale'] = 2; pa saber yo a usar mapas */

            }, duracionMovimiento * j); /* tiempo de un movimiento al del siguiente */
          }
        }, duracionBucle * i);
      }
      setTimeout(() => {
        DatosService.emergente = "teamRocket";
        for (let i = 0; i <= DatosService.numerosPokemonsVisibles + 1; ++i)
          this.pokemones[i] = {
            'margin-left': "-500px",
            'margin-top': window.innerHeight / 2 + "px",
            'scale': window.innerHeight / 2 / window.innerHeight * 3,
            'background-image': "url(" + DatosService.listaPokemonsVisibles[i].urlSprite + ")",
            'transform': "scaleX(1)",
            'transition': "margin-left 10s, margin-top 10s, scale 10s",
          };
      }, DatosService.tiempodemovimiento * 1000 + 3000)

      setTimeout(() => {
        DatosService.fase = "cuestionario";
      }, DatosService.tiempodemovimiento * 1000 + 11000)
    }
  }

  pokemonObservado(numero: number) {
    this.DatosService.emergente = "pokedex";
    this.DatosService.pokemonMostrado[0] = "url(" + this.DatosService.listaPokemonsVisibles[numero].urlSprite + ")";
    this.DatosService.pokemonMostrado[1] = this.DatosService.listaPokemonsVisibles[numero].nombre;
  }

}
