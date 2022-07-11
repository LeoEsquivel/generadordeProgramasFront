import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuEPUB } from '../../interfaces/responses-interfaces.interface';
import { GeneradorProgramaService } from '../../../services/generador-programa.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @Input() menuEPub!: MenuEPUB []
  @Output() selectedChapterInfo = new EventEmitter<string[]>();
  activeChapter   !: string;

  constructor( ) { }

  getChapter( chapter: string, name:string ) {
    let algo: string[] = [ chapter, name ]
    this.selectedChapterInfo.emit( algo );
    this.activeChapter = name;
  }

}
