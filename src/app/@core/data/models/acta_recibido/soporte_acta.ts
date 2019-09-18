import { ActaRecibido } from './acta_recibido';

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