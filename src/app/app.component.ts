import { Component } from '@angular/core';
import { DatosService } from './datos.service'; /* esto escrito a mano */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeAPI';

  constructor(public DatosService: DatosService) { } /* esto escrito a mano */

  ejecutar() {
    var listaDeNumerosAleatorios: number[] = [];
    var listaDeNumerosAleatoriosCuestionario: number[] = [];

    for (var i = 0; i <= this.DatosService.pokemonsVisibles; ++i) {
      var numeroAleatorio = Math.floor(Math.random() * (this.DatosService.pokemonsTotales));
      listaDeNumerosAleatorios[i] = numeroAleatorio;
    }
    for (var i = 0; i <= this.DatosService.pokemonsParaCuestionario; ++i) {
      var numeroAleatorio = Math.floor(Math.random() * (this.DatosService.pokemonsTotales));
      listaDeNumerosAleatoriosCuestionario[i] = numeroAleatorio;
    }

    this.DatosService.http.get(this.DatosService.URL_LISTA_POKEMON).subscribe((respuesta: any) => {
      for (var i = 0; i <= this.DatosService.pokemonsVisibles; ++i) {
       /*  respuesta.results[listaDeNumerosAleatorios[i]].url */


        this.DatosService.listaPokemonsVisibles[i] = {
          nombre: respuesta.results[listaDeNumerosAleatorios[i]]?.name.charAt(0).toUpperCase() + respuesta.results[listaDeNumerosAleatorios[i]]?.name.substring(1),
          numeroPokemon: listaDeNumerosAleatorios[i],
          url: respuesta.results[listaDeNumerosAleatorios[i]]?.url,
        };

        console.log(this.DatosService.listaPokemonsVisibles[i]);

        console.log(listaDeNumerosAleatorios[i]);
      }
      for (var i = 0; i <= this.DatosService.pokemonsParaCuestionario; ++i) {
        this.DatosService.listaPokemonsCuestionario[i] = {
          nombre: respuesta.results[listaDeNumerosAleatoriosCuestionario[i]]?.name.charAt(0).toUpperCase() + respuesta.results[listaDeNumerosAleatoriosCuestionario[i]]?.name.substring(1),
          numeroPokemon: listaDeNumerosAleatoriosCuestionario[i],
          url: respuesta.results[listaDeNumerosAleatoriosCuestionario[i]]?.url,
        };

        console.log(this.DatosService.listaPokemonsVisibles[i]);

        // console.log(listaDeNumerosAleatorios[i]);
      }
    });
  }
  ejecutar2() {
    const mecagoEnDios = this.DatosService.listaPokemonsVisibles[0].url;

    this.DatosService.http.get(mecagoEnDios).subscribe((data: any) => {
        this.DatosService.listaPokemonsData[0] = {
          urlSprite: data.results[0].sprites.front_default,
          sonido: "",
        }

      });
      console.log(this.DatosService.listaPokemonsVisibles[0].url);
      console.log(this.DatosService.listaPokemonsData[0].urlSprite);
  }
}

