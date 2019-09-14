import { Component, OnInit, ViewChild, ViewChildren, QueryList, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';

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
import { TransaccionSoporteActa, TransaccionActaRecibido } from '../../../@core/data/models/acta_recibido/transaccion_acta_recibido';
import Swal from 'sweetalert2';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Unidad } from '../../../@core/data/models/acta_recibido/unidades';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'ngx-edicion-acta-recibido',
  templateUrl: './edicion-acta-recibido.component.html',
  styleUrls: ['./edicion-acta-recibido.component.scss'],
})
export class EdicionActaRecibidoComponent implements OnInit {

  config: ToasterConfig;

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

  @Input('Id_Acta') _ActaId: number;
  Estados_Acta: Array<EstadoActa>;
  Tipos_Bien: Array<TipoBien>;
  Estados_Elemento: Array<EstadoElemento>;

  // Modelos

  Acta__: ActaRecibido;
  Elementos__Soporte: Array<any[]>;
  Soportes_Acta: Array<SoporteActa>;
  Historico_Acta: HistoricoActa;
  Transaccion__: TransaccionActaRecibido;
  Unidades: Array<Unidad>;
  DatosElementos: Array<any>;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private Actas_Recibido: ActaRecibidoHelper,
    private toasterService: ToasterService,

  ) {
  }
  ngOnInit() {
    this.Traer_Tipo_Bien();
    this.Traer_Estados_Acta();
    this.Traer_Estados_Elemento();
    this.Traer_Acta(this._ActaId);
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
  Traer_Acta(Acta_Id: number) {
    this.Transaccion__ = new TransaccionActaRecibido;
    this.Actas_Recibido.getTransaccionActa(Acta_Id).subscribe(res => {
      if (res !== null) {
        this.Transaccion__ = res[0];

        this.Cargar_Formularios(this.Transaccion__);
      }
    });
  }
  Traer_Unidades() {
    this.Unidades = new Array<Unidad>();
    this.Actas_Recibido.getUnidades().subscribe(res => {
      if (res !== null) {
        for (const index in res) {
          if (res.hasOwnProperty(index)) {
            const unidad = new Unidad;
            unidad.Id = res[index].Id;
            unidad.Unidad = res[index].Unidad;
            unidad.Tipo = res[index].Tipo;
            unidad.Descripcion = res[index].Descripcion;
            unidad.Estado = res[index].Estado;
            this.Unidades.push(unidad);
          }
        }
      }
    });
  }
  Cargar_Formularios(transaccion_: TransaccionActaRecibido) {

    this.firstForm = new FormGroup({});

    const Form2 = this.fb.array([]);
    const elementos = new Array<any[]>();

    for (const Soporte of transaccion_.SoportesActa) {

      const Formulario__2 = this.fb.group({
        Id: [Soporte.SoporteActa.Id],
        Proveedor: [Soporte.SoporteActa.ProveedorId, Validators.required],
        Consecutivo: [Soporte.SoporteActa.Consecutivo, Validators.required],
        Fecha_Factura: [Soporte.SoporteActa.FechaSoporte, Validators.required],
        Soporte: ['', Validators.required],
      });

      const elementoSoporte = []
      for (const _Elemento of Soporte.Elementos) {

        const Elemento___ = {
          Id: _Elemento.Id,
          TipoBienId: _Elemento.TipoBienId.Id,
          SubgrupoCatalogoId: _Elemento.SubgrupoCatalogoId,
          Nombre: _Elemento.Nombre,
          Cantidad: _Elemento.Cantidad,
          Marca: _Elemento.Marca,
          Serie: _Elemento.Serie,
          UnidadMedida: _Elemento.UnidadMedida,
          ValorUnitario: _Elemento.ValorUnitario,
          Subtotal: _Elemento.ValorTotal,
          Descuento: _Elemento.Descuento,
          PorcentajeIvaId: _Elemento.PorcentajeIvaId,
          ValorIva: _Elemento.ValorIva,
          ValorTotal: _Elemento.ValorFinal,
        };
        elementoSoporte.push(Elemento___);
        console.log(elementoSoporte);
      }
      console.log(elementoSoporte);
      elementos.push(elementoSoporte);
      Form2.push(Formulario__2);
    }

    this.Elementos__Soporte = elementos;
    this.firstForm = this.fb.group({
      Formulario1: this.fb.group({
        Id: [transaccion_.ActaRecibido.Id],
        Sede: ['', Validators.required],
        Dependencia: ['', Validators.required],
        Ubicacion: [transaccion_.ActaRecibido.UbicacionId, Validators.required],
      }),
      Formulario2: Form2,
      Formulario3: this.fb.group({
        Datos_Adicionales: [transaccion_.ActaRecibido.Observaciones, Validators.required],
      }),
    });
    console.log(this.Elementos__Soporte)
    this.carga_agregada = true;
  }
  get Formulario_1(): FormGroup {
    return this.fb.group({
      Id: [0],
      Sede: ['', Validators.required],
      Dependencia: ['', Validators.required],
      Ubicacion: ['', Validators.required],
    });
  }
  get Formulario_2(): FormGroup {
    return this.fb.group({
      Id: [0],
      Proveedor: ['', Validators.required],
      Consecutivo: ['', Validators.required],
      Fecha_Factura: ['', Validators.required],
      Soporte: ['', Validators.required],
      Elementos: this.fb.array([this.Elementos]),
    });
  }
  get Elementos(): FormGroup {
    return this.fb.group({
      Id: [0],
      TipoBienId: [''],
      SubgrupoCatalogoId: [''],
      Nombre: [''],
      Cantidad: ['0'],
      Marca: [''],
      Serie: [''],
      UnidadMedida: [''],
      ValorUnitario: ['0'],
      Subtotal: ['0'],
      Descuento: ['0'],
      PorcentajeIvaId: [''],
      ValorIva: ['0'],
      ValorTotal: ['0'],
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
  addTab() {
    this.addSoportes();
    this.selected.setValue(this.firstForm.get('Formulario2').value.length - 1);
  }
  removeTab(i: number) {
    this.deleteSoportes(i);
    this.selected.setValue(i - 1);
  }
  onFirstSubmit() {
    this.Datos = this.firstForm.value;

    const Transaccion_Acta = new TransaccionActaRecibido();

    Transaccion_Acta.ActaRecibido = this.Registrar_Acta(this.Datos.Formulario1, this.Datos.Formulario3);
    Transaccion_Acta.UltimoEstado = this.Registrar_Estado_Acta(Transaccion_Acta.ActaRecibido, 3);

    const Soportes = new Array<TransaccionSoporteActa>();

    for (const soporte of this.Datos.Formulario2) {

      Soportes.push(this.Registrar_Soporte(soporte, soporte.Elementos, Transaccion_Acta.ActaRecibido));
    }

    Transaccion_Acta.SoportesActa = Soportes;

    this.Actas_Recibido.putTransaccionActa(Transaccion_Acta, Transaccion_Acta.ActaRecibido.Id).subscribe((res: any) => {
      if (res !== null) {
        (Swal as any).fire({
          type: 'success',
          title: 'Acta N° ' + `${res.ActaRecibido.Id}` + ' Modificada',
          text: 'El acta N° ' + `${res.ActaRecibido.Id}` + ' ha sido modificada exitosamente',
        });
        this.router.navigate(['/consulta-acta-recibido']);
      } else {
        (Swal as any).fire({
          type: 'error',
          title: 'Acta N° ' + `${res.ActaRecibido.Id}` + ' No Modificada',
          text: 'El acta N° ' + `${res.ActaRecibido.Id}` + ' no ha podido ser modificada, intenta mas tarde',
        });
      }
    });
  }

  onFirstSubmit2() {
    this.Datos = this.firstForm.value;

    const Transaccion_Acta = new TransaccionActaRecibido();

    Transaccion_Acta.ActaRecibido = this.Registrar_Acta(this.Datos.Formulario1, this.Datos.Formulario3);

    Transaccion_Acta.UltimoEstado = this.Registrar_Estado_Acta(Transaccion_Acta.ActaRecibido, 4);

    const Soportes = new Array<TransaccionSoporteActa>();

    for (const soporte of this.Datos.Formulario2) {

      Soportes.push(this.Registrar_Soporte(soporte, soporte.Elementos, Transaccion_Acta.ActaRecibido));
    }

    Transaccion_Acta.SoportesActa = Soportes;

    this.Actas_Recibido.putTransaccionActa(Transaccion_Acta, Transaccion_Acta.ActaRecibido.Id).subscribe((res: any) => {
      if (res !== null) {
        (Swal as any).fire({
          type: 'success',
          title: 'Acta N° ' + `${res.ActaRecibido.Id}` + ' Enviada',
          text: 'El acta N° ' + `${res.ActaRecibido.Id}` + ' ha sido enviada a verificacion exitosamente',
        });
        this.router.navigate(['/consulta-acta-recibido']);
      } else {
        (Swal as any).fire({
          type: 'error',
          title: 'Acta N° ' + `${res.ActaRecibido.Id}` + ' No Enviada',
          text: 'El acta N° ' + `${res.ActaRecibido.Id}` + ' no ha podido ser enviada, intenta mas tarde',
        });
      }
    });

  }

  Registrar_Acta(Datos: any, Datos2: any): ActaRecibido {

    const Acta_de_Recibido = new ActaRecibido();

    Acta_de_Recibido.Id = parseFloat(Datos.Id);
    Acta_de_Recibido.Activo = true;
    Acta_de_Recibido.FechaCreacion = new Date();
    Acta_de_Recibido.FechaModificacion = new Date();
    Acta_de_Recibido.RevisorId = 123;
    Acta_de_Recibido.UbicacionId = parseFloat(Datos.Ubicacion);
    Acta_de_Recibido.Observaciones = Datos2.Datos_Adicionales;

    return Acta_de_Recibido;
  }
  Registrar_Estado_Acta(__: ActaRecibido, Estado: number): HistoricoActa {

    const Historico_ = new HistoricoActa();

    Historico_.Id = null;
    Historico_.ActaRecibidoId = __;
    Historico_.Activo = true;
    Historico_.EstadoActaId = this.Estados_Acta.find(estado => estado.Id === Estado);
    Historico_.FechaCreacion = new Date();
    Historico_.FechaModificacion = new Date();

    return Historico_;
  }
  Registrar_Soporte(Datos: any, Elementos_: any, __: ActaRecibido): TransaccionSoporteActa {

    const Soporte_Acta = new SoporteActa();
    const Transaccion = new TransaccionSoporteActa();

    Soporte_Acta.Id = parseFloat(Datos.Id);
    Soporte_Acta.ActaRecibidoId = __;
    Soporte_Acta.Activo = true;
    Soporte_Acta.Consecutivo = Datos.Consecutivo;
    Soporte_Acta.FechaCreacion = new Date();
    Soporte_Acta.FechaModificacion = new Date();
    Soporte_Acta.FechaSoporte = Datos.Fecha_Factura;
    Soporte_Acta.ProveedorId = Datos.Proveedor;

    Transaccion.SoporteActa = Soporte_Acta;
    Transaccion.Elementos = this.Registrar_Elementos(Elementos_, Soporte_Acta);

    return Transaccion;
  }
  Registrar_Elementos(Datos: any, Soporte: SoporteActa): Array<Elemento> {
    const _ = new Array<Elemento>();

    for (const datos of Datos) {

      const Elemento__ = new Elemento;
      const valorTotal = (parseFloat(this.Pipe2Number(datos.Subtotal)) - parseFloat(this.Pipe2Number(datos.Descuento)));

      Elemento__.Id = parseFloat(Datos.Id);
      Elemento__.Nombre = datos.Nombre;
      Elemento__.Cantidad = datos.Cantidad;
      Elemento__.Marca = datos.Marca;
      Elemento__.Serie = datos.Serie;
      Elemento__.UnidadMedida = datos.UnidadMedida;
      Elemento__.ValorUnitario = parseFloat(this.Pipe2Number(datos.ValorUnitario));
      Elemento__.Subtotal = parseFloat(this.Pipe2Number(datos.Subtotal));
      Elemento__.Descuento = parseFloat(this.Pipe2Number(datos.Descuento));
      Elemento__.ValorTotal = valorTotal;
      Elemento__.PorcentajeIvaId = datos.PorcentajeIvaId;
      Elemento__.ValorIva = parseFloat(this.Pipe2Number(datos.ValorIva));
      Elemento__.ValorFinal = parseFloat(this.Pipe2Number(datos.ValorTotal));
      Elemento__.SubgrupoCatalogoId = parseFloat(datos.SubgrupoCatalogoId);
      Elemento__.Verificado = false;
      Elemento__.TipoBienId = this.Tipos_Bien.find(bien => bien.Id === parseFloat(datos.TipoBienId));
      Elemento__.EstadoElementoId = this.Estados_Acta.find(estado => estado.Id === 1);
      Elemento__.SoporteActaId = Soporte;
      Elemento__.Activo = true;
      Elemento__.FechaCreacion = new Date();
      Elemento__.FechaModificacion = new Date();

      _.push(Elemento__);

    }
    return _;
  }

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

  Pipe2Number(any: string) {
    // if (any !== null) {
    //   return any.replace(/[$,]/g, '');
    // } else {
    //   return '0';
    // }
    return any;
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

  ver(event: any, index: number) {
    console.log(event);
    this.DatosElementos = event;
  }
  
  Revisar_Totales() {
    (Swal as any).fire({
      type: 'success',
      title: 'Carga de Elementos',
      text: 'Por favor verificar la carga de elementos, valores y totales asociados al soporte antes de actualizar el registro',
    });
  }
  Revisar_Totales2() {

    (Swal as any).fire({
      title: 'Esta Seguro?',
      text: 'Esta seguro de que desea guardar los cambios?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.onFirstSubmit();
      }
    });
  }

  Revisar_Totales3() {

    (Swal as any).fire({
      title: 'Esta Seguro?',
      text: 'Esta seguro de que desea enviar el acta a verificacion?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.onFirstSubmit2();
      }
    });
  }
}
