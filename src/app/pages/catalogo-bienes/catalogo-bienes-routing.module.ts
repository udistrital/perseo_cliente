import { NgModule } from '@angular/core';
import { CatalogoBienesComponent } from './catalogo-bienes.component';
import { ConsultaCatalogoComponent } from './consulta-catalogo/consulta-catalogo.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: CatalogoBienesComponent,
  children: [
    {
      path: 'consulta_catalogo',
      component: ConsultaCatalogoComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents: [],
})
export class CatalogoBienesRoutingModule { }

export const routedComponents = [
];
