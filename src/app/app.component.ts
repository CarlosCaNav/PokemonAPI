import { Component } from '@angular/core';
import { DatosService } from './datos.service'; /* esto escrito a mano */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeAPI';

  constructor(public DatosService: DatosService) {} /* esto escrito a mano */
}

