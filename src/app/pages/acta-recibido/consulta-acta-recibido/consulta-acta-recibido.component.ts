import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { NbDatepicker } from '@nebular/theme';


@Component({
  selector: 'ngx-consulta-acta-recibido',
  templateUrl: './consulta-acta-recibido.component.html',
  styleUrls: ['./consulta-acta-recibido.component.scss'],
})
export class ConsultaActaRecibidoComponent implements OnInit {


  source: LocalDataSource;

  settings = {
    actions: {
      custom: [
        {
          name: 'Ver',
          title: '<i class="fas fa-eye" nbPopover="Ver" nbPopoverTrigger="hint" nbPopoverPlacement="bottom"></i>',
        },
        {
          name: 'Editar',
          title: '<i class="fas fa-pencil-alt" nbPopover="Editar" nbPopoverTrigger="hint" nbPopoverPlacement="bottom"></i>',
        },
        {
          name: 'Anular',
          title: '<i class="fas fa-trash-alt" nbPopover="Anular" nbPopoverTrigger="hint" nbPopoverPlacement="bottom"></i>',
        },
        {
          name: 'Enviar a Revision',
          title: '<i class="fas fa-play" nbPopover="Enviar a Revisor" nbPopoverTrigger="hint" nbPopoverPlacement="bottom"></i>',
        },
        {
          name: 'Enviar a Jefe de Area',
          title: '<i class="fas fa-forward" nbPopover="Enviar a Jefe de Area" nbPopoverTrigger="hint" nbPopoverPlacement="bottom"></i>',
        },
        {
          name: 'Verificar',
          title: '<i class="fas fa-tasks" nbPopover="Verificar" nbPopoverTrigger="hint" nbPopoverPlacement="bottom"></i>',
        },
      ],
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
        title: 'Fecha de Creacion',
        filter: {
          type: 'daterange',
          config: {
            daterange: {
              format: 'mm/dd/yyyy',
            },
          },
        },
      },
      fecha_visto_bueno: {
        title: 'Fecha Visto Bueno',
      },
      revisor: {
        title: 'Revisor',
      },
      estado: {
        title: 'Estado',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'adfasd', title: 'Glenna Reichert' },
              { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
              { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' },
            ],
          },
        },
      },
      ubicacion: {
        title: 'Ubicacion',
      },
      numero_factura: {
        title: 'Numero Factura',
      },
      fecha_factura: {
        title: 'Fecha de Factura',
      },
      proveedor: {
        title: 'Proveedor',
      },
      observaciones: {
        title: 'Observaciones',
      },
    },
  };
  data = [
    {
      id: '00-123',
      consecutivo: '00-123',
      fecha_creacion: '03/06/2019',
      fecha_visto_bueno: '07/06/2019',
      revisor: 'Revisor 1',
      estado: 'Estado 2',
      ubicacion: 'Laboratorios Ingenieria',
      numero_factura: 'QW-124324-1234',
      fecha_factura: '03/06/2019',
      proveedor: 'Dell',
      observaciones: 'lorem ipsum lorem ipsum lorem',
    },
    {
      id: '00-123',
      consecutivo: '00-123',
      fecha_creacion: '03/06/2019',
      fecha_visto_bueno: '07/06/2019',
      revisor: 'Revisor 1',
      estado: 'Estado 2',
      ubicacion: 'Laboratorios Ingenieria',
      numero_factura: 'QW-124324-1234',
      fecha_factura: '03/06/2019',
      proveedor: 'Dell',
      observaciones: 'lorem ipsum lorem ipsum lorem',
    },
    {
      id: '00-123',
      consecutivo: '00-123',
      fecha_creacion: '03/06/2019',
      fecha_visto_bueno: '07/06/2019',
      revisor: 'Revisor 1',
      estado: 'Estado 2',
      ubicacion: 'Laboratorios Ingenieria',
      numero_factura: 'QW-124324-1234',
      fecha_factura: '03/06/2019',
      proveedor: 'Dell',
      observaciones: 'lorem ipsum lorem ipsum lorem',
    },
    {
      id: '00-123',
      consecutivo: '00-123',
      fecha_creacion: '03/06/2019',
      fecha_visto_bueno: '07/06/2019',
      revisor: 'Revisor 1',
      estado: 'Estado 2',
      ubicacion: 'Laboratorios Ingenieria',
      numero_factura: 'QW-124324-1234',
      fecha_factura: '03/06/2019',
      proveedor: 'Dell',
      observaciones: 'lorem ipsum lorem ipsum lorem',
    },
    {
      id: '00-123',
      consecutivo: '00-123',
      fecha_creacion: '03/06/2019',
      fecha_visto_bueno: '07/06/2019',
      revisor: 'Revisor 1',
      estado: 'Estado 2',
      ubicacion: 'Laboratorios Ingenieria',
      numero_factura: 'QW-124324-1234',
      fecha_factura: '03/06/2019',
      proveedor: 'Dell',
      observaciones: 'lorem ipsum lorem ipsum lorem',
    },
  ];

  constructor(private translate: TranslateService, private router: Router) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => { // Live reload
    });
    this.source = new LocalDataSource(); // create the source
  }
  ngOnInit() {
    this.source.load(this.data);
  }

  onCustom(event: any) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.consecutivo}`);
    if (event !== null) {
      this.router.navigate(['/pages/acta_recibido/registro_acta_recibido', { id: event.data.consecutivo }]);
    }
  }
  onRegister() {
    this.router.navigate(['/pages/acta_recibido/registro_acta_recibido']);
  }

}
