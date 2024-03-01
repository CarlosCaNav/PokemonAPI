import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeAPI';

  /*  pokeUnodddd = "url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png)"; */
  pokeindex: Array<number> = [];
  pokeIMG: Array<string> = [];
  URL_LISTA_POKEMON: string = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
  pokedex: boolean = false;
  pokedexDatos: string = "pito";
  constructor(private http: HttpClient) { }

  ngOnInit() {

    /*  console.log(this.URL_LISTA_POKEMON); */

    // http.get nos devuelve una peticion asincrona (no sabemos cuando se ejecuta)
    const peticionGet = this.http.get(this.URL_LISTA_POKEMON);

    // nos suscribimos a ella pasandole la funcion que queremos ejecutar cuando se resuelva (ahora o en 1 año)
    peticionGet.subscribe((respuesta: any) => {

      for (let i = 0; i < 4; i++) { /* respuesta.results.length  */
        var numeroAleatorio = Math.floor(Math.random() * (150));
        const url = respuesta.results[numeroAleatorio].url;
        /*   console.log("Holi" + respuesta.results[i].sprites.front_default); */

        //  this.pokeUno[i] = "url(" + respuesta.results.sprites.front_default + ")"
        //   console.log(this.pokeUno);

        this.http.get(url).subscribe((pokemon: any) => {
          this.pokeIMG[i] = "url(" + pokemon.sprites.front_default + ")";
          this.pokeindex[i] = numeroAleatorio;
          console.log(this.pokeIMG);
          console.log(this.pokeindex);
          console.log(url);
          /* 
                    console.log("Nombre: " + pokemon.name + ". Movimiento favorito: " + pokemon.moves[0].move.name);
          
                    console.log(this.pokeIMG); */

        });
      }
    });
  }
  info(indice: number) {
    var PokemonElegido = this.pokeindex[indice]

    if (this.pokedex == true) {
      this.pokedex = false
    } else { this.pokedex = true };

    this.http.get(this.URL_LISTA_POKEMON)
      .subscribe((respuesta: any) => {
        console.log(`Nombre del primer Pokémon: ${respuesta.results[PokemonElegido].name}`);
        this.pokedexDatos = `Nombre del primer Pokémon: ${respuesta.results[PokemonElegido].name}`
      });
  }
}