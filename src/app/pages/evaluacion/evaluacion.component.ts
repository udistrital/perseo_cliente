import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
})
export class EvaluacionComponent implements OnInit {

  data: any;
  dataContratoAEvaluar: any;

  constructor() {
    this.data = [];
    this.dataContratoAEvaluar = [];
   }

  ngOnInit() {
  }

  sendData(data: any) {
    this.data = data;
  }

  editEvaluation(data: any) {
    this.dataContratoAEvaluar = data;
    console.info( this.dataContratoAEvaluar);
  }
}
