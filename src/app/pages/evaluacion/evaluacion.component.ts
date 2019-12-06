import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
})
export class EvaluacionComponent implements OnInit {

  data: any;

  constructor() {
    this.data = [];
   }

  ngOnInit() {
  }

  sendData(data: any) {
    this.data = data;
  }
}
