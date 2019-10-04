import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { CatalogoBienesRoutingModule, routedComponents } from './catalogo-bienes-routing.module';
import { CatalogoBienesComponent } from './catalogo-bienes.component';
import { ConsultaCatalogoComponent } from './consulta-catalogo/consulta-catalogo.component';
import { NbTreeGridModule } from '@nebular/theme';
import { ArbolComponent, FsIconAComponent}  from './arbol/arbol.component';
import { TreeModule } from 'angular-tree-component';


@NgModule({
  declarations: [
    ...routedComponents,
    CatalogoBienesComponent,
    ConsultaCatalogoComponent,
    ArbolComponent,
    FsIconAComponent,
  ],
  imports: [
    CommonModule,
    CatalogoBienesRoutingModule,
    NbTreeGridModule,
    ThemeModule,
    TreeModule.forRoot(),
  ],
})
export class CatalogoBienesModule { }
