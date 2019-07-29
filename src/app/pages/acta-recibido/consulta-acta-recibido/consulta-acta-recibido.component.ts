import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'ngx-consulta-acta-recibido',
  templateUrl: './consulta-acta-recibido.component.html',
  styleUrls: ['./consulta-acta-recibido.component.scss'],
})
export class ConsultaActaRecibidoComponent implements OnInit {

  constructor(private translate: TranslateService) { 
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => { // Live reload
    });
  }
  ngOnInit() {
  }

}
