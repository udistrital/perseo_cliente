import { Injectable } from '@angular/core';
import { RequestManager } from '../../managers/requestManager';
import { PopUpManager } from '../../managers/popUpManager';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ActaRecibidoHelper {

    constructor(private rqManager: RequestManager,
        private pUpManager: PopUpManager) { }

    /**
         * Contratos Get
         * If the response has errors in the OAS API it should show a popup message with an error.
         * If the response is successs, it returns the object's data.
         * @returns  <Observable> data of the object registered at the DB. undefined if the request has errors
         */
    public getActasRecibido() {
        this.rqManager.setPath('ACTA_RECIBIDO_SERVICE');
        return this.rqManager.get('historico_acta?query=EstadoActaId.Nombre:Aceptada,ActaRecibidoId.Activo:True').pipe(
            map(
                (res) => {
                    if (res === 'error') {
                        this.pUpManager.showErrorAlert('No se pudo consultar las actas de recibido');
                        return undefined;
                    }
                    return res;
                },
            ),
        );
    }

    /**
     * Elementos Acta Get
     * If the response has errors in the OAS API it should show a popup message with an error.
     * If the response is successs, it returns the object's data.
     * @returns  <Observable> data of the object registered at the DB. undefined if the request has errors
     */
    public getElementosActa(actaId) {
        this.rqManager.setPath('ACTA_RECIBIDO_SERVICE');
        return this.rqManager.get('elemento?query=SoporteActaId.ActaRecibidoId.Id:' + actaId + ',SoporteActaId.ActaRecibidoId.Activo:True').pipe(
            map(
                (res) => {
                    if (res === 'error') {
                        this.pUpManager.showErrorAlert('No se pudo consultar los elementos');
                        return undefined;
                    }
                    return res;
                },
            ),
        );
    }

    /**
     * Elementos Acta Get
     * If the response has errors in the OAS API it should show a popup message with an error.
     * If the response is successs, it returns the object's data.
     * @returns  <Observable> data of the object registered at the DB. undefined if the request has errors
     */
    public getSoporte(actaId) {
        this.rqManager.setPath('ACTA_RECIBIDO_SERVICE');
        return this.rqManager.get('soporte_acta?query=ActaRecibidoId:' + actaId + ',ActaRecibidoId.Activo:True').pipe(
            map(
                (res) => {
                    if (res === 'error') {
                        this.pUpManager.showErrorAlert('No se pudo consultar los elementos');
                        return undefined;
                    }
                    return res;
                },
            ),
        );
    }

}
