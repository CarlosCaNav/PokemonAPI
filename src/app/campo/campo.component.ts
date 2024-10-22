import { Component } from '@angular/core';
import { DatosService } from '../datos.service'; /* esto escrito a mano */

@Component({
  selector: 'app-campo',
  templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.css']
})
export class CampoComponent {

  pokemones: Array<Record<string, string | number>> = [];
  sonidoPokedex = new Audio('assets/Ding.ogg');

  constructor(public DatosService: DatosService) { /* lo de los paréntes escrito a mano */

    var anteriorX: Array<number> = [];
    var anteriorY: Array<number> = [];
    var msDuracionMovimiento: number = 500;
    var msDuracionBucle: number = msDuracionMovimiento * (DatosService.numerosPokemonsVisibles + 1);
    var numeroDeBucles: number = Math.round(DatosService.segundosDeInvestigacion * (1000 / msDuracionBucle))

    if (DatosService.fase == "campo") {
      for (let i = 0; i <= numeroDeBucles; ++i) {
        setTimeout(() => {
          for (let j = 0; j <= DatosService.numerosPokemonsVisibles; ++j) { /* J = al número de pokemons que quieres que se muevan */

            setTimeout(() => {

              const top = Math.floor(Math.random() * (window.innerHeight - 400 + 1) + 200);
              const left = Math.floor(Math.random() * (window.innerWidth - 200));
              const z = Math.round(window.innerHeight * 10 / top)

              let sprite = '';
              let direccion = '';

              if (top >= anteriorY[j] && left >= anteriorX[j]) {
                sprite = DatosService.listaPokemonsVisibles[j].urlSprite;
                direccion = "scaleX(-1)";
              }
              else if (top < anteriorY[j] && left >= anteriorX[j]) {
                sprite = DatosService.listaPokemonsVisibles[j].urlSpriteBack;
                direccion = "scaleX(1)";
              }
              else if (top >= anteriorY[j] && left < anteriorX[j]) {
                sprite = DatosService.listaPokemonsVisibles[j].urlSprite;
                direccion = "scaleX(1)";
              }
              else if (top < anteriorY[j] && left < anteriorX[j]) {
                sprite = DatosService.listaPokemonsVisibles[j].urlSpriteBack;
                direccion = "scaleX(-1)";
              }

              anteriorY[j] = top;
              anteriorX[j] = left;

              this.pokemones[j] = {
                'margin-left': left + "px",
                'margin-top': top + "px",
                'scale': top / window.innerHeight * 3 * (DatosService.listaPokemonsVisibles[j].altura + 500) * 0.002,
                'background-image': sprite,
                'transform': direccion,
                /* 'z-index': z, */
              };

              /* this.pokemones[j]['scale'] = 2; pa saber yo a usar mapas */

            }, msDuracionMovimiento * j);
          }
        }, msDuracionBucle * i);
      }
      setTimeout(() => {
        DatosService.emergente = "teamRocket";
        this.DatosService.musicaTeamRocket.play();
        this.DatosService.musicaInicio.pause();
        for (let i = 0; i <= DatosService.numerosPokemonsVisibles; ++i)
          this.pokemones[i] = {
            'margin-left': "-30vw",
            'margin-top': window.innerHeight / 2 + "px",
            'scale': window.innerHeight / 2 / window.innerHeight * 3,
            'background-image': DatosService.listaPokemonsVisibles[i].urlSprite,
            'transform': "scaleX(1)",
            'transition': "margin-left 10s, margin-top 10s, scale 10s",
          };
      }, DatosService.segundosDeInvestigacion * 1000 + 3000)

      setTimeout(() => {
        DatosService.emergente = "teamRocket";
        DatosService.fase = "cuestionario";
      }, DatosService.segundosDeInvestigacion * 1000 + 11000)
    }
  }

  pokemonObservado(numero: number) {
    this.sonidoPokedex.play();
    if(this.DatosService.emergente != "teamRocket")
    this.DatosService.emergente = "pokedex";
    this.DatosService.pokemonMostrado = numero;
  }
}
