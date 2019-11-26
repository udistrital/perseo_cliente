import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss'],
})
export class FiltroComponent implements OnInit {

  vigencias = ["2016","2017","2018","2019", "2020"];

  constructor() { }

  ngOnInit() {
  }

}
