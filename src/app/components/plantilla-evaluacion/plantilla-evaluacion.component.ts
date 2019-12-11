import { Component, OnInit } from '@angular/core';
import { LeerJsonLocalService } from '../../services/leer-json-local.service';

@Component({
  selector: 'ngx-plantilla-evaluacion',
  templateUrl: './plantilla-evaluacion.component.html',
  styleUrls: ['./plantilla-evaluacion.component.scss'],
})
export class PlantillaEvaluacionComponent implements OnInit {
  pipeprueba = 'algo';
  json: any = {};
  constructor(
    private leerJsonService: LeerJsonLocalService,
  ) { }

  ngOnInit() {
    this.leerJsonService.get('plantilla').subscribe( dato => {
      this.json = dato;
      console.info(this.json);
    }, (error_service) => {
      console.info(error_service);
    });
  }
  realizarEvaluacion() {
    console.info('Se Realizó la evaluación');
    console.info(this.json);
  }
}
