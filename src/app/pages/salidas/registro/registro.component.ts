import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  ver: boolean;

  constructor() { }

  ngOnInit() {
    this.ver = true;
  }


}
