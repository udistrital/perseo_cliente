import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalidasRoutingModule } from './salidas-routing.module';
import { SalidasComponent } from './salidas.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ConsultaSalidasComponent } from './consulta-salidas/consulta-salidas.component';
import { RegistroSalidasComponent } from './registro-salidas/registro-salidas.component';

@NgModule({
  declarations: [
    SalidasComponent,
    ConsultaSalidasComponent,
    RegistroSalidasComponent,
  ],
  imports: [
    CommonModule,
    SalidasRoutingModule,
    ThemeModule,
  ],
})
export class SalidasModule { }
