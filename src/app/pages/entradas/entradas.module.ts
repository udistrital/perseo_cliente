import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { EntradasRoutingModule } from './entradas-routing.module';
import { EntradasComponent } from './entradas.component';
import { ReposicionComponent } from './reposicion/reposicion.component';
import { ElaboracionPropiaComponent } from './elaboracion-propia/elaboracion-propia.component';
import { DonacionComponent } from './donacion/donacion.component';
import { AdquisicionComponent } from './adquisicion/adquisicion.component';
import { SobranteComponent } from './sobrante/sobrante.component';
import { RegistroComponent } from './registro/registro.component';
import { TercerosComponent } from './terceros/terceros.component';
import { ConsultaEntradaComponent } from './consulta-entrada/consulta-entrada.component';

@NgModule({
  declarations: [
    EntradasComponent,
    ReposicionComponent,
    ElaboracionPropiaComponent,
    DonacionComponent,
    AdquisicionComponent,
    SobranteComponent,
    RegistroComponent,
    TercerosComponent,
    ConsultaEntradaComponent,
  ],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    ThemeModule,
  ],
})
export class EntradasModule { }
