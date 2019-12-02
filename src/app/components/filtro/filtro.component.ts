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
    console.info(isNaN(this.identificacion_proveedor));
    console.info(this.identificacion_proveedor);
    console.info(this.numero_contrato);
    console.info(this.vigencia);

    if (((isNaN(this.numero_contrato) === true) || (this.numero_contrato === 0) || (this.numero_contrato === null) || (this.numero_contrato === undefined)) 
    && ((isNaN(this.identificacion_proveedor) === true) || (this.identificacion_proveedor === 0) || (this.identificacion_proveedor === null) || (this.identificacion_proveedor === undefined))) {
     this.openWindow('Debe ingresar almenos una Identificación de proveedor o un número de contrato');
    } else {
      this.RealizarPeticion();
    }
  }

  RealizarPeticion() {
    if((this.identificacion_proveedor != undefined)&&(this.identificacion_proveedor != null) 
    && (this.numero_contrato === undefined || this.numero_contrato === null) && (this.vigencia === undefined)){
      console.info('petición por proveedor')
    } else {
      if((this.identificacion_proveedor != undefined)&&(this.identificacion_proveedor != null) 
      && (this.numero_contrato === undefined || this.numero_contrato === null) && (this.vigencia != undefined)){
        console.info('peticion por proveedor y vigencia')
      } else {
        if ((this.identificacion_proveedor === undefined || this.identificacion_proveedor === null) 
        && (this.numero_contrato != undefined && this.numero_contrato != null) && (this.vigencia === undefined)){
          console.info('petición por número de contrato')
        } else {
          if ((this.identificacion_proveedor === undefined || this.identificacion_proveedor === null) 
          && (this.numero_contrato != undefined && this.numero_contrato != null) && (this.vigencia != undefined)){
            console.info('peticion por número de contrato y vigencia')
          }
        }
      }
    }
  }

  openWindow(mensaje) {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Alerta', context: { text: mensaje } },
    );
  }

}
