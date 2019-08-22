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
import { NbStepperModule } from '@nebular/theme';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { TablaFacturaComponent } from './registro-acta-recibido/tabla-factura/tabla-factura.component';
import { EdicionActaRecibidoComponent } from './edicion-acta-recibido/edicion-acta-recibido.component';


@NgModule({
  declarations: [
    ActaRecibidoComponent,
    RegistroActaRecibidoComponent,
    VerificacionActaRecibidoComponent,
    ConsultaActaRecibidoComponent,
    TablaFacturaComponent,
    EdicionActaRecibidoComponent,
  ],
  imports: [
    CommonModule,
    ActaRecibidoRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    TranslateModule,
    NbStepperModule,
    MatTabsModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class ActaRecibidoModule { }
