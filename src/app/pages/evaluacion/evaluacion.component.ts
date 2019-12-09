import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
})
export class EvaluacionComponent implements OnInit {
  data: any;
  datosContratoAVer: any;
  datosContratoAEvaluar: any;

  constructor() {
    this.data = [];
    this.datosContratoAVer = [];
    this.datosContratoAEvaluar = [];
   }

  ngOnInit() {
  }

  sendData(data: any) {
    this.data = data;
  }

  verEvaluacion(data: any) {
    this.datosContratoAVer[0] = data;
  }

  relizarEvaluacion(data: any) {
    this.datosContratoAEvaluar = data;
  }

  mostrarFiltro(data: any) {
    if (data === true ) {
      this.datosContratoAVer = [];
    }
  }
}
