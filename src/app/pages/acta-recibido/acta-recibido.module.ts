import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { ActaRecibidoRoutingModule } from './acta-recibido-routing.module';
import { ActaRecibidoComponent } from './acta-recibido.component';
import { RegistroActaRecibidoComponent } from './registro-acta-recibido/registro-acta-recibido.component';
import { VerificacionActaRecibidoComponent } from './verificacion-acta-recibido/verificacion-acta-recibido.component';
import { ConsultaActaRecibidoComponent } from './consulta-acta-recibido/consulta-acta-recibido.component';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ngx-smart-table';


@NgModule({
  declarations: [
    ActaRecibidoComponent,
    RegistroActaRecibidoComponent,
    VerificacionActaRecibidoComponent,
    ConsultaActaRecibidoComponent,
  ],
  imports: [
    CommonModule,
    ActaRecibidoRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    TranslateModule,
  ],
})
export class ActaRecibidoModule { }
