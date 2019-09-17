import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as XLSX from 'xlsx';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { TipoBien } from '../../../@core/data/models/acta_recibido/tipo_bien';
// import { DatosLocales, DatosLocales2 } from './datos_locales';
import { Unidad } from '../../../@core/data/models/acta_recibido/unidades';
import { DatosLocales2 } from './datos_locales';


@Component({
  selector: 'ngx-capturar-elementos',
  templateUrl: './capturar-elementos.component.html',
  styleUrls: ['./capturar-elementos.component.scss'],
})
export class CapturarElementosComponent implements OnInit {

  fileString: string | ArrayBuffer;
  arrayBuffer: Iterable<number>;
  form: FormGroup;
  buffer: Uint8Array;
  Validador: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild('fileInput') fileInput: ElementRef;
  dataSource: MatTableDataSource<any>;

  @Input() DatosRecibidos: any;
  @Output() DatosEnviados = new EventEmitter();

  respuesta: any;
  Tipos_Bien: Array<TipoBien>;
  Unidades: Unidad[];

  constructor(private fb: FormBuilder,
    translate: TranslateService,
    private actaRecibidoHelper: ActaRecibidoHelper) {
  }

  ngOnInit() {
    this.createForm();
    this.Traer_Parametros_Elementos();
    if (this.DatosRecibidos !== undefined) {
      this.dataSource = new MatTableDataSource(this.DatosRecibidos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ver() {
    this.DatosEnviados.emit(this.dataSource.data);
  }
  Traer_Parametros_Elementos() {
    this.actaRecibidoHelper.getParametros().subscribe(res => {
      if (res !== null) {
        this.Traer_Tipo_Bien(res[0].TipoBien);
        this.Traer_Unidades(res[0].Unidades);
        this.Traer_IVA(res[0].IVA);
      }
    });
  }
  Traer_IVA(IVA: any) {
    // console.log(IVA);
  }
  Traer_Tipo_Bien(res: any) {
    this.Tipos_Bien = new Array<TipoBien>();
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
  Traer_Unidades(res: any) {
    this.Unidades = new Array<Unidad>();
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createForm() {
    this.form = this.fb.group({
      archivo: ['', Validators.required],
    });
  }
  onFileChange(event) {

    let nombre = '';
    if (event.target.files.length > 0) {
      nombre = event.target.files[0].name;
      const [_, extension] = nombre.split('.');
      const file = event.target.files[0];
      if (extension !== 'xlsx') {
        this.Validador = false;
      } else {
        this.form.get('archivo').setValue(file);
        this.Validador = true;
      }
    } else {
      this.Validador = false;
    }
  }
  private prepareSave(): any {
    const input = new FormData();
    input.append('archivo', this.form.get('archivo').value);
    return input;
  }

  readThis(): void {

    const formModel = this.prepareSave();
    this.actaRecibidoHelper.postArchivo(formModel).subscribe(res => {

      if (res !== null) {
        (Swal as any).fire({
          type: 'success',
          title: 'Elementos Cargados',
          text: 'Elementos cargados exitosamente',
        });
        this.respuesta = res;
        this.dataSource.data = this.respuesta[0].Elementos;
        this.ver();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        (Swal as any).fire({
          type: 'error',
          title: 'Elementos No Cargados',
          text: 'Los elementos no han sido cargados, intenta mas tarde',
        });
      }
    });
  }

  clearFile() {
    this.fileInput.nativeElement.value = '';
    this.form.get('archivo').setValue('');
  }

  onSubmit() {
    this.readThis();
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

  DatosLocales2: any = {
    Cantidad: '1',
    Descripcion: '',
    Descuento: '0',
    Marca: '',
    NivelInventariosId: '1',
    PorcentajeIvaId: '19.00%',
    Serie: '',
    SubgrupoCatalogoId: '',
    Subtotal: '',
    TipoBienId: '1',
    UnidadMedida: '2',
    ValorIva: '0',
    ValorTotal: '0',
    ValorUnitario: '0',
  };


  getDescuentos() {
    return this.dataSource.data.map(t => t.Descuento).reduce((acc, value) => parseFloat(acc) + parseFloat(value));
  }

  getSubtotales() {
    return this.dataSource.data.map(t => t.Subtotal).reduce((acc, value) => parseFloat(acc) + parseFloat(value));
  }

  getIVA() {
    return this.dataSource.data.map(t => t.ValorIva).reduce((acc, value) => parseFloat(acc) + parseFloat(value));
  }

  getTotales() {
    return this.dataSource.data.map(t => t.ValorTotal).reduce((acc, value) => parseFloat(acc) + parseFloat(value));
  }

  addElemento() {
    console.log(this.dataSource.data.values);
    this.dataSource.data.push({
        Cantidad: '1',
        Descripcion: '',
        Descuento: '0',
        Marca: '',
        NivelInventariosId: '1',
        PorcentajeIvaId: '19.00%',
        Serie: '',
        SubgrupoCatalogoId: '',
        Subtotal: '0',
        TipoBienId: '1',
        UnidadMedida: '2',
        ValorIva: '0',
        ValorTotal: '0',
        ValorUnitario: '0',
      }
    );
    this.dataSource._updateChangeSubscription();
    console.log(this.dataSource.data);
  }
  deleteElemento(index: number) {

    (Swal as any).fire({
      title: 'Esta Seguro?',
      text: 'Esta seguro de eliminar el elemento?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        const data = this.dataSource.data;
        data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
        this.dataSource.data = data;
      }
    });
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
  Pipe2Number(any: String) {
    console.log(any);
    if (any !== null) {
      return any.replace(/[$,]/g, '');
    } else {
      return '0';
    }
  }
}
