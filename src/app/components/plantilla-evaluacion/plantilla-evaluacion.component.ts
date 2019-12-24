import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { EvaluacionmidService } from '../../@core/data/evaluacionmid.service';
import { NbWindowService } from '@nebular/theme';


@Component({
  selector: 'ngx-plantilla-evaluacion',
  templateUrl: './plantilla-evaluacion.component.html',
  styleUrls: ['./plantilla-evaluacion.component.scss'],
})
export class PlantillaEvaluacionComponent implements OnInit {

  @Input() realizar: any;
  @ViewChild('contentTemplate', { read: false }) contentTemplate: TemplateRef<any>;

  pipeprueba = 'algo';
  json: any = {};
  valorTotal: any;
  constructor(
    private evaluacionMidService: EvaluacionmidService,
    private windowService: NbWindowService,
  ) {
    this.valorTotal = 0;
  }

  ngOnInit() {
    console.info(this.realizar);
    this.evaluacionMidService.get('plantilla').subscribe((res) => {
      this.json = res;
    }, (error_service) => {
      this.openWindow(error_service['body'][1]['Error']);
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

  openWindow(mensaje) {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Alerta', context: { text: mensaje } },
    );
  }
}
