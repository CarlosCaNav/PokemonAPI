import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemonsInterface'; /* escrito a mano */


@Injectable({
  providedIn: 'root',
})

export class DatosService {

  constructor(public http: HttpClient) { }
  URL_LISTA_POKEMON: string = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

  pokemonsTotales: number = 150;
  pokemonsVisibles: number = 3;
  pokemonsParaCuestionario: number = 3;
  listaPokemonsVisibles: Pokemon[] = [];
  listaPokemonsCuestionario: Pokemon[] = [];



}