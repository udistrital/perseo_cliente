import { Component, OnInit } from '@angular/core';
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

  source: LocalDataSource;
  foo: number;
  datos: any;
  firstForm: FormGroup;
  secondForm: FormArray;
  thirdForm: FormGroup;
  components: Number[];


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

  private sub: Subscription;

  bandera: boolean = false;
  id: any;
  errMess: any;
  carga_agregada: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    ) {
  }

  ngOnInit() {
    // this.source.load(this.data);
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondForm = this.fb.array([]); 
    
    this.carga_agregada = true;
    const Carga = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
    
    this.secondForm.push(Carga);


    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }
  ver() {
    // this.source.getAll().then((data) => { console.log(data); this.foo = data; this.bandera = true; });
  }
  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
  onCustom(event: any) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
  }

  tabs = ['Soporte 1'];
  selected = new FormControl(0);

  addTab() {
    this.tabs.push('Soporte '+(this.tabs.length + 1));
    this.selected.setValue(this.tabs.length - 1);
    this.carga_agregada = true;
    const Carga = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
    
    this.secondForm.push(Carga);

  }
  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.secondForm.removeAt(index)
    if (index == 0) {
      this.carga_agregada = false;
    }

  }
}
