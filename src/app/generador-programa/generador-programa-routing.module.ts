import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ProgramaComponent } from './pages/programa/programa.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FormularioComponent
      },
      {
        path: 'programa',
        component: ProgramaComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneradorProgramaRoutingModule { }
