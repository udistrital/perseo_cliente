import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
// import { VotoService } from '../../../@core/data/voto.service';
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

  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService, private toasterService: ToasterService) {
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
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      mode: 'external',
      columns: {
        Id: {
          title: this.translate.instant('GLOBAL.id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Nombre: {
          title: this.translate.instant('GLOBAL.nombre'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Observacion: {
          title: this.translate.instant('GLOBAL.observacion'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Año: {
          title: this.translate.instant('GLOBAL.año'),
          // type: 'Date;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Fechaejecucion: {
          title: this.translate.instant('GLOBAL.fechaejecucion'),
          // type: 'Date;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Estado: {
          title: this.translate.instant('GLOBAL.estado'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        DocentesPlanta: {
          title: this.translate.instant('GLOBAL.docentes_planta'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        DocentesVe: {
          title: this.translate.instant('GLOBAL.docentes_ve'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Funcionarios: {
          title: this.translate.instant('GLOBAL.funcionarios'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Estudiantes: {
          title: this.translate.instant('GLOBAL.estudiantes'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Egresados: {
          title: this.translate.instant('GLOBAL.egresados'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Contratistas: {
          title: this.translate.instant('GLOBAL.contratistas'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Exrectores: {
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
    // this.votoService.get('votacion/?limit=0').subscribe(res => {
    //   if (res !== null) {
    //     const data = <Array<any>>res;
    //     this.source.load(data);
    //       }
    // });
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
    const opt: any = {
      title: 'Deleting?',
      text: 'Delete Votacion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        // this.votoService.delete('votacion/', event.data).subscribe(res => {
        //   if (res !== null) {
        //     this.loadData();
        //     this.showToast('info', 'deleted', 'Votacion deleted');
        //     }
        //  });
      }
    });
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

}
