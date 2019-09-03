import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ngx-capturar-elementos',
  templateUrl: './capturar-elementos.component.html',
  styleUrls: ['./capturar-elementos.component.scss']
})
export class CapturarElementosComponent implements OnInit {
  fileString: string | ArrayBuffer;
  arrayBuffer: Iterable<number>;

  constructor() { }

  ngOnInit() {
  }

  cargandoImagen(event): void {
    console.log(event);
    this.readThis(event.target);
  }

  readThis(inputValue: any): void {

    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    var fileType = inputValue.parentElement.id;

    myReader.onloadend = (e) => {
      
      console.log(myReader.result);
      this.fileString = myReader.result;

            var workbook = XLSX.read(this.fileString, {type:"array"});
            
            console.log(workbook.Sheets);
   };

    myReader.readAsArrayBuffer(file);
  }

}
