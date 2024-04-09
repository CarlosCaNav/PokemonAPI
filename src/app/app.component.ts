import { Component } from '@angular/core';
import { DatosService } from './datos.service'; /* esto escrito a mano */
import { Pokemon } from './pokemonsInterface'; /* escrito a mano */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'PokeAPI';

  constructor(public DatosService: DatosService) { } /* esto escrito a mano */

  ngOnInit() {
    this.DatosService.http.get(this.DatosService.URL_LISTA_POKEMON).subscribe((lista_pokemons: any) => {
      this.pedirYGuardarPokemons(lista_pokemons, this.DatosService.numerosPokemonsVisibles, this.DatosService.listaPokemonsVisibles);

      this.pedirYGuardarPokemons(lista_pokemons, this.DatosService.numerosPokemonsCuestionario, this.DatosService.listaPokemonsCuestionario);
    });
  }

  pedirYGuardarPokemons(lista_pokemons: any, numero_pokemons: number, listaAGuardar: Pokemon[]) {
    var listaDeNumerosAleatorios: number[] = [];

    for (var i = 0; i <= numero_pokemons; ++i) {
      var numeroAleatorio = Math.floor(Math.random() * this.DatosService.numerosPokemonsTotales);
      listaDeNumerosAleatorios[i] = numeroAleatorio;
    }

    for (var i = 0; i <= numero_pokemons; ++i) {

      const indice = listaDeNumerosAleatorios[i];
      const url: string = lista_pokemons.results[indice]?.url;

      this.DatosService.http.get(url).subscribe((pokemon: any) => {

        const pokemonInterfaz: Pokemon = {
          nombre: pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1),
          indice: indice,
          urlSprite: 'url(' + pokemon.sprites.front_default + ')',
          urlSpriteBack:  'url(' + pokemon.sprites.back_default + ')',
          sonido: pokemon.cries.latest,
          peso: pokemon.weight / 10, // kg
          altura: pokemon.height * 10, // cm
        };

        listaAGuardar.push(pokemonInterfaz);
      });
    }

    console.log(listaAGuardar);
  }
  duracion(segundos: number) {
    this.DatosService.segundosDeInvestigacion += segundos;
    if (this.DatosService.segundosDeInvestigacion >= 60) {
      this.DatosService.segundosDeInvestigacion = 60
    }
    else if (this.DatosService.segundosDeInvestigacion <= 15) {
      this.DatosService.segundosDeInvestigacion = 15
    }
  }
}

