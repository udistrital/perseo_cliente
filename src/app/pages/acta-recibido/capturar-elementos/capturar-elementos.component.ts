import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { TipoBien } from '../../../@core/data/models/acta_recibido/tipo_bien';


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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('fileInput') fileInput: ElementRef;
  dataSource: MatTableDataSource<any>;

  @Input() DatosRecibidos: any;
  @Output() DatosEnviados  = new EventEmitter();


  respuesta: any;
  Tipos_Bien: Array<TipoBien>;

  constructor(private fb: FormBuilder,
    translate: TranslateService,
    private actaRecibidoHelper: ActaRecibidoHelper) {
  }

  ngOnInit() {
    this.createForm();
    this.Traer_Tipo_Bien();
    if (this.DatosRecibidos !== null) {
      this.dataSource = new MatTableDataSource(this.DatosRecibidos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }

  }

  Traer_Tipo_Bien() {
    this.Tipos_Bien = new Array<TipoBien>();
    this.actaRecibidoHelper.getTipoBien().subscribe(res => {
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createForm() {
    this.form = this.fb.group({
      archivo: null,
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('archivo').setValue(file);
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
        this.dataSource = new MatTableDataSource(this.respuesta[0].Elementos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.DatosEnviados.emit(this.dataSource.data);
      } else {
        (Swal as any).fire({
          type: 'error',
          title: 'Elementos No Cargados',
          text: 'Los elementos no han sido cargados, intenta mas tarde',
        });
      }
    });
    // };
    // myReader.readAsArrayBuffer(file);
  }

  clearFile() {
    this.fileInput.nativeElement.value = '';
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

}
