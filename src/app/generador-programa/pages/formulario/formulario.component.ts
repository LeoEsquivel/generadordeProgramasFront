import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe, switchMap } from 'rxjs';

import { GeneradorProgramaService } from 'src/app/services/generador-programa.service';
import { MenuEPUB, ProgramaResponse, SeccionActividad, ProgramaSeccion } from '../../interfaces/responses-interfaces.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  menuEPub        !: MenuEPUB [];
  activeChapter   !: string;
  selectedChapter !: string;

  archivoForm: FormGroup = this.fb.group({
    file      : [ '', [ Validators.required ] ],
    fileSource: ['', [ Validators.required ] ]
  });

  programaForm: FormGroup = this.fb.group({
    nombreCong    : [ '', [ Validators.required ] ],
    fecha         : [ '', [ Validators.required ] ],
    presidente    : [ '', [ Validators.required ] ],
    oracionInicial: [ '', [ Validators.required ] ],
    oracionFinal  : [ '', [ Validators.required ] ],
    textoInicial  : [ '', [ Validators.required ] ],
    secciones     : this.fb.array([

      this.fb.group({
        nombreSeccion: [ '', [ Validators.required ] ],
        actividades  : this.fb.array([

          this.fb.group({
            nombreActividad: [ '', [ Validators.required ] ],
            tiempo         : [ '', [ Validators.required ] ],
            zona           : [ 'Zona Principal', [ Validators.required ] ],
            participantes  : this.fb.array([
              this.fb.group({
                nombre: [ '' ]
              })
            ])
          })
        ])
      })
    ])
  });


  constructor( private fb: FormBuilder,
               private gpService: GeneradorProgramaService ) { }

  getSecciones(): FormArray{
    return this.programaForm.get('secciones') as FormArray;
  }

  getActividades( seccionControl: AbstractControl ): FormArray {
    return seccionControl.get('actividades') as FormArray;
  }

  getParticipantes( actividadControl: AbstractControl ): FormArray {
    return actividadControl.get('participantes') as FormArray;
  }

  addParticipante( actividadControl: AbstractControl ) {
    const participanteFormGroup: FormGroup = this.fb.group({
      nombre: ''
    });

    this.getParticipantes(actividadControl)!.push( participanteFormGroup );
  }

  deleteParticipante( index: number, actividadControl: AbstractControl ) {
    this.getParticipantes(actividadControl).removeAt(index);

    // form.removeAt(index)
  }

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

      this.gpService.uploadFile( files )
        .pipe(
          switchMap( ( menu ) => this.gpService.getMenuInfo())
        )
        .subscribe({
          next: (menu) => {
            this.menuEPub = menu;
          }
        })
    } else {
      console.log('No se ha agregado ningun archivo')
    }
  }

  obtenerInformacion( chapter: string, name: string ) {
    this.activeChapter = chapter
    this.selectedChapter = name;
    this.gpService.getProgramData( chapter )
      .subscribe({
        next: ( programa ) => {
          if ( programa ) {

            this.programaForm.patchValue({
              nombreCong: 'Cong. Chapultepec',
              fecha: programa._Programa__fecha,
              textoInicial: programa._Programa__textoInicial,
            })
            this.programaForm.setControl('secciones', this.setSeccionesForm(programa._Programa__secciones!))
          }
        }
      })
  }

  setSeccionesForm( secciones: ProgramaSeccion[] ): FormArray {
    const formArraySections = new FormArray([])

    secciones.forEach( section => {

      formArraySections.push( this.fb.group({
        nombreSeccion: section._Seccion__nombreSeccion,
        actividades: this.setActivitiesForm( section._Seccion__actividades )
      }) )

    } );

    return formArraySections
  }

  setActivitiesForm( activities: SeccionActividad[] ): FormArray {

    const formArrayActivities = new FormArray([]);

    activities.forEach( activity => {
      formArrayActivities.push( this.fb.group({
        nombreActividad: activity._Actividad__nombreActividad,
        tiempo: activity._Actividad__tiempo,
        zona: activity._Actividad__zona,
        participantes: this.fb.array([
          this.fb.group({
            nombre: 'Juan Perez'
          })
        ])
      }) )
    } );


    return formArrayActivities

  }


}
