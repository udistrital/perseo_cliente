import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotacionComponent } from './votacion.component';
import { ListVotacionComponent } from './list-votacion/list-votacion.component';
import { CrudVotacionComponent } from './crud-votacion/crud-votacion.component';



const routes: Routes = [{
  path: '',
  component: VotacionComponent,
  children: [{
    path: 'list-votacion',
    component: ListVotacionComponent,
  }, {
    path: 'crud-votacion',
    component: CrudVotacionComponent,
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
