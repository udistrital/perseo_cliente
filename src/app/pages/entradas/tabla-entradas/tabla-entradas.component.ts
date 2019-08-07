import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-tabla-entradas',
  templateUrl: './tabla-entradas.component.html',
  styleUrls: ['./tabla-entradas.component.scss'],
})
export class TablaEntradasComponent implements OnInit {

  source: LocalDataSource;

  settings = {
    hideSubHeader: true,
    noDataMessage: 'No se encontraron elementos asociados.',
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
      tipo_bien: {
        title: 'Tipo de Bien',
      },
      subgrupo: {
        title: 'Subgrupo',
      },
      descripcion: {
        title: 'Descripcion',
      },
      cantidad: {
        title: 'Cantidad',
      },
      marca: {
        title: 'Marca',
      },
      serie: {
        title: 'Serie',
      },
      unidad_medida: {
        title: 'Unidad de Medida',
      },
      valor_unitario: {
        title: 'Valor Unitario',
      },
      valor_cantidad: {
        title: 'Valor por Cantidad',
      },
      descuento: {
        title: 'Descuento',
      },
      iva: {
        title: '%IVA',
      },
      valor_iva: {
        title: 'Valor IVA',
      },
      valor_total: {
        title: 'Valor Total',
      },
    },
  };

  data = [
    {
      consecutivo: '1',
      tipo_bien: 'Consumo Controlado',
      subgrupo: '235-Equipo y Maquinaria',
      descripcion: 'Computador HP',
      cantidad: '1',
      marca: 'Compaq',
      serie: '1212-2017',
      unidad_medida: 'Unidades',
      valor_unitario: '4.000.000',
      valor_cantidad: '4.000.000',
      descuento: '0',
      iva: '10%',
      valor_iva: '200.000',
      valor_total: '4.200.000',
    },
    {
      consecutivo: '1',
      tipo_bien: 'Consumo Controlado',
      subgrupo: '235-Equipo y Maquinaria',
      descripcion: 'Computador HP',
      cantidad: '1',
      marca: 'Compaq',
      serie: '1212-2017',
      unidad_medida: 'Unidades',
      valor_unitario: '4.000.000',
      valor_cantidad: '4.000.000',
      descuento: '0',
      iva: '10%',
      valor_iva: '200.000',
      valor_total: '4.200.000',
    },
    {
      consecutivo: '1',
      tipo_bien: 'Consumo Controlado',
      subgrupo: '235-Equipo y Maquinaria',
      descripcion: 'Computador HP',
      cantidad: '1',
      marca: 'Compaq',
      serie: '1212-2017',
      unidad_medida: 'Unidades',
      valor_unitario: '4.000.000',
      valor_cantidad: '4.000.000',
      descuento: '0',
      iva: '10%',
      valor_iva: '200.000',
      valor_total: '4.200.000',
    },
    {
      consecutivo: '1',
      tipo_bien: 'Consumo Controlado',
      subgrupo: '235-Equipo y Maquinaria',
      descripcion: 'Computador HP',
      cantidad: '1',
      marca: 'Compaq',
      serie: '1212-2017',
      unidad_medida: 'Unidades',
      valor_unitario: '4.000.000',
      valor_cantidad: '4.000.000',
      descuento: '0',
      iva: '10%',
      valor_iva: '200.000',
      valor_total: '4.200.000',
    },
    {
      consecutivo: '1',
      tipo_bien: 'Consumo Controlado',
      subgrupo: '235-Equipo y Maquinaria',
      descripcion: 'Computador HP',
      cantidad: '1',
      marca: 'Compaq',
      serie: '1212-2017',
      unidad_medida: 'Unidades',
      valor_unitario: '4.000.000',
      valor_cantidad: '4.000.000',
      descuento: '0',
      iva: '10%',
      valor_iva: '200.000',
      valor_total: '4.200.000',
    },
    {
      consecutivo: '1',
      tipo_bien: 'Consumo Controlado',
      subgrupo: '235-Equipo y Maquinaria',
      descripcion: 'Computador HP',
      cantidad: '1',
      marca: 'Compaq',
      serie: '1212-2017',
      unidad_medida: 'Unidades',
      valor_unitario: '4.000.000',
      valor_cantidad: '4.000.000',
      descuento: '0',
      iva: '10%',
      valor_iva: '200.000',
      valor_total: '4.200.000',
    },
    {
      valor_iva: 'Subtotal',
      valor_total: '14.400.000',
    },
    {
      valor_iva: 'Descuento',
      valor_total: '0',
    },
    {
      valor_iva: 'IVA',
      valor_total: '1.080.000',
    },
    {
      valor_iva: 'Total',
      valor_total: '15.480.000',
    },
  ];

  constructor() {
    this.source = new LocalDataSource();
    this.source.load(this.data);
  }

  ngOnInit() {
  }

}
