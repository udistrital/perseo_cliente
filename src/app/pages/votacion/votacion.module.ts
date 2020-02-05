import { VotacionRoutingModule, routedComponents } from './votacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
// import { VotoService } from '../../@core/data/voto.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../shared/shared.module';
import { CrudVotacionComponent } from './crud-votacion/crud-votacion.component';
import { ToasterService} from 'angular2-toaster';

@NgModule({
  imports: [
    ThemeModule,
    VotacionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    // VotoService,
    ToasterService,
  ],
  exports: [
    CrudVotacionComponent,
  ],
})
export class VotacionModule { }
