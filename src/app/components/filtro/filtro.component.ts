import { Component, TemplateRef, ViewChild, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { FormControl } from '@angular/forms';
import { PersepMidService } from '../../@core/data/perseomid.service';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { ToasterModule } from 'angular2-toaster';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';






interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'ngx-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss'],
})
export class FiltroComponent implements OnInit {

  // Output para enviar los datos del filtro a otro componente
  @Output() dataResponse: EventEmitter<any>;
  @Output() regreso: EventEmitter<boolean>;
  @Input() datosVotacion: any = [];
  cantidadPersonas = [];
  config: ToasterConfig;


  @ViewChild('contentTemplate', { read: false }) contentTemplate: TemplateRef<any>;

  filtros: Select[] = [
    { value: '1', viewValue: 'Facultad' },
    { value: '2', viewValue: 'Tipo Carrera' },
  ];

  // Facultades sacadas de https://www.udistrital.edu.co/facultades
  Facultades: Select[] = [
    { value: '1', viewValue: 'Facultad de Artes - ASAB' },
    { value: '2', viewValue: 'Facultad de Ciencias y Educación' },
    { value: '3', viewValue: 'Facultad de Ingeniería' },
    { value: '4', viewValue: 'Facultad de Medio Ambiente y Recursos Naturales' },
    { value: '5', viewValue: 'Facultad Tecnológica' },
  ];

  TiposCarreras: Select[] = [
    { value: '1', viewValue: 'Pregrado' },
    { value: '2', viewValue: 'Doctorado' },
    { value: '3', viewValue: 'Maestría' },
    { value: '4', viewValue: 'Especialización' },
  ];

  date = new FormControl();
  // date = new FormControl(new Date());
  datosFiltro: any;
  participantesList = [];
  filtroSelecionado: any;
  facultadSelecionada: any;
  tipoCarreraSelecionada: any;

  constructor(
    private windowService: NbWindowService,
    private perseoMidService: PersepMidService,
    private toasterService: ToasterService,
  ) {
    this.dataResponse = new EventEmitter();
    this.regreso = new EventEmitter();
  }

  ngOnInit() {
    // console.info(this.datosVotacion);
    this.ObtenerCantidades();
  }

  ObtenerCantidades() {
    this.perseoMidService.get(`cantidades/${this.datosVotacion['TIV_CODIGO']}`).subscribe(res => {
      if (res !== null) {
        this.cantidadPersonas = res;
        this.llenarParticipantes();
        // console.info(this.cantidadPersonas);
      }
    });
  }

  llenarParticipantes() {
    if (this.datosVotacion['TVI_CONTRATISTAS'] === true) {
      this.participantesList.push({
        'nombre': 'Contratistas',
        'personas': 0,
      });
    }
    if (this.datosVotacion['TVI_DOCENTES_PLANTA'] === true) {
      this.participantesList.push({
        'nombre': 'Docentes de Planta',
        'personas': this.cantidadPersonas[0]['docentes_planta'],
      });
    }
    if (this.datosVotacion['TVI_DOCENTES_VE'] === true) {
      this.participantesList.push({
        'nombre': 'Docentes de Vinculacion Especial',
        'personas': this.cantidadPersonas[0]['docentes_ve'],
      });
    }
    if (this.datosVotacion['TVI_EGRESADOS'] === true) {
      this.participantesList.push({
        'nombre': 'Egresados',
        'personas': this.cantidadPersonas[0]['egresados'],
      });
    }
    if (this.datosVotacion['TVI_ESTUDIANTES'] === true) {
      this.participantesList.push({
        'nombre': 'Estudiantes',
        'personas': this.cantidadPersonas[0]['estudiantes'],
      });
    }
    if (this.datosVotacion['TVI_EXRECTORES'] === true) {
      this.participantesList.push({
        'nombre': 'Exrectores',
        'personas': 0,
      });
    }
    if (this.datosVotacion['TVI_FUNCIONARIOS'] === true) {
      this.participantesList.push({
        'nombre': 'Funcionarios',
        'personas': this.cantidadPersonas[0]['funcionarios'],
      });
    }
  }

