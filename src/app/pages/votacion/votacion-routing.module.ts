import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotacionComponent } from './votacion.component';
import { ListVotacionComponent } from './list-votacion/list-votacion.component';
import { CrudVotacionComponent } from './crud-votacion/crud-votacion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';




const routes: Routes = [{
  path: '',
  component: VotacionComponent,
  children: [{
    path: 'list-votacion',
    component: ListVotacionComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'crud-votacion',
    component: CrudVotacionComponent,
    canActivate: [AuthGuard],
  }],
}];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      RouterModule,
  ],
})

export class VotacionRoutingModule { }

export const routedComponents = [
  VotacionComponent,
  ListVotacionComponent,
  CrudVotacionComponent,
];
