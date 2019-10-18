import { Subgrupo } from './subgrupo';

export class CuentaGrupo {
    Id: number;
    CuentaDebitoId: number;
    CuentaCreditoId: number;
    SubtipoMovimientoId: number;
    FechaCreacion: Date;
    FechaModificacion: Date;
    Activo: boolean;
    SubgrupoId: Subgrupo;
}
