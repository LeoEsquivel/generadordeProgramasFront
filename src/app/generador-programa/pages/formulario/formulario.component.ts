import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { GeneradorProgramaService } from 'src/app/services/generador-programa.service';
import { Programa } from '../../interfaces/programa.interfaces';
import { MenuEPUB, ProgramaResponse } from '../../interfaces/responses-interfaces.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  menuEPub        !: MenuEPUB [];
  activeChapter   !: string;
  selectedChapter !: string;

  subPrograma        !: ProgramaResponse;
  programaFinal       : Programa[] = [];


  constructor( private gpService: GeneradorProgramaService ) { }


  updateMenu( menu: MenuEPUB[] ) {
    this.menuEPub = menu;
  }

  obtenerInformacion( chapterInfo: string[] ) {
    this.selectedChapter = chapterInfo[0];
    this.activeChapter = chapterInfo[1]
    this.gpService.getProgramData( chapterInfo[0] )
      .subscribe({
        next: ( programa ) => {
          if ( programa ) {
            this.subPrograma = programa;
          }
        }
      })
  }

  addPrograma( subPrograma: Programa) {
    this.programaFinal.push( subPrograma );
  }


}
