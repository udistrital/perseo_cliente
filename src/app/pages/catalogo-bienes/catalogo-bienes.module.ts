import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { CatalogoBienesRoutingModule, routedComponents } from './catalogo-bienes-routing.module';
import { CatalogoBienesComponent } from './catalogo-bienes.component';
import { ConsultaCatalogoComponent } from './consulta-catalogo/consulta-catalogo.component';
import { NbTreeGridModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ...routedComponents,
    CatalogoBienesComponent,
    ConsultaCatalogoComponent,
  ],
  imports: [
    CommonModule,
    CatalogoBienesRoutingModule,
    NbTreeGridModule,
    ThemeModule,
  ],
})
export class CatalogoBienesModule { }