  // Verifica si el filtro está lleno, de ser así crea el objeto que se envía como output
  llenado() {
    // if (this.filtroSelecionado === undefined) {
    //   this.openWindow('Se debe selecionar un tipo de filtro');
    // } if (this.filtroSelecionado === 'Facultad' && this.facultadSelecionada === undefined) {
    //   this.openWindow('Se debe selecionar una Facultad');
    // } if (this.filtroSelecionado === 'Tipo Carrera' && this.tipoCarreraSelecionada === undefined) {
    //   this.openWindow('Se debe selecionar un Tipo de Carrera');
    // } else {
    if (this.date.value === null || this.date.value === undefined) {
      this.openWindow('Por favor seleccione una fecha de corte', 'Alerta');

    } else {
      this.datosFiltro = {
        'TipoFiltro': this.filtroSelecionado,
        'Facultad': this.facultadSelecionada,
        'TipoCarrera': this.tipoCarreraSelecionada,
        // 'Participantes': this.participantesList,
        'FechaCorte': this.date.value,
        'datosVotacion': this.datosVotacion,
        'cantidadParticipantes': this.cantidadPersonas[0],
      };

      const opt: any = {
        title: 'Llenar litas',
        text: `Esta seguro que desea iniciar el proceso de crear listas
        para la votacion # ${this.datosVotacion['TIV_CODIGO']}?`,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
        showCancelButton: true,
      };
      Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          // console.info(votacion);
          this.perseoMidService.post(`script`, this.datosFiltro)
          .subscribe(res => {
            console.info(res);
            this.openWindow(`Tardara un tiempo en llenarse las listas de ${res['Body']['lista']} , por favor revise mas tarde`, 'Success');

          }, (error_service) => {
            // console.info(error_service['body'][1]);
            this.openWindow(error_service['body'][1]['Error'], 'Error');
          });
        }
      });

    }
      console.info(this.datosFiltro);
      this.dataResponse.emit(this.datosFiltro);
    // }
  }

  filtro() {
    // if (this.filtroSelecionado === undefined) {
    //   this.openWindow('Se debe selecionar un tipo de filtro');
    // } if (this.filtroSelecionado === 'Facultad' && this.facultadSelecionada === undefined) {
    //   this.openWindow('Se debe selecionar una Facultad');
    // } if (this.filtroSelecionado === 'Tipo Carrera' && this.tipoCarreraSelecionada === undefined) {
    //   this.openWindow('Se debe selecionar un Tipo de Carrera');
    // } else {
    // if (this.date.value === null || this.date.value === undefined) {
    //   this.openWindow('Por favor seleccione una fecha de corte');

    // } else {
      this.datosFiltro = {
        'TipoFiltro': this.filtroSelecionado,
        'Facultad': this.facultadSelecionada,
        'TipoCarrera': this.tipoCarreraSelecionada,
        'Participantes': this.participantesList,
        'FechaCorte': this.date.value,
        'datosVotacion': this.datosVotacion,
      };

      const opt: any = {
        title: 'Filtro y limpieza de listas',
        text: `Desea realizar filtro y limpieza de listas a la votacion# ${this.datosVotacion['TIV_CODIGO']}?.
        Recuerde que las listas ya deben de estar llenas para evitar errores`,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
        showCancelButton: true,
      };
      Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          // console.info(votacion);
              this.showToast('info', 'created', `Tardara un tiempo en llenarse las listas, por favor revise mas tarde`);
        }
      });

    // }
      console.info(this.datosFiltro);
      this.dataResponse.emit(this.datosFiltro);
    // }
  }

  regresar() {
    this.regreso.emit(false);
  }

  // función que está escuchando el select de "Tipo de filtro" para reiniciar los valor de this.facultadSelecionada y this.tipoCarreraSelecionada.
  filterChanged() {
    this.facultadSelecionada = undefined;
    this.tipoCarreraSelecionada = undefined;
  }

  openWindow(mensaje, titulo) {
    this.windowService.open(
      this.contentTemplate,
      { title: titulo, context: { text: mensaje } },
    );
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
