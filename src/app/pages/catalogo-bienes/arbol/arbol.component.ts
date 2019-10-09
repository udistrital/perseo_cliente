import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { CatalogoBienesHelper } from '../../../helpers/catalogo_bienes/catalogoBienesHelper';
import { NbTreeGridDataSource, NbSortDirection, NbSortRequest, NbTreeGridDataSourceBuilder } from '@nebular/theme';

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
  selector: 'ngx-arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.scss'],
})
export class ArbolComponent implements OnInit {

  data: TreeNode<CatalogoArbol>[];
  customColumn = 'Codigo';
  defaultColumns = ['Nombre', 'Descripcion'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  

  dataSource: NbTreeGridDataSource<CatalogoArbol>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  @Input() catalogoId: number;

  @Output() grupo = new EventEmitter<CatalogoArbol>();

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<CatalogoArbol>, private catalogoHelper: CatalogoBienesHelper) { }

  ngOnInit() {
    this.loadTreeCatalogo();
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

  getSelectedRow2(selectedRow) {
    this.grupo.emit(selectedRow);
  }

  loadTreeCatalogo() {
    this.catalogoHelper.getArbolCatalogo(this.catalogoId).subscribe((res) => {
      if (res !== null) {
        this.data = res;
        console.log(this.data);
        this.dataSource = this.dataSourceBuilder.create(this.data);
      }
    });
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
