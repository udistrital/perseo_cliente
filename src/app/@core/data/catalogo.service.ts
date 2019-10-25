import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { CuentasFormulario, Observable_Cuentas } from './models/catalogo/cuentas_grupo';
import { BehaviorSubject } from 'rxjs';
import { CatalogoElementosHelper } from '../../helpers/catalogo-elementos/catalogoElementosHelper';
import { Subgrupo } from './models/catalogo/subgrupo';

@Injectable({
    providedIn: 'root'
})
export class CatalogoService {

    private movimiento: number;
    private cuentas_asociadas: CuentasFormulario;
    private subgrupo: Subgrupo;

    private movimiento$ = new BehaviorSubject(this.movimiento);
    private cuentas_asociadas$ = new BehaviorSubject(this.cuentas_asociadas);
    private subgrupo$ = new BehaviorSubject(this.subgrupo);

    private DatosFormulario$ = new BehaviorSubject(Array<Observable_Cuentas>());

    constructor(private CatalogoService: CatalogoElementosHelper) {

    }

    getMovimientos() {
        return [1,2,3,4,5,6,7,8,9];
    }
    getCuentas(Subgrupo: Subgrupo) {

    }


}
