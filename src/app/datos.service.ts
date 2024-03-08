import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemonsInterface'; /* escrito a mano */


@Injectable({
  providedIn: 'root',
})

export class DatosService {
  
  constructor(private http: HttpClient) { }
  URL_LISTA_POKEMON: string = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
  listaPokemonsVisibles: Pokemon[] = [];
  listaPokemonsCuestionario: Pokemon[] = [];


  ngOnInit() {

    for (var i = 0; i <= 3; ++i) {
      var numeroAleatorio = Math.floor(Math.random() * (150)); /* en este caso son 150 Pokemons los que queremos indexar. Pero se pueden muchísimos más */
      this.http.get(this.URL_LISTA_POKEMON)
        .subscribe((respuesta: any) => {
          this.listaPokemonsVisibles[i].nombre = respuesta.results[numeroAleatorio].name.charAt(0).toUpperCase() + respuesta.results[numeroAleatorio].name.substring(1);
          
          console.log(this.listaPokemonsVisibles[i]);
          
        });
    }
  }
}