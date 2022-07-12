import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Programa } from '../../interfaces/programa.interfaces';
import { ProgramaResponse, ProgramaSeccion, SeccionActividad } from '../../interfaces/responses-interfaces.interface';

@Component({
  selector: 'app-formulario-programa',
  templateUrl: './formulario-programa.component.html',
  styleUrls: ['./formulario-programa.component.css']
})
export class FormularioProgramaComponent implements OnChanges {

  @Input() programa     !: ProgramaResponse;
  @Output() subprograma = new EventEmitter<Programa>();

  programaForm: FormGroup = this.fb.group({
    nombreCong    : [ '', [ Validators.required ] ],
    fecha         : [ '', [ Validators.required ] ],
    horaInicio    : [ '12:00',  [ Validators.required ] ],
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

  constructor( private fb: FormBuilder ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.populateForm()
  }


  addProgram(){
    let subP = this.programaForm.value
    this.programaForm.reset();

    this.subprograma.emit( subP );
  }

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
  }

  populateForm() {
    if ( this.programa ) {
      this.programaForm.patchValue({
        nombreCong: 'Cong. Chapultepec',
        fecha: this.programa._Programa__fecha,
        textoInicial: this.programa._Programa__textoInicial,
      })
      this.programaForm.setControl('secciones', this.setSeccionesForm(this.programa._Programa__secciones!))
    }
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
