import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-adquisicion',
  templateUrl: './adquisicion.component.html',
  styleUrls: ['./adquisicion.component.scss'],
})

export class AdquisicionComponent implements OnInit {

  contratoForm: FormGroup;
  facturaForm: FormGroup;
  checked: boolean;

  constructor(private fb: FormBuilder) {
    this.checked = false;
  }

  ngOnInit() {
    this.contratoForm = this.fb.group({
      contratoCtrl: ['', Validators.required],
    });

    this.facturaForm = this.fb.group({
      facturaCtrl: ['', Validators.nullValidator],
    });
  }

  // Métodos para validar campos requeridos en el formulario
  onContratoSubmit() {
    this.contratoForm.markAsDirty();
  }

  onFacturaSubmit() {
    this.facturaForm.markAsDirty();
  }

  // Método para validar que se seleccionó el checkbox de importación.
  // Si es activo, el formulario se vuelve requerido.
  toggle(event) {
    this.checked = event.target.checked;
    if (this.checked) {
      this.facturaForm = this.fb.group({
        facturaCtrl: ['', Validators.required],
      });
    } else {
      this.facturaForm = this.fb.group({
        facturaCtrl: ['', Validators.nullValidator],
      });
    }
  }

  onSubmit() {
    // ARMAR JSON
  }

}
