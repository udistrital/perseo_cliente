import { ActaRecibido } from './acta_recibido';
import { EstadoActa } from './estado_acta'

export class HistoricoActa {
    Id: number;
    ActaRecibido: ActaRecibido;
    EstadoActa: EstadoActa;
    Activo: boolean;
    FechaCreacion: Date;
    FechaModificacion: Date;
}