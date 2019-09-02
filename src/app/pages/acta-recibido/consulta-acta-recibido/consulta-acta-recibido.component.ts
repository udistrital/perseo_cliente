import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalDataSource } from 'ngx-smart-table';
import { Router } from '@angular/router';
import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';
import { PopUpManager } from '../../../managers/popUpManager';
import { ActaRecibido } from '../../../@core/data/models/acta_recibido/acta_recibido';

@Component({
  selector: 'ngx-consulta-acta-recibido',
  templateUrl: './consulta-acta-recibido.component.html',
  styleUrls: ['./consulta-acta-recibido.component.scss'],
})
export class ConsultaActaRecibidoComponent implements OnInit {

  actaSeleccionada: string;
  source: LocalDataSource;
  actas: Array<ActaRecibido>;

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
      edit: true,
      delete: false,
    },
    columns: {
      Id: {
        title: 'Consecutivo',
        valuePrepareFunction: (value: any) => {
          return value;
        },
      },
      FechaCreacion: {
        title: 'Fecha de Creacion',
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
      FechaModificacion: {
        title: 'Fecha de Modificacion',
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
      FechaVistoBueno: {
        title: 'Fecha Visto Bueno',
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
      RevisorId: {
        title: 'Revisor',
        valuePrepareFunction: (value: any) => {
          return value;
        },
      },
      estado: {
        title: 'Estado',
        valuePrepareFunction: (value: any) => {
          return value;
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: '1', title: 'Registrada' },
              { value: '2', title: 'En Elaboracion' },
              { value: '3', title: 'En Revision' },
              { value: '4', title: 'En Verificacion' },
              { value: '5', title: 'Aceptada' },
              { value: '6', title: 'Anulada' },

            ],
          },
        },
      },
      UbicacionId: {
        title: 'Ubicacion',
        valuePrepareFunction: (value: any) => {
          return value;
        },
      },
      Observaciones: {
        title: 'Observaciones',
        valuePrepareFunction: (value: any) => {
          return value;
        },
      },
    },
  };



  constructor(private translate: TranslateService, private router: Router, private actaRecibidoHelper: ActaRecibidoHelper, private pUpManager: PopUpManager) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => { // Live reload
    });
    this.source = new LocalDataSource(); // create the source
      this.actas = new Array<ActaRecibido>();
      this.actaSeleccionada = '';
      this.loadActas();
  }
  ngOnInit() {

  }

  onCustom(event: any) {

    this.actaSeleccionada = `${event.data.Id}`;

    alert(`Custom event '${event.action}' fired on row №: ${event.data.consecutivo}`);
    if (event !== null) {
      this.router.navigate(['/pages/acta_recibido/registro_acta_recibido', { id: event.data.consecutivo }]);
    }
  }
  onRegister() {
    this.router.navigate(['/pages/acta_recibido/registro_acta_recibido']);
  }

  loadActas(): void {
    this.actaRecibidoHelper.getActasRecibido2().subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        for (const datos in Object.keys(data)) {
          if (data.hasOwnProperty(datos)) {
            const acta = new ActaRecibido;
            acta.Activo = data[datos].ActaRecibidoId.Activo;
            acta.FechaCreacion = data[datos].ActaRecibidoId.FechaCreacion;
            acta.FechaModificacion = data[datos].ActaRecibidoId.FechaModificacion;
            acta.FechaVistoBueno = data[datos].ActaRecibidoId.FechaVistoBueno;
            acta.Id = data[datos].ActaRecibidoId.Id;
            acta.Observaciones = data[datos].ActaRecibidoId.Observaciones;
            acta.RevisorId = data[datos].ActaRecibidoId.RevisorId;
            acta.UbicacionId = data[datos].ActaRecibidoId.UbicacionId;
            acta.CodigoAbreviacion = data[datos].EstadoActaId.CodigoAbreviacion;
            this.actas.push(acta);
          }
        }
        this.source.load(this.actas);
      }
    });
  }
}
