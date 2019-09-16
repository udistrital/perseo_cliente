import { ActaRecibido } from './acta_recibido';

export class SoporteActa {
    Id: number;
    Consecutivo: number;
    ProveedorId: number; // CAMBIAR POR MODELO CUANDO SE PUEDA CONSULTAR
    FechaSoporte: Date;
    ActaRecibidoId: ActaRecibido;
    Activo: boolean;
    FechaCreacion: Date;
    FechaModificacion: Date;
}

export class Proveedor {
    Id: number;
    NomProveedor: string;
    NumDocumento: string;
    TipoPersona: string;
    Correo: string;
}
export class Ubicacion {
    Id: number;
    Codigo: string;
    Nombre: string; // CAMBIAR POR MODELO CUANDO SE PUEDA CONSULTAR
    Estado: string;
}

