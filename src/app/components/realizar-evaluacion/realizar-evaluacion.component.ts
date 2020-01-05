import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EvaluacioncrudService } from '../../@core/data/evaluacioncrud.service';


@Component({
  selector: 'ngx-realizar-evaluacion',
  templateUrl: './realizar-evaluacion.component.html',
  styleUrls: ['./realizar-evaluacion.component.scss'],
})
export class RealizarEvaluacionComponent implements OnInit {
  @Input() dataContrato: any = [];
  @Output() volverFiltro: EventEmitter<Boolean>;
  realizar: boolean;
  jsonEvaluacion: any;
  jsonResultadoEvaluacion: any;

  constructor(
    private evaluacionCrudService: EvaluacioncrudService,
  ) {
    this.volverFiltro = new EventEmitter();
    this.jsonEvaluacion = {};
    this.jsonResultadoEvaluacion = {};

  }


  ngOnInit() {
    this.realizar = true;
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

    this.evaluacionCrudService.post('evaluacion', this.jsonEvaluacion)
      .subscribe((res) => {
        if (res !== null) {
          this.jsonResultadoEvaluacion = {
            'Activo': true,
            'IdEvaluacion': res,
            'ResultadoEvaluacion': data,
          };
          console.info(this.jsonResultadoEvaluacion);
        }
      }, (error_service) => {
        console.info(error_service);
      });

    // console.info(this.dataContrato);










  }

}
