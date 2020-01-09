import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { EvaluacioncrudService } from '../../@core/data/evaluacioncrud.service';
import { AdministrativaamazonService } from '../../@core/data/admistrativaamazon.service';
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
  contratoCompleto: any;
  supervisor: any;
  proveedor: any;
  dependencia: String;
  fechaEvaluacion: Date;

  constructor(
    private evaluacionCrudService: EvaluacioncrudService,
    private windowService: NbWindowService,
    private administrativaAmazonService: AdministrativaamazonService,
  ) {
    this.volverFiltro = new EventEmitter();
    this.evaluacionRealizada = {};
    this.contratoCompleto = {};
    this.supervisor = {};
    this.realizar = true;
    this.proveedor = {};
    this.dependencia = '';
    this.fechaEvaluacion = new Date();

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
                this.fechaEvaluacion = new Date(this.evaluacionRealizada.FechaCreacion.substr(0, 16));
                // Se consulta los datos del contrato general.
                this.administrativaAmazonService.get('contrato_general?query=ContratoSuscrito.NumeroContratoSuscrito:'
                  + this.dataContrato[0].ContratoSuscrito + ',VigenciaContrato:' + this.dataContrato[0].Vigencia)
                  .subscribe((res_admi_amazon) => {
                    if (res_admi_amazon !== null) {
                      this.contratoCompleto = res_admi_amazon[0];
                      this.supervisor = res_admi_amazon[0].Supervisor;
                      // Se consulta el nombre del Proveedor
                      this.administrativaAmazonService.get('informacion_proveedor?query=Id:' + res_admi_amazon[0].Contratista)
                        .subscribe((res_contratista) => {
                          this.proveedor = res_contratista[0];
                        }, (error_service) => {
                          this.openWindow(error_service.message);
                        });
                      // Se consulta el nombre de la dependencia.
                      this.administrativaAmazonService.get('dependencia_SIC?query=ESFCODIGODEP:' + res_admi_amazon[0].DependenciaSolicitante)
                        .subscribe((res_dependencia) => {
                          this.dependencia = res_dependencia[0].ESFDEPENCARGADA;
                        }, (error_service) => {
                          this.openWindow(error_service.message);
                        });
                    }
                  }, (error_service) => {
                    this.openWindow(error_service.message);
                  });

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

  imprimirEvalucion() {
    console.info('Pa imprimir');
  }

  openWindow(mensaje) {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Alerta', context: { text: mensaje } },
    );
  }

}
