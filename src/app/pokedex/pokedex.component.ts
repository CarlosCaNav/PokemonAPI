import { Component } from '@angular/core';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent{



  constructor(public DatosService: DatosService) {}
    }
