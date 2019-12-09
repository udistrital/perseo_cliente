import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
})
export class EvaluacionComponent implements OnInit {
  data: any;
  datosEvaluacion: any;
  datosContratoAEvaluar: any;

  constructor() {
    this.data = [];
    this.datosEvaluacion = [];
    this.datosContratoAEvaluar = [];
   }

  ngOnInit() {
  }

  sendData(data: any) {
    this.data = data;
  }

  viewEvaluation(data: any) {
    this.datosEvaluacion[0] = data;
  }

  editEvaluation(data: any) {
    this.datosContratoAEvaluar = data;
  }

  mostrarFiltro(data: any) {
    if (data === true ) {
      this.datosEvaluacion = [];
    }
  }
}
