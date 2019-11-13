import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaEvaluacionRoutingModule } from './consulta-evaluacion-routing.module';
import { ConsultaEvaluacionComponent } from './consulta-evaluacion.component';

@NgModule({
  declarations: [ConsultaEvaluacionComponent],
  imports: [
    CommonModule,
    ConsultaEvaluacionRoutingModule,
  ],
})
export class ConsultaEvaluacionModule { }
