import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { AuthGuard } from '../../@core/_guards/auth.guard';


@Component({
  selector: 'ngx-tabla-busqueda',
  templateUrl: './tabla-busqueda.component.html',
  styleUrls: ['./tabla-busqueda.component.scss'],
})
export class TablaBusquedaComponent implements OnInit {
  @Input() dataContratos: any = [];
  @Output() dataToDo: any = {};
  @Output() dataView: any = {};
  logueado: boolean = false;


  constructor(
    private implicitAutenticationService: ImplicitAutenticationService,
    private authGuard: AuthGuard,
  ) {
    this.dataToDo = new EventEmitter();
    this.dataView = new EventEmitter();

  }

  ngOnInit() {
    if (this.implicitAutenticationService.live()) {
      this.logueado = true;
    }
    if (this.authGuard.canActivate()) {
      console.info('pasa los guard');
    }
  }

  realizarEvaluacion(data: any) {
    this.dataToDo.emit(data);
  }

  verEvaluacion(data: any) {
    this.dataView.emit(data);
  }

}
