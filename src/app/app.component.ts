import { Component } from '@angular/core';
import { DatosService } from './datos.service'; /* esto escrito a mano */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeAPI';

  constructor(public DatosService: DatosService) {} /* esto escrito a mano */

  ejecutar() {
    var listaDeNumerosAleatorios: number[] = [];

    for (var i = 0; i <= this.DatosService.pokemonsVisibles; ++i) {
      var numeroAleatorio = Math.floor(Math.random() * (this.DatosService.pokemonsTotales));
      listaDeNumerosAleatorios[i] = numeroAleatorio;
    }

    this.DatosService.http.get(this.DatosService.URL_LISTA_POKEMON).subscribe((respuesta: any) => {
      for (var i = 0; i <= this.DatosService.pokemonsVisibles; ++i) {
        this.DatosService.listaPokemonsVisibles[i] = {
          nombre: respuesta.results[listaDeNumerosAleatorios[i]]?.name.charAt(0).toUpperCase() + respuesta.results[listaDeNumerosAleatorios[i]]?.name.substring(1),
          numeroPokemon: listaDeNumerosAleatorios[i],
          urlSprite: "url("/*  + respuesta.results[listaDeNumerosAleatorios[i]]?.sprites.front_default + ")", */
        };

        console.log(this.DatosService.listaPokemonsVisibles[i]);

        console.log(listaDeNumerosAleatorios[i]);
      }
      for (var i = 0; i <= this.DatosService.pokemonsParaCuestionario; ++i) {
        this.DatosService.listaPokemonsCuestionario[i] = {
          nombre: respuesta.results[listaDeNumerosAleatorios[i]]?.name.charAt(0).toUpperCase() + respuesta.results[listaDeNumerosAleatorios[i]]?.name.substring(1),
          numeroPokemon: listaDeNumerosAleatorios[i],
          urlSprite: "url(" + respuesta.results[listaDeNumerosAleatorios[i]]?.sprites.front_default + ")",
        };

        console.log(this.DatosService.listaPokemonsVisibles[i]);

        console.log(listaDeNumerosAleatorios[i]);
      }
    });
  }
}

