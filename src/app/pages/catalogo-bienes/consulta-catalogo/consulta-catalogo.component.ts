import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CatalogoBienesHelper } from '../../../helpers/catalogo_bienes/catalogoBienesHelper';

interface TreeNode<T> {
  Grupo: T;
  Subgrupo?: TreeNode<T>[];
  expanded?: boolean;
}

interface Catalogo {
  Id: number;
  Nombre: string;
  Descripcion: string;
  Fecha_creacion: string;
  Fecha_modificacion: string;
  Activo: boolean;
}

@Component({
  selector: 'ngx-consulta-catalogo',
  templateUrl: './consulta-catalogo.component.html',
  styleUrls: ['./consulta-catalogo.component.scss']
})
export class ConsultaCatalogoComponent implements OnInit {

  private data: TreeNode<Catalogo>[];

  customColumn = 'Nombre';
  defaultColumns = ['Descripcion'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<Catalogo>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<Catalogo>, private catalogoHelper: CatalogoBienesHelper) {
    this.loadTreeCatalogo();
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

  loadTreeCatalogo() {
    this.catalogoHelper.getArbolCatalogo(1).subscribe((res) => {
      this.data = res;
      console.log(res)
      this.dataSource = this.dataSourceBuilder.create(this.data);
      console.log(this.dataSource)
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
