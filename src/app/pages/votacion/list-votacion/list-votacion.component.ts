import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PersepMidService } from '../../../@core/data/perseomid.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-votacion',
  templateUrl: './list-votacion.component.html',
  styleUrls: ['./list-votacion.component.scss'],
})
export class ListVotacionComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  /*Se guarda los datos que envía el componente filtro*/
  data: any;
  datosFila: any;
  source: LocalDataSource = new LocalDataSource();
  vistaScript: boolean = false;

  constructor(
    private translate: TranslateService,
    private perseoMidService: PersepMidService,
    private toasterService: ToasterService) {
    this.data = [];
    this.vistaScript = false;
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
  }

  cargarCampos() {
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-person"></i>', // este boton no elimina, sera usado para informacion
        // confirmDelete: true,
      },
      mode: 'external',
      columns: {
        TIV_CODIGO: { // Id
          title: this.translate.instant('GLOBAL.id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TIV_NOMBRE: { // nombre
          title: this.translate.instant('GLOBAL.nombre'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TVI_OBSERVACION: {
          title: this.translate.instant('GLOBAL.observacion'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TIV_ANO: { // año
          title: this.translate.instant('GLOBAL.año'),
          // type: 'Date;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TIV_FECHA_ELECCION: {
          title: this.translate.instant('GLOBAL.fechaejecucion'),
          // type: 'Date;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TVI_ESTADO: {
          title: this.translate.instant('GLOBAL.estado'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TVI_DOCENTES_PLANTA: {
          title: this.translate.instant('GLOBAL.docentes_planta'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TVI_DOCENTES_VE: {
          title: this.translate.instant('GLOBAL.docentes_ve'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TVI_FUNCIONARIOS: {
          title: this.translate.instant('GLOBAL.funcionarios'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TVI_ESTUDIANTES: {
          title: this.translate.instant('GLOBAL.estudiantes'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TVI_EGRESADOS: {
          title: this.translate.instant('GLOBAL.egresados'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TVI_CONTRATISTAS: {
          title: this.translate.instant('GLOBAL.contratistas'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TVI_EXRECTORES: {
          title: this.translate.instant('GLOBAL.exrectores'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    // console.info('load"');
    this.perseoMidService.get('votacion').subscribe(res => {
      if (res !== null) {
        // console.info('trajo algo');
        const data = <Array<any>>res;
        this.source.load(data);
      }
    });
  }

  ngOnInit() {
  }

  onEdit(event): void {
    this.uid = event.data.Id;
    this.activetab();
  }

  onCreate(event): void {
    this.uid = 0;
    this.activetab();
  }

  onDelete(event): void {
    this.vistaScript = true;
    this.datosFila = {};
    console.info(event.data);
    this.datosFila = event.data;
  }

  activetab(): void {
    this.cambiotab = !this.cambiotab;
  }

  selectTab(event): void {
    if (event.tabTitle === this.translate.instant('GLOBAL.lista')) {
      this.cambiotab = false;
    } else {
      this.cambiotab = true;
    }
  }

  onChange(event) {
    if (event) {
      this.loadData();
      this.cambiotab = !this.cambiotab;
    }
  }


  itemselec(event): void {
    // console.log("afssaf");
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center'
      positionClass: 'toast-top-center',
      timeout: 5000,  // ms
      newestOnTop: true,
      tapToDismiss: false, // hide on click
      preventDuplicates: true,
      animation: 'slideDown', // 'fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'
      limit: 5,
    });
    const toast: Toast = {
      type: type, // 'default', 'info', 'success', 'warning', 'error'
      title: title,
      body: body,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  /*Guardo los datos de la consulta obtenida creada por el filtro*/
  guardarDatosConsulta(data: any) {
    this.data = data;
  }

  ocultarVistaScript(mostar: boolean) {
    this.vistaScript = mostar;
  }

}
