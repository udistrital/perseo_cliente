import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-tabla-busqueda',
  templateUrl: './tabla-busqueda.component.html',
  styleUrls: ['./tabla-busqueda.component.scss'],
})
export class TablaBusquedaComponent implements OnInit {
  @Input() dataRequest: any = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.info(this.dataRequest);
  }

}
