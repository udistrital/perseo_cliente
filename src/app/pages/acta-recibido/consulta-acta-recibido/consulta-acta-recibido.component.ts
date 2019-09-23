import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalDataSource } from 'ngx-smart-table';
import { Router } from '@angular/router';
import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';
import { PopUpManager } from '../../../managers/popUpManager';
import { ActaRecibido } from '../../../@core/data/models/acta_recibido/acta_recibido';
import { ConsultaActaRecibido } from '../../../@core/data/models/acta_recibido/consulta_actas';
import { stringify } from '@angular/compiler/src/util';
import { Ubicacion } from '../../../@core/data/models/acta_recibido/soporte_acta';

@Component({
  selector: 'ngx-consulta-acta-recibido',
  templateUrl: './consulta-acta-recibido.component.html',
  styleUrls: ['./consulta-acta-recibido.component.scss'],
})
export class ConsultaActaRecibidoComponent implements OnInit {

  actaSeleccionada: string;
  estadoActaSeleccionada: string;
  source: LocalDataSource;
  actas: Array<ConsultaActaRecibido>;
  Ubicaciones: Array<Ubicacion>;

  settings = {
    hideSubHeader: true,
    noDataMessage: 'No se encontraron elementos asociados.',
    actions: {
      columnTitle: 'Acciones',
      custom: [
        {
          name: 'Ver',
          title: '<i class="fas fa-eye"></i>',
        },
        {
          name: 'Editar',
          title: '<i class="fas fa-pencil-alt"></i>',
        },
      ],
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      Id: {
        title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.ConsecutivoHeader'),
        width: '90px',
        valuePrepareFunction: (value: any) => {
          return value;
        },
      },
      FechaCreacion: {
        title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.FechaCreacionHeader'),
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
        title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.FechaModificacionHeader'),
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
        title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.FechaVistoBuenoHeader'),
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
        title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.RevisorHeader'),
        valuePrepareFunction: (value: any) => {
          return value;
        },
      },
      Estado: {
        title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.EstadoHeader'),
        valuePrepareFunction: (value: any) => {
          return value;
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'Registrada', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Registrada') },
              { value: 'En Elaboracion', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Elaboracion') },
              { value: 'En Modificacion', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Modificacion') },
              { value: 'En Verificacion', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Verificacion') },
              { value: 'Aceptada', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Aceptada') },
              { value: 'Asociada a Entrada', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Asociada') },
              { value: 'Anulada', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Anulada') },
            ],
          },
        },
      },
      UbicacionId: {
        title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.UbicacionHeader'),
        valuePrepareFunction: (value: any) => {
          return value;
        },
      },
      Observaciones: {
        title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.ObservacionesHeader'),
        valuePrepareFunction: (value: any) => {
          return value;
        },
      },
    },
  };


  accion: string;


  constructor(private translate: TranslateService,
    private router: Router,
    private actaRecibidoHelper: ActaRecibidoHelper,
    private pUpManager: PopUpManager) {

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => { // Live reload
      this.cargarCampos();
    });
    this.source = new LocalDataSource(); // create the source
    this.actas = new Array<ConsultaActaRecibido>();


  }
  ngOnInit() {
    this.Traer_Parametros_Soporte();
  }

  cargarCampos() {

    this.settings = {
      hideSubHeader: true,
      noDataMessage: 'No se encontraron elementos asociados.',
      actions: {
        columnTitle: 'Acciones',
        custom: [
          {
            name: 'Ver',
            title: '<i class="fas fa-eye"></i>',
          },
          {
            name: 'Editar',
            title: '<i class="fas fa-pencil-alt"></i>',
          },
        ],
        position: 'right',
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        Id: {
          title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.ConsecutivoHeader'),
          width: '90px',
          valuePrepareFunction: (value: any) => {
            return value;
          },
        },
        FechaCreacion: {
          title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.FechaCreacionHeader'),
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
          title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.FechaModificacionHeader'),
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
          title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.FechaVistoBuenoHeader'),
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
          title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.RevisorHeader'),
          valuePrepareFunction: (value: any) => {
            return value;
          },
        },
        Estado: {
          title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.EstadoHeader'),
          valuePrepareFunction: (value: any) => {
            return value;
          },
          filter: {
            type: 'list',
            config: {
              selectText: 'Select...',
              list: [
                { value: 'Registrada', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Registrada') },
                { value: 'En Elaboracion', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Elaboracion') },
                { value: 'En Modificacion', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Modificacion') },
                { value: 'En Verificacion', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Verificacion') },
                { value: 'Aceptada', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Aceptada') },
                { value: 'Asociada a Entrada', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Asociada') },
                { value: 'Anulada', title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.Anulada') },
              ],
            },
          },
        },
        UbicacionId: {
          title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.UbicacionHeader'),
          valuePrepareFunction: (value: any) => {
            return value;
          },
        },
        Observaciones: {
          title: this.translate.instant('GLOBAL.Acta_Recibido.ConsultaActas.ObservacionesHeader'),
          valuePrepareFunction: (value: any) => {
            return value;
          },
        },
      },
    };
  }

  Traer_Parametros_Soporte() {
    this.actaRecibidoHelper.getParametrosSoporte().subscribe(res => {
      if (res !== null) {
        this.loadActas(res[0].Ubicaciones);
      }
    });
  }
  onCustom(event: any) {

    this.actaSeleccionada = `${event.data.Id}`;
    this.estadoActaSeleccionada = `${event.data.Estado}`;
    this.accion = `${event.action}`;
  }
  onRegister() {
    this.router.navigate(['/pages/acta_recibido/registro_acta_recibido']);
  }

  loadActas(ubicaciones: Array<Ubicacion>): void {
    this.actaRecibidoHelper.getActasRecibido2().subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        this.Ubicaciones = ubicaciones;
        for (const datos in Object.keys(data)) {
          if (data.hasOwnProperty(datos)) {
            const acta = new ConsultaActaRecibido;
            const ubicacion = this.Ubicaciones.find(ubicacion_ => ubicacion_.Id === data[datos].ActaRecibidoId.UbicacionId);
            if (ubicacion == null) {
              acta.UbicacionId = 'Ubicacion no Especificada';
            } else {
              acta.UbicacionId = ubicacion.Nombre;
            }
            acta.Activo = data[datos].ActaRecibidoId.Activo;
            acta.FechaCreacion = data[datos].ActaRecibidoId.FechaCreacion;
            acta.FechaModificacion = data[datos].ActaRecibidoId.FechaModificacion;
            acta.FechaVistoBueno = data[datos].ActaRecibidoId.FechaVistoBueno;
            acta.Id = data[datos].ActaRecibidoId.Id;
            acta.Observaciones = data[datos].ActaRecibidoId.Observaciones;
            acta.RevisorId = data[datos].ActaRecibidoId.RevisorId;
            acta.Estado = data[datos].EstadoActaId.Nombre;
            this.actas.push(acta);
          }
        }
        this.source.load(this.actas);
      }
    });
    this.actaSeleccionada = '';
  }
}
