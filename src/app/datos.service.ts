import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemonsInterface'; /* escrito a mano */

@Injectable({
  providedIn: 'root',
})

export class DatosService {

  constructor(public http: HttpClient) { }
  numerosPokemonsTotales: number = 151;

  URL_LISTA_POKEMON: string = `https://pokeapi.co/api/v2/pokemon?limit=${this.numerosPokemonsTotales}&offset=0`;

  numerosPokemonsVisibles: number = 3;
  listaPokemonsVisibles: Pokemon[] = [];

  numerosPokemonsCuestionario: number = 3;
  listaPokemonsCuestionario: Pokemon[] = [];
}