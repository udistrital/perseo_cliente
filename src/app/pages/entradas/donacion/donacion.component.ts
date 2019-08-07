import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-donacion',
  templateUrl: './donacion.component.html',
  styleUrls: ['./donacion.component.scss'],
})
export class DonacionComponent implements OnInit {

  contratoForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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
