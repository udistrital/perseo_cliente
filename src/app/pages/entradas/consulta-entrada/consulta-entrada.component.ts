import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ngx-smart-table';
import { Router } from '@angular/router';
import { EntradaHelper } from '../../../helpers/entradas/entradaHelper';
import { Entrada } from '../../../@core/data/models/entrada/entrada';

@Component({
  selector: 'ngx-consulta-entrada',
  templateUrl: './consulta-entrada.component.html',
  styleUrls: ['./consulta-entrada.component.scss'],
})

export class ConsultaEntradaComponent implements OnInit {

  source: LocalDataSource;
  entradas: Array<Entrada>;
  detalle: boolean;
  actaRecibidoId: number;

  settings = {
    hideSubHeader: false,
    noDataMessage: 'No se encontraron entradas asociadas.',
    actions: {
      columnTitle: 'Detalle',
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'detalle',
          title: '<i class="fas fa-eye" title="Ver"></i>',
        },
      ],
    },
    columns: {
      Consecutivo: {
        title: 'Consecutivo',
      },
      ActaRecibidoId: {
        title: 'Acta de Recibido',
      },
      FechaCreacion: {
        title: 'Fecha de Creación',
        width: '70px',
        valuePrepareFunction: (value: any) => {
          const date = value.split('T');
          return date[0];
        },
        filter: {
          type: 'daterange',
          config: {
            daterange: {
              format: 'yyyy/mm/dd',
            },
          },
        },
      },
      fecha_visto_bueno: {
        title: 'Fecha Visto Bueno',
      },
      TipoEntradaId: {
        title: 'Tipo Entrada',
        valuePrepareFunction: (value: any) => {
          return value.Nombre;
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Seleccionar...',
            list: [
              { value: 'Adquisición', title: 'Adquisición' },
              { value: 'Elaboración Propia', title: 'Elaboración Propia' },
              { value: 'Donación', title: 'Donación' },
              { value: 'Reposición', title: 'Reposición' },
              { value: 'Sobrante', title: 'Sobrante' },
              { value: 'Terceros', title: 'Terceros' },
            ],
          },
        },
      },
      revisor: {
        title: 'Revisor',
      },
      estado: {
        title: 'Estado',
      },
    },
  };

  constructor(private router: Router, private entradasHelper: EntradaHelper) {
    this.source = new LocalDataSource();
    this.entradas = new Array<Entrada>();
    this.detalle = false;
    this.loadEntradas();
  }

  loadEntradas(): void {
    this.entradasHelper.getEntradas().subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        for (const datos in Object.keys(data)) {
          if (data.hasOwnProperty(datos)) {
            const entrada = new Entrada;
            entrada.ActaRecibidoId = data[datos].ActaRecibidoId;
            entrada.ContratoId = data[datos].ContratoId;
            entrada.DocumentoContableId = data[datos].DocumentoContableId;
            entrada.FechaCreacion = data[datos].FechaCreacion;
            entrada.FechaModificacion = data[datos].FechaModificacion;
            entrada.Importacion = data[datos].Importacion;
            entrada.Observacion = data[datos].Observacion;
            entrada.Solicitante = data[datos].Solicitante;
            entrada.TipoEntradaId = data[datos].TipoEntradaId;
            entrada.ElementoId = data[datos].ElementoId;
            entrada.Consecutivo = data[datos].Consecutivo;
            entrada.Vigencia = data[datos].Vigencia;
            entrada.Activo = data[datos].Activo;
            this.entradas.push(entrada);
          }
        }
        this.source.load(this.entradas);
      }
    });
  }

  onCustom(event) {
    this.actaRecibidoId = +`${event.data.ActaRecibidoId}`;
    this.detalle = true;
  }

  onRegister() {
    this.router.navigate(['/pages/entradas/registro']);
  }

  ngOnInit() {
  }

}
