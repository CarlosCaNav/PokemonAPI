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
  bienvenida: boolean = true;
  pokeindex: Array<number> = [];
  faseDos: boolean = false;

  pokeIMG: Array<string> = [];
  URL_LISTA_POKEMON: string = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
  pokedex: boolean = false;
  pokedexDatos: string = "pito";
  posicionPokemonsX: Array<string> = [];
  posicionPokemonsY: Array<string> = [];
  pokemonScale: Array<number> = [];
  velocidadTransicion: string = "1500ms";

  pokeballsVolando: string = "";
  pokeballsVolandoBoolean: boolean = false;
  teamRocket: boolean = false;



  constructor(private http: HttpClient) { }


  empezar() {
    /* 
        this.posicionPokemonsX = ['-50px', '-50px', '-50px', '-50px', '-50px', '-50px', '-50px'];
        this.posicionPokemonsY = ['50px', '50px', '50px', '50px', '50px', '50px', '50px'];
        console.log("posición final" + this.posicionPokemonsX);
         */
    this.bienvenida = false;

    for (let i = 0; i <= 38; ++i) {
      setTimeout(() => {
        for (let j = 0; j <= 4; ++j) { /* this.pokeindex.length */

          setTimeout(() => {

            const top = Math.floor(Math.random() * (window.innerHeight - 300));
            const left = Math.floor(Math.random() * (window.innerWidth - 300));

            this.posicionPokemonsX[j] = left + "px";
            this.posicionPokemonsY[j] = top + "px";
            this.pokemonScale[j] = top / window.innerHeight;
            console.log(this.posicionPokemonsX);


          }, 250 * j);
        }

        this.faseDos = true;
        console.log(this.posicionPokemonsX);

      }, 1000 * i)
      /* setInterval(this.empezar, 1000);  *//* soy un terrorista, seguro que hay formas mejores */
    }
    setTimeout(() => {
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

    }, 40000);
  }

  ngOnInit() {

    /*   const top = Math.floor(Math.random() * (window.innerHeight - 500));
      const left = Math.floor(Math.random() * window.innerWidth);
    
      const div = document.getElementById('PokeMovimiento')!; // Operador de afirmación no nula
    
      div.style.top = `${top}px`;
      div.style.left = `${left}px`;
      div.style.scale = `${top / window.innerHeight}`;
    
      setInterval(this.ngOnInit, 1000);  *//* soy un terrorista, seguro que hay formas mejores */


    for (let i = 0; i <= 6; i++) { /* respuesta.results.length  */
      var numeroAleatorio = Math.floor(Math.random() * (150));
      this.pokeindex[i] = numeroAleatorio;

    }
    /*  console.log(this.URL_LISTA_POKEMON); */

    // http.get nos devuelve una peticion asincrona (no sabemos cuando se ejecuta)
    const peticionGet = this.http.get(this.URL_LISTA_POKEMON);

    // nos suscribimos a ella pasandole la funcion que queremos ejecutar cuando se resuelva (ahora o en 1 año)
    peticionGet.subscribe((respuesta: any) => {

      for (let i = 0; i <= 4; i++) { /* respuesta.results.length  */
        const url = respuesta.results[this.pokeindex[i]].url;



        /*   console.log("Holi" + respuesta.results[i].sprites.front_default); */

        //  this.pokeUno[i] = "url(" + respuesta.results.sprites.front_default + ")"
        //   console.log(this.pokeUno);

        this.http.get(url).subscribe((pokemon: any) => {
          this.pokeIMG[i] = "url(" + pokemon.sprites.front_default + ")";
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
fase(n : number){
this.fases = n;

}
}