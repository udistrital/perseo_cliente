import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntradasComponent } from './entradas.component';
import { RegistroComponent } from './registro/registro.component';
import { AdquisicionComponent } from './adquisicion/adquisicion.component';
import { ReposicionComponent } from './reposicion/reposicion.component';
import { ElaboracionPropiaComponent } from './elaboracion-propia/elaboracion-propia.component';
import { SobranteComponent } from './sobrante/sobrante.component';
import { DonacionComponent } from './donacion/donacion.component';
import { TercerosComponent } from './terceros/terceros.component';

const routes: Routes = [{
  path: '',
  component: EntradasComponent,
  children: [
    {
      path: 'registro',
      component: RegistroComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntradasRoutingModule { }
