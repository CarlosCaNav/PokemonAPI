import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeAPI';
  URL_LISTA_POKEMON: string = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log(this.URL_LISTA_POKEMON);

    // http.get nos devuelve una peticion asincrona (no sabemos cuando se ejecuta)
    const peticionGet = this.http.get(this.URL_LISTA_POKEMON);

    // nos suscribimos a ella pasandole la funcion que queremos ejecutar cuando se resuelva (ahora o en 1 año)
    peticionGet.subscribe((respuesta: any) => {

      for (let i = 0; i < respuesta.results.length ; i++) {
        const url = respuesta.results[i].url;

        this.http.get(url).subscribe((pokemon: any) => {
          console.log("Nombre: " + pokemon.name + ". Movimiento favorito: " + pokemon.moves[0].move.name);
        });
      }
    });
  }
}