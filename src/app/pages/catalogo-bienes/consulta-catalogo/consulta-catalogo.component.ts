import { Component, OnInit, Input } from '@angular/core';
import { CatalogoBienesHelper } from '../../../helpers/catalogo_bienes/catalogoBienesHelper';
import { Catalogo } from '../../../@core/data/models/catalogo/catalogo';

@Component({
  selector: 'ngx-consulta-catalogo',
  templateUrl: './consulta-catalogo.component.html',
  styleUrls: ['./consulta-catalogo.component.scss'],
})
export class ConsultaCatalogoComponent implements OnInit {

  private catalogos: Array<Catalogo>;
  catalogoId: number;

  constructor(private catalogoHelper: CatalogoBienesHelper) {
    this.catalogos = new Array<Catalogo>();
    this.catalogoId = 0;
    this.loadCatalogos();
  }

  ngOnInit() {
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

  onChange(catalogo) {
    this.catalogoId = catalogo;
  }

}
