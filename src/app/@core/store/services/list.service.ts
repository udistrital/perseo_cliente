import { Injectable } from '@angular/core';
import { IAppState } from '../app.state';
import { Store } from '@ngrx/store';
import { REDUCER_LIST } from '../reducer.constants';
import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';
import { Proveedor } from '../../data/models/acta_recibido/soporte_acta';
import { Observable } from 'rxjs';
@Injectable()
export class ListService {

  constructor(
    private ActaRecibido: ActaRecibidoHelper,
    private store: Store<IAppState>) {
  }

  public findProveedores() {

    this.store.select(REDUCER_LIST.Proveedores).subscribe(
      (list: any) => {
        if (!list || list.length === 0) {
          this.ActaRecibido.getProveedores()
            .subscribe(
              (res: any[]) => {

                for (const index in res) {
                  if (res.hasOwnProperty(index)) {
                    res[index].compuesto = res[index].NumDocumento + ' - ' + res[index].NomProveedor;
                  }
                }
                // console.log('ok');
                this.addList(REDUCER_LIST.Proveedores, res);

              },
              error => {
                this.addList(REDUCER_LIST.Proveedores, []);
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
