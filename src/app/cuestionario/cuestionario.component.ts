import { Component } from '@angular/core';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-cuestionario',/* 
  standalone: true,
  imports: [], */
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent {

  constructor (public DatosService: DatosService) {}
}
