import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { CatalogoBienesHelper } from '../../../helpers/catalogo_bienes/catalogoBienesHelper';
import { NbTreeGridDataSource, NbSortDirection, NbSortRequest, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Observable } from 'rxjs';

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
  Codigo: number;
}

@Component({
  selector: 'ngx-arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.scss'],
})
export class ArbolComponent implements OnInit, OnChanges {

  data: TreeNode<CatalogoArbol>[];
  customColumn = 'Codigo';
  defaultColumns = ['Nombre', 'Descripcion'];
  allColumns = [this.customColumn, ...this.defaultColumns];


  dataSource: NbTreeGridDataSource<CatalogoArbol>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  catalogoSeleccionado: number;

  @Input() catalogoId: number;
  @Input() updateSignal: Observable<string[]>;
  @Output() grupo = new EventEmitter<CatalogoArbol>();
  @Output() subgrupo = new EventEmitter<CatalogoArbol>();

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<CatalogoArbol>, private catalogoHelper: CatalogoBienesHelper) { }

  ngOnInit() {
    this.catalogoSeleccionado = 0;
  }

  ngOnChanges(changes) {
    if (this.catalogoId !== this.catalogoSeleccionado) {
      this.loadTreeCatalogo();
      this.catalogoSeleccionado = this.catalogoId;
    }
    if (changes['updateSignal'] && this.updateSignal) {
      this.updateSignal.subscribe(() => {
        this.loadTreeCatalogo();
      });
    }
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
        this.dataSource = this.dataSourceBuilder.create(this.data);
      }
    });
  }

  getSelectedRow(selectedRow) {
    this.subgrupo.emit(selectedRow);
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
