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

  ELEMENT_DATA: any[]; // = DatosLocales;

  // Mensaje de Error
  errMess: any;
  private sub: Subscription;

  // Formularios para registro
  // - Datos Iniciales

  firstForm: FormGroup;
  @ViewChild('fform') firstFormDirective;
  Datos_Iniciales: any;

  // - Datos de Soporte

  secondForm: FormArray;
  @ViewChild('fform2') secondFormDirective;
  Datos_Soporte: any;

  //   * Variables de Tabs para Facturas

  carga_agregada: boolean = false;
  tabs = ['Soporte 1'];
  selected = new FormControl(0);

  // - Datos Adicionales

  thirdForm: FormGroup;
  @ViewChild('fform3') thirdFormDirective;
  Datos_Adicionales: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.Cargar_Formularios();
  }

  ngOnInit() {
    // this.source.load(this.data);
  }

  Cargar_Formularios() {

    this.firstForm = this.fb.group({
      Sede: ['', Validators.required],
      Dependencia: ['', Validators.required],
      Ubicacion: ['', Validators.required],
    });
    this.secondForm = this.fb.array([]);
    const Elementos = this.fb.group({
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
    const Carga = this.fb.group({
      Proveedor: ['', Validators.required],
      Consecutivo: ['', Validators.required],
      Fecha_Factura: ['', Validators.required],
      Soporte: ['', Validators.required],
      Elementos: this.fb.array([Elementos]),
    });
    this.secondForm.push(Carga);
    this.thirdForm = this.fb.group({
      Datos_Adicionales: ['', Validators.required],
    });
    this.carga_agregada = true;
  }
  ver() {
    // this.source.getAll().then((data) => { console.log(data); this.foo = data; this.bandera = true; });
  }
  onFirstSubmit() {

    this.Datos_Iniciales = this.firstForm.value;
  }
  onSecondSubmit() {

    this.Datos_Soporte = this.secondForm.value;
  }
  onThirdSubmit() {

    this.Datos_Adicionales = this.thirdForm.value;
  }

  // Accciones para Tabs Facturas

  addTab() {
    this.tabs.push('Soporte ' + (this.tabs.length + 1));
    this.selected.setValue(this.tabs.length - 1);
    this.carga_agregada = true;
    const Elementos = this.fb.group({
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
    const Carga = this.fb.group({
      Proveedor: ['', Validators.required],
      Consecutivo: ['', Validators.required],
      Fecha_Factura: ['', Validators.required],
      Soporte: ['', Validators.required],
      Elementos: this.fb.array([Elementos]),
    });
    this.secondForm.push(Carga);
    console.log(this.secondForm.get('Elementos.Nombre'));
  }
  removeTab(i: number) {


    this.tabs.splice(i, 1);
    this.secondForm.removeAt(i);
    this.onSecondSubmit();
    if (this.tabs.length === 1) {
      this.carga_agregada = false;
      this.tabs = ['Soporte 1'];
      this.selected.setValue(i - 1);
      this.secondForm = this.fb.array([]);
      for (let j = 0; j < this.tabs.length; j++) {
        this.tabs[j] = 'Soporte ' + (j + 1).toString();
        const Carga = this.fb.group({
          Proveedor: [this.Datos_Soporte[j].Proveedor, Validators.required],
          Consecutivo: [this.Datos_Soporte[j].Consecutivo, Validators.required],
          Fecha_Factura: [this.Datos_Soporte[j].Fecha_Factura, Validators.required],
          Soporte: [this.Datos_Soporte[j].Soporte, Validators.required],
        });
        this.secondForm.push(Carga);
      }
    } else if (this.tabs.length === 0) {
    } else {
      this.selected.setValue(i - 1);
      this.secondForm = this.fb.array([]);
      for (let j = 0; j < this.tabs.length; j++) {
        this.tabs[j] = 'Soporte ' + (j + 1).toString();
        const Carga = this.fb.group({
          Proveedor: [this.Datos_Soporte[j].Proveedor, Validators.required],
          Consecutivo: [this.Datos_Soporte[j].Consecutivo, Validators.required],
          Fecha_Factura: [this.Datos_Soporte[j].Fecha_Factura, Validators.required],
          Soporte: [this.Datos_Soporte[j].Soporte, Validators.required],
        });
        this.secondForm.push(Carga);
      }
    }
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
    'Acciones'
  ];
  dataSource = this.ELEMENT_DATA;
}
