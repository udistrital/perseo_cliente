
// import { Votacion } from './../../../@core/data/models/votacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { VotoService } from '../../../@core/data/voto.service';
import { FORM_VOTACION } from './form-votacion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-votacion',
  templateUrl: './crud-votacion.component.html',
  styleUrls: ['./crud-votacion.component.scss'],
})
export class CrudVotacionComponent implements OnInit {
  config: ToasterConfig;
  votacion_id: number;

  @Input('votacion_id')
  set name(votacion_id: number) {
    this.votacion_id = votacion_id;
    this.loadVotacion();
  }

  @Output() eventChange = new EventEmitter();

  // info_votacion: Votacion;
  formVotacion: any;
  regVotacion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private toasterService: ToasterService) {
    this.formVotacion = FORM_VOTACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  construirForm() {
    this.formVotacion.titulo = this.translate.instant('GLOBAL.votacion');
    this.formVotacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formVotacion.campos.length; i++) {
      this.formVotacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formVotacion.campos[i].label_i18n);
      this.formVotacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formVotacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formVotacion.campos.length; index++) {
      const element = this.formVotacion.campos[index];
      if (element.nombre === nombre) {
        return index;
      }
    }
    return 0;
  }


  public loadVotacion(): void {
    // if (this.votacion_id !== undefined && this.votacion_id !== 0) {
    //   this.votoService.get('votacion/?query=id:' + this.votacion_id)
    //     .subscribe(res => {
    //       if (res !== null) {
    //         this.info_votacion = <Votacion>res[0];
    //       }
    //     });
    // } else  {
    //   this.info_votacion = undefined;
    //   this.clean = !this.clean;
    // }
  }

  updateVotacion(votacion: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update Votacion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        // this.info_votacion = <Votacion>votacion;
        // this.votoService.put('votacion', this.info_votacion)
        //   .subscribe(res => {
        //     this.loadVotacion();
        //     this.eventChange.emit(true);
        //     this.showToast('info', 'updated', 'Votacion updated');
        //   });
      }
    });
  }

  createVotacion(votacion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create Votacion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        // this.info_votacion = <Votacion>votacion;
        // this.votoService.post('votacion', this.info_votacion)
        //   .subscribe(res => {
        //     this.info_votacion = <Votacion>res;
        //     this.eventChange.emit(true);
        //     this.showToast('info', 'created', 'Votacion created');
        //   });
      }
    });
  }

  ngOnInit() {
    this.loadVotacion();
  }

  validarForm(event) {
    if (event.valid) {
      // if (this.info_votacion === undefined) {
      //   this.createVotacion(event.data.Votacion);
      // } else {
      //   this.updateVotacion(event.data.Votacion);
      // }
    }
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
