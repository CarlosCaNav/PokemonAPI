import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { HttpClientModule } from '@angular/common/http'; /* Importado aquí y en el AppComponent */

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
