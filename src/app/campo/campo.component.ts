import { Component } from '@angular/core';
import { DatosService } from '../datos.service'; /* esto escrito a mano */

@Component({
  selector: 'app-campo',
  templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.css']
})
export class CampoComponent {



  posicionPokemonsX: Array<string> = [];
  posicionPokemonsY: Array<string> = [];
  pokemonScale: Array<number> = [];
  direccion: Array<string> = [];
  pokemonSprite: Array<string> = [];
  /* 
    empezar() { */

  constructor(public DatosService: DatosService) { /* lo de los paréntes escrito a mano */

  var anteriorX: Array<number> = [];
  var anteriorY: Array<number> = [];
  
    if (DatosService.fase == "campo") {
      for (let i = 0; i <= 10; ++i) { /* numero de movimientos de cada pokemon */
        setTimeout(() => {
          for (let j = 0; j <= 3; ++j) { /* J = al número de pokemons que quieres que se muevan */

            setTimeout(() => {

              const top = Math.floor(Math.random() * (window.innerHeight - 300));
              const left = Math.floor(Math.random() * (window.innerWidth - 300));

              if (top >= anteriorY[j] && left >= anteriorX[j]) {
                this.pokemonSprite[j] = "url(" + DatosService.listaPokemonsVisibles[j].urlSprite + ")";
                this.direccion[j] = "scaleX(-1)";
              }
              else if (top < anteriorY[j] && left >= anteriorX[j]) {
                this.pokemonSprite[j] = "url(" + DatosService.listaPokemonsVisibles[j].urlSpriteBack + ")";
                this.direccion[j] = "scaleX(1)";
              }
              else if (top >= anteriorY[j] && left < anteriorX[j]) {
                this.pokemonSprite[j] = "url(" + DatosService.listaPokemonsVisibles[j].urlSprite + ")";
                this.direccion[j] = "scaleX(1)";
              }
              else if (top < anteriorY[j] && left < anteriorX[j]) {
                this.pokemonSprite[j] = "url(" + DatosService.listaPokemonsVisibles[j].urlSpriteBack + ")";
                this.direccion[j] = "scaleX(-1)";
              }
              
              this.posicionPokemonsX[j] = left + "px";
              this.posicionPokemonsY[j] = top + "px";
              this.pokemonScale[j] = top / window.innerHeight * 3;

              anteriorY[j] = top;
              anteriorX[j] = left;

"transform: scaleX(-1);"

            }, 500 * j); /* tiempo de un movimiento a el de el siguiente */
          }
        }, 2000 * i)
      }
    }
  }
}
