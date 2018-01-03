import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposComponent } from './grupos.component';
import { GruposCrearComponent } from './grupos-crear/grupos-crear.component';
import { GruposGestionarComponent } from './grupos-gestionar/grupos-gestionar.component';

const routes: Routes = [{
  path: '',
  component: GruposComponent,
  children: [{
    path: 'crear',
    component: GruposCrearComponent,
  }, {
    path: 'gestionar',
    component: GruposGestionarComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class GruposRoutingModule {

}

export const routedComponents = [
  GruposComponent,
  GruposCrearComponent,
  GruposGestionarComponent,
];
