import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionRoutingModule } from './evaluacion-routing.module';
import { EvaluacionComponent } from './evaluacion.component';

@NgModule({
  declarations: [EvaluacionComponent],
  imports: [
    CommonModule,
    EvaluacionRoutingModule
  ]
})
export class EvaluacionModule { }
