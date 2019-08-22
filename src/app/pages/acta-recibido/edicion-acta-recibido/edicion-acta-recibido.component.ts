import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { MatTable } from '@angular/material';
import 'hammerjs';
import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';
import { ActaRecibido } from '../../../@core/data/models/acta_recibido/acta_recibido';
import { Elemento } from '../../../@core/data/models/acta_recibido/elemento';
import { TipoBien } from '../../../@core/data/models/acta_recibido/tipo_bien';
import { SoporteActa } from '../../../@core/data/models/acta_recibido/soporte_acta';
import { EstadoActa } from '../../../@core/data/models/acta_recibido/estado_acta';
import { EstadoElemento } from '../../../@core/data/models/acta_recibido/estado_elemento';
import { HistoricoActa } from '../../../@core/data/models/acta_recibido/historico_acta';





@Component({
  selector: 'ngx-edicion-acta-recibido',
  templateUrl: './edicion-acta-recibido.component.html',
  styleUrls: ['./edicion-acta-recibido.component.scss']
})
export class EdicionActaRecibidoComponent implements OnInit {

  // Mensajes de error
  errMess: any;
  private sub: Subscription;

  // Decorador para renderizar los cambios en las tablas de elementos
  @ViewChildren(MatTable) _matTable: QueryList<MatTable<any>>;

  // Variables de Formulario
  firstForm: FormGroup;
  @ViewChild('fform') firstFormDirective;
  Datos: any;
  carga_agregada: boolean;
  index;
  selected = new FormControl(0);

  // Tablas parametricas

  Estados_Acta: Array<EstadoActa>;
  Tipos_Bien: Array<TipoBien>;
  Estados_Elemento: Array<EstadoElemento>;

  // Modelos

