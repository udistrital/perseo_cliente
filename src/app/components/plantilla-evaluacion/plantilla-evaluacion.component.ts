import { Component, OnInit, OnChanges } from '@angular/core';
import { LeerJsonLocalService } from '../../services/leer-json-local.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'ngx-plantilla-evaluacion',
  templateUrl: './plantilla-evaluacion.component.html',
  styleUrls: ['./plantilla-evaluacion.component.scss'],
})
export class PlantillaEvaluacionComponent implements OnInit {
  pipeprueba = 'algo';
  json: any = {};
  valorTotal: any;
  constructor(
    private leerJsonService: LeerJsonLocalService,
  ) {
    this.valorTotal = 0;
  }

  ngOnInit() {
    this.leerJsonService.get('plantilla').subscribe(dato => {
      this.json = dato;
    }, (error_service) => {
      console.info(error_service);
    });
  }

  realizarEvaluacion() {
    console.info(this.json);
  }

  filterChanged(i: any) {
    this.valorTotal = 0;
    this.json.Secciones[i].ValorSeccion = 0;
    for (let k = 0; k < this.json.Secciones[i].Seccion_hija_id.length; k++) {
      if (this.json.Secciones[i].Seccion_hija_id[k]['Item'][2].Valor.Valor !== undefined) {
        if (this.json.Secciones[i].Seccion_hija_id[k]['Condicion'].length > 0) {
          if (this.json.Secciones[i].Seccion_hija_id[k - 1]['Item'][2].Valor.Nombre ===
          this.json.Secciones[i].Seccion_hija_id[k]['Condicion'][0]['Nombre']) {
            this.json.Secciones[i].ValorSeccion += this.json.Secciones[i].Seccion_hija_id[k]['Item'][2].Valor.Valor;
          } else {
            //this.json.Secciones[i].Seccion_hija_id[k]['Item'][2].Valor = '';
          }
        } else {
          this.json.Secciones[i].ValorSeccion += this.json.Secciones[i].Seccion_hija_id[k]['Item'][2].Valor.Valor;
        }
      }
    }
    for (let k = 0; k < this.json.Secciones.length; k++) {
      if (this.json.Secciones[k].ValorSeccion !== undefined) {
        this.valorTotal += this.json.Secciones[k].ValorSeccion;
      }
    }
  }
}
