import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';


@Component({
  selector: 'ngx-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss'],
})
export class FiltroComponent implements OnInit {

  @ViewChild('contentTemplate', { read: false }) contentTemplate: TemplateRef<any>;

  vigencias = ['2016', '2017', '2018', '2019', '2020'];

  identificacion_proveedor: any;
  numero_contrato: any;
  vigencia: any;

  constructor(private windowService: NbWindowService) { }

  ngOnInit() {
  }

  filtro() {
    console.info( Number(this.numero_contrato) );
    this.openWindow('filtro ejecutado');
  }

  openWindow(mensaje) {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Window content from template', context: { text: mensaje } },
    );
  }

}
