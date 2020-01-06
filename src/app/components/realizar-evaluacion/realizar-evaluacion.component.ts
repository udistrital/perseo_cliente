import { Component, OnInit, Input, Output, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { EvaluacioncrudService } from '../../@core/data/evaluacioncrud.service';
import { NbWindowService } from '@nebular/theme';



@Component({
  selector: 'ngx-realizar-evaluacion',
  templateUrl: './realizar-evaluacion.component.html',
  styleUrls: ['./realizar-evaluacion.component.scss'],
})
export class RealizarEvaluacionComponent implements OnInit {
  @Input() dataContrato: any = [];
  @Output() volverFiltro: EventEmitter<Boolean>;


  @ViewChild('contentTemplate', { read: false }) contentTemplate: TemplateRef<any>;

  realizar: boolean;
  evaluacionRealizada: any;
  jsonEvaluacion: any;
  jsonResultadoEvaluacion: any;

  constructor(
    private evaluacionCrudService: EvaluacioncrudService,
    private windowService: NbWindowService,
  ) {
    this.volverFiltro = new EventEmitter();
    this.jsonEvaluacion = {};
    this.jsonResultadoEvaluacion = {};
    this.evaluacionRealizada = {};
  }


  ngOnInit() {
    // Se verifica si se ha realizado una evaluación
    this.evaluacionCrudService.get('evaluacion?query=ContratoSuscrito:' + this.dataContrato[0].ContratoSuscrito +
      '&Vigencia:' + this.dataContrato[0].Vigencia).subscribe((res_evaluacion) => {
        if (Object.keys(res_evaluacion[0]).length !== 0) {
          this.openWindow('Ya hay una evaluación existente, usted procederá a modificarla.');
          this.evaluacionCrudService.get('resultado_evaluacion?query=IdEvaluacion:' + res_evaluacion[0].Id + '&Activo:true')
            .subscribe((res_resultado_eva) => {
              if (res_resultado_eva !== null) {
                this.evaluacionRealizada = JSON.parse(res_resultado_eva[0].ResultadoEvaluacion);
                this.realizar = true;
                console.info(JSON.parse(res_resultado_eva[0].ResultadoEvaluacion));
              }
            }, (error_service) => {
              this.openWindow(error_service.message);
            });
        }
      }, (error_service) => {
        this.openWindow(error_service.message);
      });



  }

  regresarFiltro() {
    this.volverFiltro.emit(true);
  }

  realizarEvaluacion(data: any) {
    this.jsonEvaluacion = {
      'Activo': true,
      'Aprobado': true,
      'ContratoSuscrito': Number(this.dataContrato[0].ContratoSuscrito),
      'CotizacionId': 0,
      'PlantillaId': data.Id,
      'ProveedorId': this.dataContrato[0].IdProveedor,
      'Vigencia': this.dataContrato[0].Vigencia,
    };
    // Se realiza el post de la evaluación.
    this.evaluacionCrudService.post('evaluacion', this.jsonEvaluacion)
      .subscribe((res_evaluacion) => {
        if (res_evaluacion !== null) {

          this.jsonResultadoEvaluacion = {
            'Activo': true,
            'IdEvaluacion': res_evaluacion,
            'ResultadoEvaluacion': JSON.stringify(data),
          };
          // Se realiza el post del resultado de la evaluación.
          this.evaluacionCrudService.post('resultado_evaluacion', this.jsonResultadoEvaluacion)
            .subscribe((res_resultado_eva) => {
              if (res_resultado_eva !== null) {
                this.openWindow('Se ha registrado satisfactoriamente la evaluación del contrato ' + this.dataContrato[0].ContratoSuscrito +
                  ' de ' + this.dataContrato[0].Vigencia);
                this.regresarFiltro();
              }
            }, (error_service) => {
              this.openWindow(error_service.message);
            });
        }
      }, (error_service) => {
        this.openWindow(error_service.message);
      });
  }

  openWindow(mensaje) {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Alerta', context: { text: mensaje } },
    );
  }

}
