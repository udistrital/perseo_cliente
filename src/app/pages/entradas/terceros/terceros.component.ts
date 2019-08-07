import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-terceros',
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.scss'],
})
export class TercerosComponent implements OnInit {

  contratoForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.contratoForm = this.fb.group({
      contratoCtrl: ['', Validators.required],
    });
  }

  // Métodos para validar campos requeridos en el formulario
  onContratoSubmit() {
    this.contratoForm.markAsDirty();
  }

}
