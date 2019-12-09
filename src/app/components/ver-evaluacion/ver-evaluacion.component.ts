import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-ver-evaluacion',
  templateUrl: './ver-evaluacion.component.html',
  styleUrls: ['./ver-evaluacion.component.scss'],
})
export class VerEvaluacionComponent implements OnInit {
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
