import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { EvaluacioncrudService } from '../../@core/data/evaluacioncrud.service';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-ver-evaluacion',
  templateUrl: './ver-evaluacion.component.html',
  styleUrls: ['./ver-evaluacion.component.scss'],
})
export class VerEvaluacionComponent implements OnInit {
  @ViewChild('contentTemplate', { read: false }) contentTemplate: TemplateRef<any>;
  @Input() dataContrato: any = [];
  @Output() volverFiltro: EventEmitter<Boolean>;
  realizar: boolean;
  evaluacionRealizada: any;

  constructor(
    private evaluacionCrudService: EvaluacioncrudService,
    private windowService: NbWindowService,
  ) {
    this.volverFiltro = new EventEmitter();
    this.evaluacionRealizada = {};
  }

  ngOnInit() {
    this.realizar = false;
    // Se verifica si se ha realizado una evaluación
    this.evaluacionCrudService.get('evaluacion?query=ContratoSuscrito:' + this.dataContrato[0].ContratoSuscrito +
      ',Vigencia:' + this.dataContrato[0].Vigencia).subscribe((res_evaluacion) => {
        if (Object.keys(res_evaluacion[0]).length !== 0) {
          this.evaluacionCrudService.get('resultado_evaluacion?query=IdEvaluacion:' + res_evaluacion[0].Id + ',Activo:true')
            .subscribe((res_resultado_eva) => {
              if (res_resultado_eva !== null) {
                this.evaluacionRealizada = JSON.parse(res_resultado_eva[0].ResultadoEvaluacion);
              }
            }, (error_service) => {
              this.openWindow(error_service.message);
            });
        } else {
          this.regresarFiltro();
          this.openWindow('El contrato no ha sido evaluado.');
        }
      }, (error_service) => {
        this.openWindow(error_service.message);
      });
  }

  regresarFiltro() {
    this.volverFiltro.emit(true);
  }

  openWindow(mensaje) {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Alerta', context: { text: mensaje } },
    );
  }

}
