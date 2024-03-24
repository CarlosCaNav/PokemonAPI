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
    var numeroDeMovimientos: number = Math.round(DatosService.tiempodemovimiento / (DatosService.numerosPokemonsVisibles + 1));
    var duracionMovimiento: number = 500;
    var duracionBucle: number = duracionMovimiento * DatosService.numerosPokemonsVisibles;


    if (DatosService.fase == "campo") {
      for (let i = 0; i <= numeroDeMovimientos; ++i) { /* numero de movimientos de cada pokemon */
        setTimeout(() => {
          for (let j = 0; j <= DatosService.numerosPokemonsVisibles; ++j) { /* J = al número de pokemons que quieres que se muevan */

            setTimeout(() => {

              const top = Math.floor(Math.random() * (window.innerHeight - 400 + 1) + 200);
              const left = Math.floor(Math.random() * (window.innerWidth - 200));

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
                'z-index': top,
              };

              /* this.pokemones[j]['scale'] = 2; pa saber yo a usar mapas */

            }, duracionMovimiento * j); /* tiempo de un movimiento al del siguiente */
          }
        }, duracionBucle * i);
      }
     }
  }

  pokemonObservado(numero:number){
    this.DatosService.emergente = "pokedex";
    this.DatosService.pokemonMostrado[0] = "url(" + this.DatosService.listaPokemonsVisibles[numero].urlSprite  + ")";
    this.DatosService.pokemonMostrado[1] = this.DatosService.listaPokemonsVisibles[numero].nombre ;
  }
}
