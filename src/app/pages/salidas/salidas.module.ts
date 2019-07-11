import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalidasRoutingModule } from './salidas-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { SalidasComponent } from './salidas.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [
    RegistroComponent,
    SalidasComponent,
  ],
  imports: [
    CommonModule,
    SalidasRoutingModule,
    ThemeModule,
  ],
})
export class SalidasModule { }
