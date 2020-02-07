import { Injectable } from '@angular/core';
import { IAppState } from '../app.state';
import { Store } from '@ngrx/store';
import { REDUCER_LIST } from '../reducer.constants';
// import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';
// import { Proveedor } from '../../../@core/data/models/acta_recibido/Proveedor';
import { Observable } from 'rxjs';
import { CatalogoElementosHelper } from '../../../helpers/catalogo-elementos/catalogoElementosHelper';
import { EvaluacionmidService } from '../../data/evaluacionmid.service';

@Injectable()
export class ListService {

  constructor(
    // private ActaRecibido: ActaRecibidoHelper,
    private CatalogoElementos: CatalogoElementosHelper,
    private evaluacionmidService: EvaluacionmidService,
    private store: Store<IAppState>) {
  }

  public findProveedores() {

    this.store.select(REDUCER_LIST.Proveedores).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          // this.ActaRecibido.getProveedores()
          //   .subscribe(
          //     (res: any[]) => {

          //       for (const index in res) {
          //         if (res.hasOwnProperty(index)) {
          //           res[index].compuesto = res[index].NumDocumento + ' - ' + res[index].NomProveedor;
          //         }
          //       }
          //       this.addList(REDUCER_LIST.Proveedores, res);

          //     },
          //     error => {
          //       this.addList(REDUCER_LIST.Proveedores, []);
          //     },
          //   );
        }
      },
    );
  }
  public findPlanCuentasCredito() {

    this.store.select(REDUCER_LIST.PlanCuentasCredito).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.CatalogoElementos.getPlanCuentas('Credito')
            .subscribe(
              (res: any[]) => {

                this.addList(REDUCER_LIST.PlanCuentasCredito, res);
              },
              error => {
                this.addList(REDUCER_LIST.PlanCuentasCredito, []);
              },
            );
        }
      },
    );
  }
  public findPlanCuentasDebito() {

    this.store.select(REDUCER_LIST.PlanCuentasDebito).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.CatalogoElementos.getPlanCuentas('Debito')
            .subscribe(
              (res: any[]) => {

                this.addList(REDUCER_LIST.PlanCuentasDebito, res);
              },
              error => {
                this.addList(REDUCER_LIST.PlanCuentasDebito, []);
              },
            );
        }
      },
    );
  }

  public findPlantilla() {

    this.store.select(REDUCER_LIST.Plantilla).subscribe(
      (list: any) => {
        console.info('REDUCER');
        if (!list || list.length === 0) {
          console.info('se busca platilla');
          this.evaluacionmidService.get('plantilla')
            .subscribe(
              (res: any[]) => {
                console.info('PLATILLA ENCONTRADA');

                this.addList(REDUCER_LIST.Plantilla, res);
              },
              error => {
                this.addList(REDUCER_LIST.Plantilla, []);
              },
            );
        }
      },
    );
  }

  private addList(type: string, object: Array<any>) {
    this.store.dispatch({
      type: type,
      payload: object,
    });
  }
}
