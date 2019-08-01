import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
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
      tipo_bien: {
        title: 'Tipo de Bien',
      },
      subgrupo: {
        title: 'Subgrupo',
      },
      descripcion: {
        title: 'Descripcion',
      },
      cantidad: {
        title: 'Cantidad',
      },
      marca: {
        title: 'Marca',
      },
      serie: {
        title: 'Serie',
      },
      unidad_medida: {
        title: 'Unidad de Medida',
      },
      valor_unitario: {
        title: 'Valor Unitario',
      },
      valor_cantidad: {
        title: 'Valor por Cantidad',
      },
      descuento: {
        title: 'Descuento',
      },
      porcentaje_iva: {
        title: '% IVA',
      },
      valor_iva: {
        title: 'Valor IVA',
      },
      valor_total: {
        title: 'Valor Total',
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
    //this.source.load(this.data);
  }
  ver() {
    //this.source.getAll().then((data) => { console.log(data); this.foo = data; this.bandera = true; });
  }

  ver2() {
    console.log(this.foo);
  }
  ver3() {
    this.datos = this.source.getAll();
    console.log(this.datos);
  }

  onCustom(event: any) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`)
  }
}