  Acta: ActaRecibido;
  Elementos_Soporte: Array<Elemento>;
  Soportes_Acta: Array<SoporteActa>;
  Historico_Acta: HistoricoActa;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private Actas_Recibido: ActaRecibidoHelper,
  ) {
  }
  ngOnInit() {
    this.Traer_Tipo_Bien();
    this.Traer_Estados_Acta();
    this.Traer_Estados_Elemento();
    this.Cargar_Formularios();
  }
  Traer_Estados_Acta() {
    this.Estados_Acta = new Array<EstadoActa>();
    this.Actas_Recibido.getEstadosActa().subscribe(res => {
      if (res !== null) {
        for (const index in res) {
          if (res.hasOwnProperty(index)) {
            const estados_acta = new EstadoActa;
            estados_acta.Id = res[index].Id;
            estados_acta.Nombre = res[index].Nombre;
            estados_acta.CodigoAbreviacion = res[index].CodigoAbreviacion;
            estados_acta.Descripcion = res[index].Descripcion;
            estados_acta.FechaCreacion = res[index].FechaCreacion;
            estados_acta.FechaModificacion = res[index].FechaModificacion;
            estados_acta.NumeroOrden = res[index].NumeroOrden;
            this.Estados_Acta.push(estados_acta);
          }
        }
      }
    });
  }
  Traer_Tipo_Bien() {
    this.Tipos_Bien = new Array<TipoBien>();
    this.Actas_Recibido.getTipoBien().subscribe(res => {
      if (res !== null) {
        for (const index in res) {
          if (res.hasOwnProperty(index)) {
            const tipo_bien = new TipoBien;
            tipo_bien.Id = res[index].Id;
            tipo_bien.Nombre = res[index].Nombre;
            tipo_bien.CodigoAbreviacion = res[index].CodigoAbreviacion;
            tipo_bien.Descripcion = res[index].Descripcion;
            tipo_bien.FechaCreacion = res[index].FechaCreacion;
            tipo_bien.FechaModificacion = res[index].FechaModificacion;
            tipo_bien.NumeroOrden = res[index].NumeroOrden;
            this.Tipos_Bien.push(tipo_bien);
          }
        }
      }
    });
  }
  Traer_Estados_Elemento() {

    this.Estados_Elemento = new Array<EstadoElemento>();
    this.Actas_Recibido.getEstadosElemento().subscribe(res => {
      if (res !== null) {
        for (const index in res) {
          if (res.hasOwnProperty(index)) {
            const estados_elemento = new EstadoElemento;
            estados_elemento.Id = res[index].Id;
            estados_elemento.Nombre = res[index].Nombre;
            estados_elemento.CodigoAbreviacion = res[index].CodigoAbreviacion;
            estados_elemento.Descripcion = res[index].Descripcion;
            estados_elemento.FechaCreacion = res[index].FechaCreacion;
            estados_elemento.FechaModificacion = res[index].FechaModificacion;
            estados_elemento.NumeroOrden = res[index].NumeroOrden;
            this.Estados_Elemento.push(estados_elemento);
          }
        }
      }
    });
  }
  Cargar_Formularios() {

    this.firstForm = this.fb.group({
      Formulario1: this.Formulario_1,
      Formulario2: this.fb.array([this.Formulario_2]),
      Formulario3: this.Formulario_3,
    });
    this.carga_agregada = true;
  }

  
  get Formulario_1(): FormGroup {
    return this.fb.group({
      Sede: ['', Validators.required],
      Dependencia: ['', Validators.required],
      Ubicacion: ['', Validators.required],
    });
  }
  get Formulario_2(): FormGroup {
    return this.fb.group({
      Proveedor: ['', Validators.required],
      Consecutivo: ['', Validators.required],
      Fecha_Factura: ['', Validators.required],
      Soporte: ['', Validators.required],
      Elementos: this.fb.array([this.Elementos]),
    });
  }
  get Elementos(): FormGroup {
    return this.fb.group({
      TipoBienId: ['', Validators.required],
      SubgrupoCatalogoId: ['', Validators.required],
      Nombre: ['', Validators.required],
      Cantidad: ['0', Validators.required],
      Marca: ['', Validators.required],
      Serie: ['', Validators.required],
      UnidadMedida: ['', Validators.required],
      ValorUnitario: ['0', Validators.required],
      Subtotal: ['0', Validators.required],
      Descuento: ['0', Validators.required],
      PorcentajeIvaId: ['', Validators.required],
      ValorIva: ['0', Validators.required],
      ValorTotal: ['0', Validators.required],
    });
  }
  get Formulario_3(): FormGroup {
    return this.fb.group({
      Datos_Adicionales: ['', Validators.required],
    });
  }
  addSoportes() {
    (this.firstForm.get('Formulario2') as FormArray).push(this.Formulario_2);
  }
  deleteSoportes(index: number) {
    (this.firstForm.get('Formulario2') as FormArray).removeAt(index);
  }
  addElementos(Soporte) {
    Soporte.get('Elementos').push(this.Elementos);
    this._matTable.forEach((mat) => mat.renderRows());
  }
  deleteElementos(Soporte, index: number) {
    Soporte.get('Elementos').removeAt(index);
    this._matTable.forEach((mat) => mat.renderRows());
  }
  onFirstSubmit() {
    this.Datos = this.firstForm.value;
    // this.Registrar_Acta(this.Datos.Formulario1,this.Formulario_3);
    // this.Registrar_Soporte(this.Datos.Formulario2);
    // this.Registrar_Elementos(this.Datos.Formulario2);
  }
  addTab() {
    this.addSoportes();
    this.selected.setValue(this.firstForm.get('Formulario2').value.length - 1);
  }
  removeTab(i: number) {
    this.deleteSoportes(i);
    this.selected.setValue(i - 1);
  }

  // Registrar_Acta(Datos: any, Datos2: any) {
  //   this.Acta.Activo = true;
  //   this.Acta.FechaCreacion = new Date();
  //   this.Acta.FechaModificacion = new Date();
  //   this.Acta.RevisorId = 123;
  //   this.Acta.UbicacionId = Datos.Ubicacion;
  //   this.Acta.Observaciones = Datos2.Datos_Adicionales;
  // }

  // Registrar_Soporte(Datos) {
  //   for(var i = 0; i++; i <= (Datos.length() - 1)) {
  //     this.Soportes_Acta[i].ActaRecibido = this.Acta;
  //     this.Soportes_Acta[i].Activo = true;
  //     this.Soportes_Acta[i].Consecutivo = Datos.Consecutivo;
  //     this.Soportes_Acta[i].FechaCreacion = new Date();
  //     this.Soportes_Acta[i].FechaModificacion = new Date();
  //     this.Soportes_Acta[i].FechaSoporte = Datos.Fecha_Factura;
  //     this.Soportes_Acta[i].Proveedor = Datos.Proveedor;
  //   }
  // }
  // Registrar_Elementos(Datos) {
  //   for(var i = 0; i++; i <= (Datos.length() - 1)) {
  //     this.Soportes_Acta[i].ActaRecibido = this.Acta;
  //     this.Soportes_Acta[i].Activo = true;
  //     this.Soportes_Acta[i].Consecutivo = Datos.Consecutivo;
  //     this.Soportes_Acta[i].FechaCreacion = new Date();
  //     this.Soportes_Acta[i].FechaModificacion = new Date();
  //     this.Soportes_Acta[i].FechaSoporte = Datos.Fecha_Factura;
  //     this.Soportes_Acta[i].Proveedor = Datos.Proveedor;
  //   }

  // }
  // Acciones para elementos

  displayedColumns = [
    'TipoBienId',
    'SubgrupoCatalogoId',
    'Nombre',
    'Cantidad',
    'Marca',
    'Serie',
    'UnidadMedida',
    'ValorUnitario',
    'Subtotal',
    'Descuento',
    'PorcentajeIvaId',
    'ValorIva',
    'ValorTotal',
    'Acciones',
  ];
  Pipe2Number(any: String) {
    if (any !== null) {
      return any.replace(/[$,]/g, '');
    } else {
      return '0';
    }
  }
  valortotal(subtotal: string, descuento: string, iva: string) {
    return (parseFloat(subtotal) - parseFloat(descuento) + parseFloat(iva));
  }
  valorXcantidad(valor_unitario: string, cantidad: string) {
    return (parseFloat(valor_unitario) * parseFloat(cantidad));
  }
  valor_iva(subtotal: string, descuento: string, porcentaje_iva: string) {
    return ((parseFloat(subtotal) - parseFloat(descuento)) * parseFloat(porcentaje_iva) / 100);
  }
}
