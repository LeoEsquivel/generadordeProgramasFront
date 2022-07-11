import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneradorProgramaService } from '../../../services/generador-programa.service';
import { switchMap } from 'rxjs';
import { MenuEPUB } from '../../interfaces/responses-interfaces.interface';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent {

  @Output() menuEvent = new EventEmitter<MenuEPUB []>()

  archivoForm: FormGroup = this.fb.group({
    file      : [ '', [ Validators.required ] ],
    fileSource: ['', [ Validators.required ] ]
  });


  constructor( private fb: FormBuilder,
               private gpServices: GeneradorProgramaService) { }

  epubFileChange( fileInputEvent: any ) {
    const file = fileInputEvent.target.files[0];

    this.archivoForm.patchValue({
      fileSource: file
    })
  }

  uploadFile() {
    if( this.archivoForm.valid ) {
      const files = new FormData();

      files.append( 'file', this.archivoForm.get('fileSource')?.value)

      this.gpServices.uploadFile( files )
        .pipe(
          switchMap( ( menu ) => this.gpServices.getMenuInfo())
        )
        .subscribe({
          next: (menu) => {
            this.menuEvent.emit(menu);
          }
        })
    } else {
      console.log('No se ha agregado ningun archivo')
    }
  }

}
