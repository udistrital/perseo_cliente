import { ActaRecibido } from './acta_recibido';
import { Proveedor } from './Proveedor';

export class SoporteActa {
    Id: number;
    Consecutivo: number;
    Proveedor: number; // CAMBIAR POR MODELO CUANDO SE PUEDA CONSULTAR
    FechaSoporte: Date;
    ActaRecibidoId: ActaRecibido;
    Activo: boolean;
    FechaCreacion: Date;
    FechaModificacion: Date;
}

export class SoporteActaProveedor {
    Id: number;
    Consecutivo: number;
    Proveedor: Proveedor; // CAMBIAR POR MODELO CUANDO SE PUEDA CONSULTAR
    FechaSoporte: Date;
    ActaRecibidoId: ActaRecibido;
    Activo: boolean;
    FechaCreacion: Date;
    FechaModificacion: Date;
}
