import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../@core/_guards/auth.guard';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'evaluacion',
      loadChildren: './evaluacion/evaluacion.module#EvaluacionModule',
      canActivate: [AuthGuard],
    },
    {
      path: 'consulta_evaluacion/:TipoDocumento/:IdentificacionProveedor',
      loadChildren: './consulta-evaluacion/consulta-evaluacion.module#ConsultaEvaluacionModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
