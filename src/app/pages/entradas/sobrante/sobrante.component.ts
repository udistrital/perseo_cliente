import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-sobrante',
  templateUrl: './sobrante.component.html',
  styleUrls: ['./sobrante.component.scss'],
})
export class SobranteComponent implements OnInit {

  solicitanteForm: FormGroup;
  soporteForm: FormGroup;
  observacionForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.solicitanteForm = this.fb.group({
      solicitanteCtrl: ['', Validators.required],
    });
    this.soporteForm = this.fb.group({
      soporteCtrl: ['', Validators.required],
    });
    this.observacionForm = this.fb.group({
      observacionCtrl: ['', Validators.nullValidator],
    });
  }

  // Métodos para validar campos requeridos en el formulario
  onSolicitanteSubmit() {
    this.soporteForm.markAsDirty();
  }

  onSoporteSubmit() {
    this.soporteForm.markAsDirty();
  }

}
