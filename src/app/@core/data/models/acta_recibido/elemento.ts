import { TipoBien } from './tipo_bien';
import { EstadoElemento } from './estado_elemento';
import { SoporteActa } from './soporte_acta';

export class Elemento {
    Id: number;
    Nombre: string;
    Cantidad: number;
    Marca: string;
    Serie: string;
    UnidadMedida: number;
    ValorUnitario: number;
    Subtotal: number;
    Descuento: number;
    ValorTotal: number;
    PorcentajeIvaId: number; // Remplazar por modelo cuando este disponoble
    ValorIva: number;
    ValorFinal: number;
    SubgrupoCatalogoId: number; // Remplazar por modelo cuando este disponoble
    Verificado: boolean;
    TipoBienId: TipoBien;
    EstadoElementoId: EstadoElemento;
    SoporteActaId: SoporteActa;
    Activo: boolean;
    FechaCreacion: Date;
    FechaModificacion: Date;
    Placa: string;
}
