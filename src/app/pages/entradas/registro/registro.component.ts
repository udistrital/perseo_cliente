import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActaRecibido } from '../../../@core/data/models/acta_recibido/acta_recibido';
import { PopUpManager } from '../../../managers/popUpManager';
import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';

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

  settings = {
    hideSubHeader: false,
    noDataMessage: 'No se encontraron actas asociadas.',
    actions: {
      columnTitle: 'Acciones',
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
        title: 'Consecutivo',
      },
      FechaCreacion: {
        title: 'Fecha de Creación',
      },
      FechaVistoBueno: {
        title: 'Fecha de Visto Bueno',
      },
      RevisorId: {
        title: 'Revisor',
      },
      UbicacionId: {
        title: 'Ubicación',
      },
      Estado: {
        title: 'Estado',
      },
      Observaciones: {
        title: 'Observaciones',
      },
    },
  };

  constructor(private actaRecibidoHelper: ActaRecibidoHelper, private pUpManager: PopUpManager) {
    this.source = new LocalDataSource();
    this.actas = new Array<ActaRecibido>();
    this.actaSeleccionada = '';
    this.loadActas();
  }

  ngOnInit() {
  }

  loadActas(): void {
    this.actaRecibidoHelper.getActasRecibido().subscribe(res => {
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
            this.actas.push(acta);
          }
        }
        this.source.load(this.actas);
      }
    });
  }

  onCustom(event) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.Id}`);
    // this.actaSeleccionada = `${event.data.Id}`;
    this.actaSeleccionada = '2';
  }

}
