import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-reposicion',
  templateUrl: './reposicion.component.html',
  styleUrls: ['./reposicion.component.scss'],
})
export class ReposicionComponent implements OnInit {

  elementoForm: FormGroup;
  soporteForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.elementoForm = this.fb.group({
      elementoCtrl: ['', Validators.required],
      encargadoCtrl: ['', Validators.required],
    });

    this.soporteForm = this.fb.group({
      soporteCtrl: ['', Validators.required],
    });
  }

  // Métodos para validar campos requeridos en el formulario
  onElementoSubmit() {
    this.elementoForm.markAsDirty();
  }

  onSoporteSubmit() {
    this.soporteForm.markAsDirty();
  }

}
