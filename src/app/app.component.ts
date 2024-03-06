import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeAPI';

  fases: number = 1;
  pokeindex: Array<number> = [];

  pokeIMG: Array<string> = [];
  pokeNombre: Array<string> = [];
  URL_LISTA_POKEMON: string = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
  pokedexDatos: string = "pito";
  posicionPokemonsX: Array<string> = [];
  posicionPokemonsY: Array<string> = [];
  pokemonScale: Array<number> = [];
  velocidadTransicion: string = "1500ms";

  pokeballsVolando: string = "";

  bienvenida: boolean = true;
  faseDos: boolean = false;
  pokedex: boolean = false;
  pokeballsVolandoBoolean: boolean = false;
  teamRocket: boolean = false;



  constructor(private http: HttpClient) { }


  empezar() {
    this.bienvenida = false;

    for (let i = 0; i <= 7; ++i) { /* numero de movimientos de cada pokemon */
      setTimeout(() => {
        for (let j = 0; j <= 4; ++j) { /* J = al número de pokemons que quieres que se muevan */

          setTimeout(() => {

            const top = Math.floor(Math.random() * (window.innerHeight - 300));
            const left = Math.floor(Math.random() * (window.innerWidth - 300));

            this.posicionPokemonsX[j] = left + "px";
            this.posicionPokemonsY[j] = top + "px";
            this.pokemonScale[j] = top / window.innerHeight;
            console.log(this.posicionPokemonsX);

          }, 500 * j); /* tiempo de un movimiento a el de el siguiente */
        }

        this.faseDos = true;

      }, 2500 * i)
    }

    setTimeout(() => { /* aparición del teamRocket */
      this.velocidadTransicion = "8000ms";
      this.pokedex = false;
      for (let i = 0; i <= this.pokeindex.length; ++i) {

        this.posicionPokemonsX[i] = "-2000px";
        this.posicionPokemonsY[i] = "150px";
        this.pokedex = false;
        this.pokemonScale[i] = 0.5;
        this.pokeballsVolandoBoolean = true;
        this.teamRocket = true;
        this.pokeballsVolando = "-1000px";
      }

    }, 20000); /* el tiempo que tarda en venir el teamRocket */
  }

  ngOnInit() {

    for (let i = 0; i <= 7; i++) { /* Con esto genero Pokemons aleatorios. Añado algunos más, para incluirlos en el cuestionario */
      var numeroAleatorio = Math.floor(Math.random() * (150)); /* en este caso son 150 Pokemons los que queremos indexar. Pero se pueden muchísimos más */
      this.pokeindex[i] = numeroAleatorio;

    }
    /*  console.log(this.URL_LISTA_POKEMON); */

    // http.get nos devuelve una peticion asíncrona (no sabemos cuando se ejecuta)
    const peticionGet = this.http.get(this.URL_LISTA_POKEMON);

    // nos suscribimos a ella pasandole la funcion que queremos ejecutar cuando se resuelva (ahora o en 1 año)
    peticionGet.subscribe((respuesta: any) => {

      for (let i = 0; i <= respuesta.results.length; i++) { /* respuesta.results.length  */
        const url = respuesta.results[this.pokeindex[i]].url;



        /*   console.log("Holi" + respuesta.results[i].sprites.front_default); */

        //  this.pokeUno[i] = "url(" + respuesta.results.sprites.front_default + ")"
        //   console.log(this.pokeUno);

        this.http.get(url).subscribe((pokemon: any) => {
          this.pokeIMG[i] = "url(" + pokemon.sprites.front_default + ")";
          this.pokeNombre[i] = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);

          /* 
                    console.log("Nombre: " + pokemon.name + ". Movimiento favorito: " + pokemon.moves[0].move.name);
          
                    console.log(this.pokeIMG); */

        });
      }
    });
  }
  info(indice: number) {
    var PokemonElegido = this.pokeindex[indice]

    this.pokedex = !this.pokedex;



    this.http.get(this.URL_LISTA_POKEMON)
      .subscribe((respuesta: any) => {
        this.pokedexDatos = `Éste Pokemon se llama: ${respuesta.results[PokemonElegido].name.charAt(0).toUpperCase() + respuesta.results[PokemonElegido].name.substring(1)}`
      });
  }
  fase(n: number) {
    this.fases = n;

  }
  eleccion(acierto: boolean) {
    if (acierto) {
      window.alert("acertaste")
    }
    else { window.alert("pienso para Pikachus!") }
  }
}