import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalidasComponent } from './salidas.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [{
  path: '',
  component: SalidasComponent,
  children: [
    {
      path: 'registro',
      component: RegistroComponent,
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalidasRoutingModule { }
