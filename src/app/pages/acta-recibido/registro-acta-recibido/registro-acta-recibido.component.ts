import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ngx-smart-table';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'ngx-registro-acta-recibido',
  templateUrl: './registro-acta-recibido.component.html',
  styleUrls: ['./registro-acta-recibido.component.scss'],
})


export class RegistroActaRecibidoComponent implements OnInit {

  // Datos de Tabla
  source: LocalDataSource;

  ELEMENT_DATA: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

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

  settings = {
    actions: {
      columnTitle: 'Acciones',
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },

    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      tipo_bien_id: {
        title: 'Tipo de Bien',
        valuePrepareFunction: (value: any) => {
          return value;
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: '1', title: 'Devolutivo' },
              { value: '2', title: 'Consumo' },
              { value: '3', title: 'Consumo Controlado' },
            ],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: '1', title: 'Devolutivo' },
              { value: '2', title: 'Consumo' },
              { value: '3', title: 'Consumo Controlado' },
            ],
          },
        },
      },
      subgrupo_id: {
        title: 'Subgrupo',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      descripcion: {
        title: 'Descripcion',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      cantidad: {
        title: 'Cantidad',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      marca: {
        title: 'Marca',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      serie: {
        title: 'Serie',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      unidad_medida: {
        title: 'Unidad de Medida',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      valor_unitario: {
        title: 'Valor Unitario',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      valor_cantidad: {
        title: 'Valor por Cantidad',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      descuento: {
        title: 'Descuento',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      porcentaje_iva: {
        title: '% IVA',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      valor_iva: {
        title: 'Valor IVA',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
      valor_total: {
        title: 'Valor Total',
        valuePrepareFunction: (value) => {
          return value;
        },
      },
    },
  };

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
    const Carga = this.fb.group({
      Proveedor: ['', Validators.required],
      Consecutivo: ['', Validators.required],
      Fecha_Factura: ['', Validators.required],
      Soporte: ['', Validators.required],
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
    console.log(this.firstForm.value);
    this.Datos_Iniciales = this.firstForm.value;
  }
  onSecondSubmit() {
    console.log(this.secondForm.value);
    this.Datos_Soporte = this.secondForm.value;
  }
  onThirdSubmit() {
    console.log(this.thirdForm.value);
    this.Datos_Adicionales = this.thirdForm.value;
  }

  // Accciones para Tabs Facturas

  addTab() {
    this.tabs.push('Soporte ' + (this.tabs.length + 1));
    this.selected.setValue(this.tabs.length - 1);
    this.carga_agregada = true;
    const Carga = this.fb.group({
      Proveedor: ['', Validators.required],
      Consecutivo: ['', Validators.required],
      Fecha_Factura: ['', Validators.required],
      Soporte: ['', Validators.required],
    });
    this.secondForm.push(Carga);
  }
  removeTab(i: number) {

    console.log(i);
    this.tabs.splice(i, 1);
    this.secondForm.removeAt(i);
    this.onSecondSubmit();
    if (this.tabs.length == 1) {
      this.carga_agregada = false;
      this.tabs = ['Soporte 1'];
      this.selected.setValue(i - 1);
    }
    else {
      this.selected.setValue(i - 1);
      this.secondForm = this.fb.array([]);
      for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i] = "Soporte " + (i + 1).toString();

        const Carga = this.fb.group({
          Proveedor: [this.Datos_Soporte[i].Proveedor, Validators.required],
          Consecutivo: [this.Datos_Soporte[i].Consecutivo, Validators.required],
          Fecha_Factura: [this.Datos_Soporte[i].Fecha_Factura, Validators.required],
          Soporte: [this.Datos_Soporte[i].Soporte, Validators.required],
        });
        this.secondForm.push(Carga);
      }
    }
  }
// Acciones para elementos

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.ELEMENT_DATA;

  
  
  
}
