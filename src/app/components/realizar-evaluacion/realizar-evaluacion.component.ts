import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-realizar-evaluacion',
  templateUrl: './realizar-evaluacion.component.html',
  styleUrls: ['./realizar-evaluacion.component.scss'],
})
export class RealizarEvaluacionComponent implements OnInit {
  @Input() dataContrato: any = [];
  @Output() volverFiltro: EventEmitter<Boolean>;

  constructor() {
    this.volverFiltro = new EventEmitter();
  }

  ngOnInit() {
  }

  regresarFiltro() {
    this.volverFiltro.emit(true);
  }
}
