import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { GeneradorProgramaRoutingModule } from './generador-programa-routing.module';
import { ProgramaComponent } from './pages/programa/programa.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';


@NgModule({
  declarations: [
    ProgramaComponent,
    FormularioComponent,
    FileUploaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    GeneradorProgramaRoutingModule
  ]
})
export class GeneradorProgramaModule { }
