import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneradorProgramaService } from 'src/app/services/generador-programa.service';
import { Actividad } from '../../interfaces/programa.interfaces';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit{

  @Input() actividad !: Actividad;
  @Input() hora      !: Date;

  @Output() horaChange = new EventEmitter<Date>();

  constructor( private gpService: GeneradorProgramaService ) {
  }

  ngOnInit(): void {
    this.actividad.hora = this.hora;
    this.sumarMinutos()
  }

  sumarMinutos(): void{
    this.hora = this.gpService.addMinutes( this.hora, this.actividad.tiempo );
    this.horaChange.emit( this.hora );
  }



}
