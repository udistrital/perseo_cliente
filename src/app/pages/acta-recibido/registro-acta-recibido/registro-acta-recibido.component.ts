import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ngx-smart-table';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-registro-acta-recibido',
  templateUrl: './registro-acta-recibido.component.html',
  styleUrls: ['./registro-acta-recibido.component.scss'],
})
export class RegistroActaRecibidoComponent implements OnInit {

  source: LocalDataSource;
  foo: any;
  datos: any;

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

  constructor(private router: Router, private route: ActivatedRoute ) {
  }

  ngOnInit() {
    // this.source.load(this.data);
  }
  ver() {
    // this.source.getAll().then((data) => { console.log(data); this.foo = data; this.bandera = true; });
  }

  ver2() {
  }
  ver3() {
    this.datos = this.source.getAll();
  }

  onCustom(event: any) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
  }
}
