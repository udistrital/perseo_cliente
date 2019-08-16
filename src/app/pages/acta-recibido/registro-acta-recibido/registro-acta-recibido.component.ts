import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ngx-smart-table';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DatosLocales } from './datos_locales';


@Component({
  selector: 'ngx-registro-acta-recibido',
  templateUrl: './registro-acta-recibido.component.html',
  styleUrls: ['./registro-acta-recibido.component.scss'],
})


export class RegistroActaRecibidoComponent implements OnInit {

  // Datos de Tabla
  source: LocalDataSource;

  ELEMENT_DATA: any[];

  // Mensaje de Error
  errMess: any;
  private sub: Subscription;

  // Formularios para registro
  // - Datos Iniciales

  firstForm: FormGroup;
  @ViewChild('fform') firstFormDirective;
  Datos: any;
  carga_agregada: boolean;
  tabs = ['Soporte 1'];
  selected = new FormControl(0);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }
  ngOnInit() {
    // this.source.load(this.data);
    this.Cargar_Formularios();
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
      RevisorId: ['', Validators.required],
      Cantidad: ['', Validators.required],
      Marca: ['', Validators.required],
      Serie: ['', Validators.required],
      UnidadMedida: ['', Validators.required],
      ValorUnitario: ['', Validators.required],
      Subtotal: ['', Validators.required],
      Descuento: ['', Validators.required],
      PorcentajeIvaId: ['', Validators.required],
      ValorIva: ['', Validators.required],
      ValorTotal: ['', Validators.required],
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
  }
  deletePlayer(Soporte, index: number) {
    Soporte.get('Elementos').removeAt(index);
  }
  onFirstSubmit() {
    this.Datos = this.firstForm.value;
  }
  addTab() {
    this.addSoportes();
    this.selected.setValue(this.tabs.length - 1);
  }
  removeTab(i: number) {
    this.deleteSoportes(i);
  }
  // Acciones para elementos

  displayedColumns = [
    'TipoBienId',
    'SubgrupoCatalogoId',
    'Nombre',
    'RevisorId',
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
  dataSource = this.ELEMENT_DATA;
}
