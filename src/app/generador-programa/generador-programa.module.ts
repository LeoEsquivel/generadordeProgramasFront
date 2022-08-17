import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { GeneradorProgramaRoutingModule } from './generador-programa-routing.module';
import { ProgramaComponent } from './pages/programa/programa.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormularioProgramaComponent } from './components/formulario-programa/formulario-programa.component';
import { ActividadComponent } from './components/actividad/actividad.component';


@NgModule({
  declarations: [
    ProgramaComponent,
    FormularioComponent,
    FileUploaderComponent,
    MenuComponent,
    FormularioProgramaComponent,
    ActividadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    GeneradorProgramaRoutingModule
  ]
})
export class GeneradorProgramaModule { }
