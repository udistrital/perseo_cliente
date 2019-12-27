import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-realizar-evaluacion',
  templateUrl: './realizar-evaluacion.component.html',
  styleUrls: ['./realizar-evaluacion.component.scss'],
})
export class RealizarEvaluacionComponent implements OnInit {
  @Input() dataContrato: any = [];
  @Output() volverFiltro: EventEmitter<Boolean>;
  realizar: boolean;
  jsonEvaluacion: any;

  constructor() {
    this.volverFiltro = new EventEmitter();
  }

  ngOnInit() {
    this.realizar = true;
    console.info(this.dataContrato)
  }

  regresarFiltro() {
    this.volverFiltro.emit(true);
  }
  realizarEvaluacion(data: any){
    console.log(data)
  }
}
