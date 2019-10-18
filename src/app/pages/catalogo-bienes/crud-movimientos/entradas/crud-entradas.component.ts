import { Catalogo } from '../../../../@core/data/models/catalogo/catalogo';
import { Grupo, GrupoTransaccion } from '../../../../@core/data/models/catalogo/grupo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoBien } from '../../../../@core/data/models/acta_recibido/tipo_bien';
import { FORM_ENTRADA } from './form-entrada';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { CatalogoElementosHelper } from '../../../../helpers/catalogo-elementos/catalogoElementosHelper';
import { CuentaGrupo } from '../../../../@core/data/models/catalogo/cuentas_grupo';


@Component({
  selector: 'ngx-crud-entradas',
  templateUrl: './cru-entradas.component.html',
  styleUrls: ['./crud-entradas.component.scss'],
})

export class CrudEntradasComponent implements OnInit {
  config: ToasterConfig;
  subgrupo_id: number;
  movimiento_id: string;

  @Input('subgrupo_id')
  set name(subgrupo_id: number) {
    this.subgrupo_id = subgrupo_id;
    this.loadCuentaGrupo();
  }

  @Input('movimiento_id')
  set name2(movimiento_id: string) {
    this.movimiento_id = movimiento_id;
  }

  @Output() eventChange = new EventEmitter();

  info_movimiento: CuentaGrupo;
  formMovimiento: any;
  regMovimiento: any;
  clean: boolean;

  constructor(
    private translate: TranslateService,
    private catalogoElementosService: CatalogoElementosHelper,
    private toasterService: ToasterService,
  ) {
    this.formMovimiento = FORM_ENTRADA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsCatalogo();
  }

  construirForm() {

    this.formMovimiento.titulo = this.translate.instant('GLOBAL.' + this.movimiento_id);
    this.formMovimiento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formMovimiento.campos.length; i++) {
      this.formMovimiento.campos[i].label = this.translate.instant('GLOBAL.' + this.formMovimiento.campos[i].label_i18n);
      this.formMovimiento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formMovimiento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsCatalogo(): void {
    let Tipo_Bien: Array<any> = [];
    this.catalogoElementosService.getTipoBien()
      .subscribe(res => {
        if (res !== null) {
          Tipo_Bien = <Array<TipoBien>>res;
        }
        this.formMovimiento.campos[this.getIndexForm('TipoBienId')].opciones = Tipo_Bien;
      });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formMovimiento.campos.length; index++) {
      const element = this.formMovimiento.campos[index];
      if (element.nombre === nombre) {
        return index;
      }
    }
    return 0;
  }


  public loadCuentaGrupo(): void {
    if (this.subgrupo_id !== undefined && this.subgrupo_id !== 0) {
      this.catalogoElementosService.getMovimiento(this.subgrupo_id, this.movimiento_id)
        .subscribe(res => {
          if (Object.keys(res[0]).length !== 0) {
            this.info_movimiento = <CuentaGrupo>res[0];
          } else {
            this.info_movimiento = undefined;
            this.clean = !this.clean;
          }
        });
    } else {
      this.info_movimiento = undefined;
      this.clean = !this.clean;
    }
  }

  updateGrupo(grupo: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update Grupo!',
      type: 'warning',
      showCancelButton: true,
    };
    (Swal as any).fire(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          this.info_movimiento = <CuentaGrupo>grupo;
          this.catalogoElementosService.putMovimiento(this.info_movimiento, this.info_movimiento.Id)
            .subscribe(res => {
              this.loadCuentaGrupo();
              this.eventChange.emit(true);
              this.showToast('info', 'updated', 'Grupo updated');
            });
        }
      });
  }

  createGrupo(grupo: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create Grupo!',
      type: 'warning',
      showCancelButton: true,
    };
    (Swal as any).fire(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          const grupoPost = new GrupoTransaccion;
          const catalogo = new Catalogo;
          catalogo.Id = this.subgrupo_id;
          grupoPost.Catalogo = catalogo;
          grupoPost.Subgrupo = grupo;
          this.catalogoElementosService.postGrupo(grupoPost)
            .subscribe(res => {
              this.info_movimiento = <CuentaGrupo><unknown>res;
              this.eventChange.emit(true);
              this.showToast('info', 'created', 'Grupo created');
            });
        }
      });
  }

  ngOnInit() {
    this.loadCuentaGrupo();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_movimiento === undefined) {
        this.createGrupo(event.data.Grupo);
      } else {
        this.updateGrupo(event.data.Grupo);
      }
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
