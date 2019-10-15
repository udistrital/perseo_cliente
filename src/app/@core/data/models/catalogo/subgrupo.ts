import { Grupo } from './grupo';

export class Subgrupo {
  Id: number;
  Codigo: number;
  Nombre: string;
  Descripcion: string;
  FechaCreacion: Date;
  FechaModificacion: Date;
  Activo: boolean;
  // Grupo: Grupo;
}

export class SubgrupoTransaccion {
  SubgrupoPadre: Subgrupo;
  SubgrupoHijo: Array<Subgrupo>;
}
