import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter, OnChanges, NgModule } from '@angular/core';
import { EvaluacionmidService } from '../../@core/data/evaluacionmid.service';
import { EvaluacioncrudService } from '../../@core/data/evaluacioncrud.service';
import { NbWindowService } from '@nebular/theme';
import { LeerJsonLocalService } from '../../services/leer-json-local.service';
import { IAppState } from '../../@core/store/app.state';
import { Store } from '@ngrx/store';
import { ListService } from '../../@core/store/services/list.service';



@Component({
  selector: 'ngx-plantilla-evaluacion',
  templateUrl: './plantilla-evaluacion.component.html',
  styleUrls: ['./plantilla-evaluacion.component.scss'],
})
export class PlantillaEvaluacionComponent implements OnInit {

  @Input() realizar: any;
  @Input() evaluacionRealizada: any;
  @ViewChild('contentTemplate', { read: false }) contentTemplate: TemplateRef<any>;
  @Output() jsonEvaluacion: EventEmitter<any>;

  pipeprueba = 'algo';
  json: any = {};
  evaluacionCompleta: boolean;
  constructor(
    private evaluacionMidService: EvaluacionmidService,
    private windowService: NbWindowService,
    private leerJsonService: LeerJsonLocalService,
    private evaluacioncrudService: EvaluacioncrudService,
    private store: Store<IAppState>,
    private listService: ListService,
  ) {
    this.jsonEvaluacion = new EventEmitter();
    this.listService.findPlantilla();
    this.evaluacionRealizada = {};
  }

  ngOnInit() {
    this.evaluacionCompleta = true;
  }

  CargarUltimaPlantilla() {
    this.store.select((state) => state).subscribe(list => {
      this.json = list.listPlantilla[0];
    });
  }

ngOnChanges() {
   if (Object.keys(this.evaluacionRealizada).length !== 0) {
      this.json = this.evaluacionRealizada;
    } else {
      this.CargarUltimaPlantilla();
    }
  }

  realizarEvaluacion() {
    this.evaluacionCompleta = true;
    if (this.json.ValorFinal < 0) {
      this.openWindow('Error en el valor total de la evaluación, es menor de cero.');
    } else if (this.json.ValorFinal > 100) {
      this.openWindow('Error en el valor total de la evaluación, es mayor a 100');
    } else {
      for (let i = 0; i < this.json.Secciones.length; i++) {
        for (let k = 0; k < this.json.Secciones[i].Seccion_hija_id.length; k++) {
          if (this.json.Secciones[i].Seccion_hija_id[k]['Item'][0].Tamano !== 12) {
            if (this.json.Secciones[i].Seccion_hija_id[k]['Condicion'].length > 0) {
              if (this.json.Secciones[i].Seccion_hija_id[k - 1]['Item'][2].Valor.Nombre ===
                this.json.Secciones[i].Seccion_hija_id[k]['Condicion'][0]['Nombre']) {
                if (this.json.Secciones[i].Seccion_hija_id[k]['Item'][2].Valor.Valor === undefined) {
                  this.evaluacionCompleta = false;
                }
              }
            } else if (this.json.Secciones[i].Seccion_hija_id[k]['Item'][2].Valor.Valor === undefined) {
              this.evaluacionCompleta = false;
            }
          }

        }
      }
      if (this.evaluacionCompleta === false) {
        this.openWindow('Aun no se ha completado la evaluación');
      } else if (this.evaluacionCompleta === true) {
        this.jsonEvaluacion.emit(this.json);
      }
    }
  }


  filterChanged(i: any) {
    this.json.ValorFinal = 0;
    this.json.Secciones[i].ValorSeccion = 0;
    for (let k = 0; k < this.json.Secciones[i].Seccion_hija_id.length; k++) {
      if (this.json.Secciones[i].Seccion_hija_id[k]['Item'][2].Valor.Valor !== undefined) {
        if (this.json.Secciones[i].Seccion_hija_id[k]['Condicion'].length > 0) {
          if (this.json.Secciones[i].Seccion_hija_id[k - 1]['Item'][2].Valor.Nombre ===
            this.json.Secciones[i].Seccion_hija_id[k]['Condicion'][0]['Nombre']) {
            this.json.Secciones[i].ValorSeccion += this.json.Secciones[i].Seccion_hija_id[k]['Item'][2].Valor.Valor;
          } else {
            this.json.Secciones[i].Seccion_hija_id[k]['Item'][2].Valor = '';
          }
        } else {
          this.json.Secciones[i].ValorSeccion += this.json.Secciones[i].Seccion_hija_id[k]['Item'][2].Valor.Valor;
        }
      }
    }
    for (let k = 0; k < this.json.Secciones.length; k++) {
      if (this.json.Secciones[k].ValorSeccion !== undefined) {
        this.json.ValorFinal += this.json.Secciones[k].ValorSeccion;
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
