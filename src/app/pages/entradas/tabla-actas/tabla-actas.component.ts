import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-tabla-actas',
  templateUrl: './tabla-actas.component.html',
  styleUrls: ['./tabla-actas.component.scss'],
})
export class TablaActasComponent implements OnInit {

  source: LocalDataSource;

  settings = {
    hideSubHeader: false,
    noDataMessage: 'No se encontraron actas asociadas.',
    actions: {
      columnTitle: 'Detalle',
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      consecutivo: {
        title: 'Consecutivo',
      },
      fecha_creacion: {
        title: 'Fecha de Creación',
      },
      fecha_visto_bueno: {
        title: 'Fecha de Visto Bueno',
      },
      revisor: {
        title: 'Revisor',
      },
      ubicacion: {
        title: 'Ubicación',
      },
      factura: {
        title: 'Factura',
      },
      fecha_factura: {
        title: 'Fecha de Factura',
      },
      proveedor: {
        title: 'Proveedor',
      },
      valor_unitario: {
        title: 'Valor Unitario',
      },
      observacion: {
        title: 'Observaciones',
      },
    },
  };

  data = [
  ];

  constructor() {
    this.source = new LocalDataSource();
    this.source.load(this.data);
  }

  ngOnInit() {
  }
}
