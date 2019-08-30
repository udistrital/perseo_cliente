import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ngx-smart-table';
import { Router } from '@angular/router';
import { EntradaHelper } from '../../../helpers/entradas/entradaHelper';
// import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from './smart-table-datepicker/smart-table-datepicker.component'

@Component({
  selector: 'ngx-consulta-entrada',
  templateUrl: './consulta-entrada.component.html',
  styleUrls: ['./consulta-entrada.component.scss'],
})

export class ConsultaEntradaComponent implements OnInit {

  source: LocalDataSource;
  detalle: boolean;

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
      consecutivo: {
        title: 'Consecutivo',
      },
      acta_recibido: {
        title: 'Acta de Recibido',
      },
      fecha_creacion: {
        title: 'Fecha de Creación',
      },
      fecha_visto_bueno: {
        title: 'Fecha Visto Bueno',
        // filter: {
        //   type: 'custom',
        //   renderComponent: SmartTableDatepickerRenderComponent,
        //   config: {
        //     renderComponent: SmartTableDatepickerRenderComponent,
        //     editor: {
        //       type: 'custom',
        //       component: SmartTableDatepickerComponent,
        //     },
        //   },
        // },
      },
      tipo_entrada: {
        title: 'Tipo Entrada',
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

  data = [
    {
      consecutivo: '00-123',
      acta_recibido: '1234',
      fecha_creacion: '03/06/2019',
      fecha_visto_bueno: '07/06/2019',
      tipo_entrada: 'Adquisición',
      revisor: 'Revisor 1',
      estado: 'Estado 2',
    },
    {
      consecutivo: '00-124',
      acta_recibido: '5678',
      fecha_creacion: '03/06/2019',
      fecha_visto_bueno: '07/06/2019',
      tipo_entrada: 'Elaboración Propia',
      revisor: 'Revisor 1',
      estado: 'Aprobado',
    },
    {
      consecutivo: '00-125',
      acta_recibido: '9012',
      fecha_creacion: '03/06/2019',
      fecha_visto_bueno: '08/06/2019',
      tipo_entrada: 'Donación',
      revisor: 'Revisor 3',
      estado: 'Aprobado',
    },
    {
      consecutivo: '00-126',
      acta_recibido: '3456',
      fecha_creacion: '03/06/2019',
      fecha_visto_bueno: '07/06/2019',
      tipo_entrada: 'Reposición',
      revisor: 'Revisor 2',
      estado: 'Aprobado',
    },
    {
      consecutivo: '00-127',
      acta_recibido: '7890',
      fecha_creacion: '03/06/2019',
      fecha_visto_bueno: '09/06/2019',
      tipo_entrada: 'Sobrante',
      revisor: 'Revisor 3',
      estado: 'Aprobado',
    },
    {
      consecutivo: '00-128',
      acta_recibido: '9876',
      fecha_creacion: '03/06/2019',
      fecha_visto_bueno: '08/06/2019',
      tipo_entrada: 'Terceros',
      revisor: 'Revisor 3',
      estado: 'Aprobado',
    },
  ];

  constructor(private router: Router, private entradasHelper: EntradaHelper) {
    this.source = new LocalDataSource();
    this.source.load(this.data);
    this.detalle = false;
  }

  onCustom(event) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.consecutivo}`);
    this.detalle = true;
  }

  onRegister() {
    this.router.navigate(['/pages/entradas/registro']);
  }

  ngOnInit() {
  }

}
