import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-capturar-elementos',
  templateUrl: './capturar-elementos.component.html',
  styleUrls: ['./capturar-elementos.component.scss']
})
export class CapturarElementosComponent implements OnInit {

  fileString: string | ArrayBuffer;
  arrayBuffer: Iterable<number>;
  form: FormGroup;
  buffer: Uint8Array;

  @ViewChild('fileInput') fileInput: ElementRef;
  respuesta: any;

  constructor(private fb: FormBuilder,
    translate: TranslateService,
    private actaRecibidoHelper: ActaRecibidoHelper) {

  }

  ngOnInit() {
    this.createForm();
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

      console.log(res);
      this.respuesta = res;
      if (res !== null) {
        (Swal as any).fire({
          type: 'success',
          title: 'Elementos Cargados',
          text: 'Elementos cargados exitosamente',
        });
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

}
