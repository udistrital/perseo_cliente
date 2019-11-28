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

    if ((isNaN(this.numero_contrato) === true) || (this.numero_contrato === 0) || (this.numero_contrato === null)) {
      this.openWindow('Revise el número de contrato. Número de contrato no correcto');
    } else {
      if ((isNaN(this.identificacion_proveedor) === true) || (this.identificacion_proveedor === 0) || (this.identificacion_proveedor === null)) {
        this.openWindow('Revise el número de identificación de proveedor. Número de identificación de proveedor no correcto');
      } else {
        if ((this.vigencia === null) || (this.vigencia === undefined)) {
          this.openWindow('Seleccione una vigencia');
        } else {
          this.RealizarPeticion();
        }
      }
    }
  }

  RealizarPeticion() {

  }

  openWindow(mensaje) {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Alerta', context: { text: mensaje } },
    );
  }

}
