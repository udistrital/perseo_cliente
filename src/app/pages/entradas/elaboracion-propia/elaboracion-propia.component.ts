import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-elaboracion-propia',
  templateUrl: './elaboracion-propia.component.html',
  styleUrls: ['./elaboracion-propia.component.scss'],
})
export class ElaboracionPropiaComponent implements OnInit {

  soporteForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.soporteForm = this.fb.group({
      soporteCtrl: ['', Validators.required],
    });
  }

  // Métodos para validar campos requeridos en el formulario
  onSoporteSubmit() {
    this.soporteForm.markAsDirty();
  }

}
