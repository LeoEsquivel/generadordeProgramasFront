import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Actividad } from '../../interfaces/programa.interfaces';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent{

  @Input() actividad !: Actividad;
  @Input() hora      !: Date;

  @Output() siguienteHora = new EventEmitter();
  constructor() {

  }

  sumarMinutos() {
    if( this.actividad.tiempo === 0 ){
      this.siguienteHora.emit( this.hora.getTime() + 60000 )
    } else {
      this.siguienteHora.emit( this.hora.getTime() + ( this.actividad.tiempo * 60000) )
    }
  }



}
