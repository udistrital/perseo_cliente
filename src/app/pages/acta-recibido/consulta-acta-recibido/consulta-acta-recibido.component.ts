import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalDataSource } from 'ngx-smart-table';
import { Router } from '@angular/router';
import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';
import { PopUpManager } from '../../../managers/popUpManager';
import { ActaRecibido } from '../../../@core/data/models/acta_recibido/acta_recibido';
import { ConsultaActaRecibido } from '../../../@core/data/models/acta_recibido/consulta_actas';
import { stringify } from '@angular/compiler/src/util';

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

  settings = {
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
        title: 'Consecutivo',
        width: '90px',
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
      Estado: {
        title: 'Estado',
        valuePrepareFunction: (value: any) => {
          return value;
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'Registrada', title: 'Registrada' },
              { value: 'En Elaboracion', title: 'En Elaboracion' },
              { value: 'En Modificacion', title: 'En Modificacion' },
              { value: 'En Verificacion', title: 'En Verificacion' },
              { value: 'Aceptada', title: 'Aceptada' },
              { value: 'Asociada a Entrada', title: 'Asociada a Entrada'},
              { value: 'Anulada', title: 'Anulada' },
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
  accion: string;



  constructor(private translate: TranslateService, 
    private router: Router, 
    private actaRecibidoHelper: ActaRecibidoHelper, 
    private pUpManager: PopUpManager) {
      
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => { // Live reload
    });
    this.source = new LocalDataSource(); // create the source
      this.actas = new Array<ConsultaActaRecibido>();
      this.actaSeleccionada = '';
      this.loadActas();
  }
  ngOnInit() {

  }

  onCustom(event: any) {

    this.actaSeleccionada = `${event.data.Id}`;
    this.estadoActaSeleccionada = `${event.data.Estado}`;
    this.accion = `${event.action}`;

    console.log(this.accion);
    console.log(this.estadoActaSeleccionada);
    console.log(this.actaSeleccionada);

  }
  onRegister() {
    this.router.navigate(['/pages/acta_recibido/registro_acta_recibido']);
  }

  loadActas(): void {
    this.actaRecibidoHelper.getActasRecibido2().subscribe(res => {
      if (res !== null) {
        console.log(res);
        const data = <Array<any>>res;
        for (const datos in Object.keys(data)) {
          if (data.hasOwnProperty(datos)) {
            const acta = new ConsultaActaRecibido;
            acta.Activo = data[datos].ActaRecibidoId.Activo;
            acta.FechaCreacion = data[datos].ActaRecibidoId.FechaCreacion;
            acta.FechaModificacion = data[datos].ActaRecibidoId.FechaModificacion;
            acta.FechaVistoBueno = data[datos].ActaRecibidoId.FechaVistoBueno;
            acta.Id = data[datos].ActaRecibidoId.Id;
            acta.Observaciones = data[datos].ActaRecibidoId.Observaciones;
            acta.RevisorId = data[datos].ActaRecibidoId.RevisorId;
            acta.UbicacionId = data[datos].ActaRecibidoId.UbicacionId;
            acta.Estado = data[datos].EstadoActaId.Nombre;
            this.actas.push(acta);
          }
        }
        this.source.load(this.actas);
      }
    });
    
  }
}
