import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-consulta-evaluacion',
  templateUrl: './consulta-evaluacion.component.html',
  styleUrls: ['./consulta-evaluacion.component.scss'],
})
export class ConsultaEvaluacionComponent implements OnInit {

  identificacionProveedor: any;
  tipodocumento: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    ) {
      this.activatedRoute.params.subscribe( params => {
        this.identificacionProveedor = params['IdentificacionProveedor'];
        this.tipodocumento = params['TipoDocumento'];

      } );
     }

  ngOnInit() {
  }

}
