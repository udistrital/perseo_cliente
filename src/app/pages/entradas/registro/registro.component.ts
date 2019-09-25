import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ngx-smart-table';
import { ActaRecibido } from '../../../@core/data/models/acta_recibido/acta_recibido';
import { PopUpManager } from '../../../managers/popUpManager';
import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  // Datos Tabla
  source: LocalDataSource;
  // Acta de recibido
  actas: Array<ActaRecibido>;
  actaSeleccionada: string;
  settings: any;
  opcionEntrada: string;

  constructor(private actaRecibidoHelper: ActaRecibidoHelper, private pUpManager: PopUpManager, private translate: TranslateService) {
    this.source = new LocalDataSource();
    this.actas = new Array<ActaRecibido>();
    this.actaSeleccionada = '';
    this.loadTablaSettings();
    this.loadActas();
  }

  loadTablaSettings() {
    this.settings = {
      hideSubHeader: false,
      noDataMessage: this.translate.instant('GLOBAL.no_data'),
      actions: {
        columnTitle: this.translate.instant('GLOBAL.acciones'),
        position: 'right',
        add: false,
        edit: false,
        delete: false,
        custom: [
          {
            name: 'detalle',
            title: '<i class="fas fa-edit" title="Seleccionar"></i>',
          },
        ],
      },
      columns: {
        Id: {
          title: this.translate.instant('GLOBAL.consecutivo'),
        },
        FechaCreacion: {
          title: this.translate.instant('GLOBAL.fecha_creacion'),
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
          title: this.translate.instant('GLOBAL.fecha_visto_bueno'),
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
          title: this.translate.instant('GLOBAL.revisor'),
        },
        UbicacionId: {
          title: this.translate.instant('GLOBAL.ubicacion'),
        },
        CodigoAbreviacion: {
          title: this.translate.instant('GLOBAL.estado'),
        },
        Observaciones: {
          title: this.translate.instant('GLOBAL.observaciones'),
        },
      },
    };
  }


  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => { // Live reload
      this.loadTablaSettings();
    });
  }

  loadActas(): void {
    this.actaRecibidoHelper.getActasRecibido().subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        for (const datos in Object.keys(data)) {
          if (data.hasOwnProperty(datos) && data[datos].ActaRecibidoId !== null) {
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

  onCustom(event) {
    this.actaSeleccionada = `${event.data.Id}`;
  }

}
