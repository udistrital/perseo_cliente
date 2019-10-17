import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { Subgrupo, SubgrupoTransaccion } from '../../../@core/data/models/catalogo/subgrupo';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CatalogoElementosHelper } from '../../../helpers/catalogo-elementos/catalogoElementosHelper';
import { Grupo, GrupoTransaccion } from '../../../@core/data/models/catalogo/grupo';
import Swal from 'sweetalert2';
import { FORM_GRUPO } from './form-grupo';
import { Catalogo } from '../../../@core/data/models/catalogo';
import { PopUpManager } from '../../../managers/popUpManager';

@Component({
  selector: 'ngx-registro-catalogo',
  templateUrl: './registro-catalogo.component.html',
  styleUrls: ['./registro-catalogo.component.scss'],
})
export class RegistroCatalogoComponent implements OnInit {
  config: ToasterConfig;
  grupo_id: number;

  @Output() eventChange = new EventEmitter();

  info_grupo: Grupo;
  formGrupo: any;
  regGrupo1: any;
  clean: boolean;
  catalogos: Array<Catalogo>;
  catalogoId: number;
  subgrupoPadre: Subgrupo;
  subgrupoHijo: Subgrupo;
  uid_1: number;
  ModificarGrupo: boolean;
  uid_2: number;
  uid_3: number;
  uid_4: number;


  constructor(
    private translate: TranslateService,
    private catalogoElementosService: CatalogoElementosHelper,
    private toasterService: ToasterService,
    private pUpManager: PopUpManager,
  ) {
    this.formGrupo = FORM_GRUPO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.catalogos = new Array<Catalogo>();
    this.catalogoId = 0;
    this.loadCatalogos();
  }

  ngOnInit() {
  }

  construirForm() {
    this.formGrupo.titulo = this.translate.instant('GLOBAL.registrar_subgrupos');
    this.formGrupo.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formGrupo.campos.length; i++) {
      this.formGrupo.campos[i].label = this.translate.instant('GLOBAL.' + this.formGrupo.campos[i].label_i18n);
      this.formGrupo.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formGrupo.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadCatalogos() {
    this.catalogoElementosService.getCatalogo().subscribe((res) => {
      if (res !== null) {
        // console.log(res);
        const data = <Array<Catalogo>>res;
        for (const datos in Object.keys(data)) {
          if (data.hasOwnProperty(datos)) {
            this.catalogos.push(data[datos]);
          }
        }
      }
    });
  }

  recargarCatalogo(event){
    console.log(event);
    this.eventChange.emit(true);
  }

  onChange(catalogo) {
    this.catalogoId = catalogo;
  }

  AgregarGrupo(id: number) {
    this.uid_1 = undefined;
    this.uid_2 = undefined;
    this.uid_3 = id;
    this.uid_4 = undefined;
  }

  AgregarSubgrupo(id: number) {
    this.uid_1 = undefined;
    this.uid_2 = undefined;
    this.uid_3 = undefined;
    this.uid_4 = id;
  }
  QuitarVista() {
    this.uid_1 = undefined;
    this.uid_2 = undefined;
    this.uid_3 = undefined;
    this.uid_4 = undefined;
  }
  receiveMessage(event) {
    this.subgrupoPadre = event;
    this.info_grupo = <Grupo>event;
    this.catalogoElementosService.getGrupoById(event.Id).subscribe(
      res => {
        if (Object.keys(res[0]).length !== 0) {
          this.uid_1 = event.Id;
          this.uid_2 = undefined;
          this.uid_3 = undefined;
          this.uid_4 = undefined;
        } else {
          this.uid_1 = undefined;
          this.uid_2 = event.Id;
          this.uid_3 = undefined;
          this.uid_4 = undefined;
        }
      });
    // console.log(event);
  }

  cleanForm() {
    this.clean = !this.clean;
    this.info_grupo = undefined;
    this.subgrupoPadre = undefined;
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
