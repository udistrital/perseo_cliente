import { Component, TemplateRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { FormControl } from '@angular/forms';

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

  date = new FormControl(new Date());
  datosFiltro: any;
  participantesList: string[] = ['Estudiantes', 'Docentes de Planta', 'Docentes VE', 'Administrativo'];
  filtroSelecionado: any;
  facultadSelecionada: any;
  tipoCarreraSelecionada: any;

  constructor(
    private windowService: NbWindowService,
  ) {
    this.dataResponse = new EventEmitter();
  }

  ngOnInit() {
  }

  // Verifica si el filtro está lleno, de ser así crea el objeto que se envía como output
  filtro() {
    if (this.filtroSelecionado === undefined) {
      this.openWindow('Se debe selecionar un tipo de filtro');
    } if (this.filtroSelecionado === 'Facultad' && this.facultadSelecionada === undefined) {
      this.openWindow('Se debe selecionar una Facultad');
    } if (this.filtroSelecionado === 'Tipo Carrera' && this.tipoCarreraSelecionada === undefined) {
      this.openWindow('Se debe selecionar un Tipo de Carrera');
    } else {
      this.datosFiltro = {
        'TipoFiltro': this.filtroSelecionado,
        'Facultad': this.facultadSelecionada,
        'TipoCarrera': this.tipoCarreraSelecionada,
        'Participantes': this.participantesList,
        'FechaCorte': this.date.value,
      }
      console.info(this.datosFiltro);
      this.dataResponse.emit(this.datosFiltro);
    }
  }

  // función que está escuchando el select de "Tipo de filtro" para reiniciar los valor de this.facultadSelecionada y this.tipoCarreraSelecionada.
  filterChanged() {
    this.facultadSelecionada = undefined;
    this.tipoCarreraSelecionada = undefined;
  }

  openWindow(mensaje) {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Alerta', context: { text: mensaje } },
    );
  }
}
