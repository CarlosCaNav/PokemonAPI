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

    if (DatosService.fase == "campo") {
      for (let i = 0; i <= 10; ++i) { /* numero de movimientos de cada pokemon */
        setTimeout(() => {
          for (let j = 0; j <= 3; ++j) { /* J = al número de pokemons que quieres que se muevan */

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
              };

              /* this.pokemones[j]['scale'] = 2; pa saber yo a usar mapas */

            }, 500 * j); /* tiempo de un movimiento al del siguiente */
          }
        }, 2000 * i);
      }

     }
  }
}
