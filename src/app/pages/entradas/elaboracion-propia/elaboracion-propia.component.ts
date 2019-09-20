import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-elaboracion-propia',
  templateUrl: './elaboracion-propia.component.html',
  styleUrls: ['./elaboracion-propia.component.scss'],
})
export class ElaboracionPropiaComponent implements OnInit {

  soporteForm: FormGroup;
  observacionForm: FormGroup;
  odenadorForm: FormGroup;
  supervisorForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.soporteForm = this.fb.group({
      soporteCtrl: ['', Validators.required],
    });
    this.observacionForm = this.fb.group({
      observacionCtrl: ['', Validators.nullValidator],
    });
    this.odenadorForm = this.fb.group({
      odenadorCtrl: ['', Validators.nullValidator],
    });
    this.supervisorForm = this.fb.group({
      supervisorCtrl: ['', Validators.nullValidator],
    });
  }

  // Métodos para validar campos requeridos en el formulario
  onSoporteSubmit() {
    this.soporteForm.markAsDirty();
  }

}
