import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CatalogoBienesHelper } from '../../../helpers/catalogo_bienes/catalogoBienesHelper';
import { Catalogo } from '../../../@core/data/models/catalogo/catalogo';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface CatalogoArbol {
  Id: number;
  Nombre: string;
  Descripcion: string;
  FechaCreacion: Date;
  FechaModificacion: Date;
  Activo: boolean;
}

@Component({
  selector: 'ngx-consulta-catalogo',
  templateUrl: './consulta-catalogo.component.html',
  styleUrls: ['./consulta-catalogo.component.scss']
})
export class ConsultaCatalogoComponent implements OnInit {

  private data: TreeNode<CatalogoArbol>[];
  private catalogos: Array<Catalogo>;

  customColumn = 'Id';
  defaultColumns = ['Nombre', 'Descripcion', 'FechaCreacion', 'FechaModificacion', 'Activo'];
  //customColumn = 'Nombre';
  //defaultColumns = ['Descripcion'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<CatalogoArbol>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<CatalogoArbol>, private catalogoHelper: CatalogoBienesHelper) {
    this.catalogos = new Array<Catalogo>();
    this.loadCatalogos();
  }

  ngOnInit() {
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  loadCatalogos() {
    this.catalogoHelper.getCatalogos().subscribe((res) => {
      if (res !== null) {
        const data = <Array<Catalogo>>res;
        for (const datos in Object.keys(data)) {
          if (data.hasOwnProperty(datos)) {
            this.catalogos.push(data[datos]);
          }
        }
      }
    });
  }

  loadTreeCatalogo(catalogo) {
    this.catalogoHelper.getArbolCatalogo(catalogo).subscribe((res) => {
      console.log(this.data)
      this.data = res;
      console.log(this.data)
      this.dataSource = this.dataSourceBuilder.create(this.data);
      console.log(this.dataSource)
    });
  }

  onChange(catalogo) {
    this.loadTreeCatalogo(catalogo);
  }

}

@Component({
  selector: 'ngx-nb-fs-icon',
  template: `
    <nb-tree-grid-row-toggle
      [expanded]="expanded"
      *ngIf="isDir(); else fileIcon"
    >
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon> </ng-template>
  `,
})
export class FsIconAComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
