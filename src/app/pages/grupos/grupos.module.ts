import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { GruposRoutingModule, routedComponents } from './grupos-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    GruposRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class GruposModule { }
