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
  segundosDeInvestigacion: number = 20;
  listaPokemonsVisibles: Pokemon[] = [];

  numerosPokemonsCuestionario: number = 3;
  listaPokemonsCuestionario: Pokemon[] = [];

  fase: string = ""; /* teamRocket */
  emergente: string = "intro"; /* bienvenida */

  pokemonMostrado: number = 0;

  musicaInicio = new Audio('assets/Alegre.mp3');
  musicaTeamRocket = new Audio('assets/suspense.mp3');
  musicaPicadero = new Audio('assets/PixelTension.mp3');


  cambioFaseYEmergente(fase: string, emergente: string) {
    this.fase = fase;
    this.emergente = emergente;

  }
  cambioFase(fase: string) {
    this.fase = fase;
  }
  cambioEmergente(emergente: string) {
    this.emergente = emergente;

    if (this.emergente == "bienvenida") {
      this.musicaInicio.play();
    }
  }
}