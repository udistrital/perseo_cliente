import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-tabla-busqueda',
  templateUrl: './tabla-busqueda.component.html',
  styleUrls: ['./tabla-busqueda.component.scss'],
})
export class TablaBusquedaComponent implements OnInit {
  @Input() dataContratos: any = [];
  @Output() dataEdit: any = {};
  @Output() dataView: any = {};


  constructor() {
    this.dataEdit = new EventEmitter();
    this.dataView = new EventEmitter();
  }

  ngOnInit() {
  }

  editDataContrato(data: any) {
    this.dataEdit.emit(data);
  }

  viewDataContrato(data: any) {
    this.dataView.emit(data);
  }

}
