import { Catalogo } from '../catalogo';

export class Grupo {
  Id: number;
  Codigo: number;
  Nombre: string;
  Descripcion: string;
  Activo: boolean;
  Catalogo: Catalogo;
}

export class GrupoTransaccion {
    Catalogo: Catalogo;
    Subgrupo: Grupo;
  }