import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Store } from '@ngrx/store';
import { newFileCsv } from '../state/actions/pallets.action';

@Component({
  selector: 'app-get-data-pallets',
  templateUrl: './get-data-pallets.component.html',
  styleUrls: ['./get-data-pallets.component.css'],
})
export class GetDataPalletsComponent implements OnInit {
  csvRecords: any;
  header: boolean = true;
  arr = new FileReader();

  constructor(private ngxCsvParser: NgxCsvParser, private store: Store) {}

  //------------------- LEER Y PARSEAR CSV SIN LIBRERIA ------------------------------------------

  changeListener($event: any): void {
    const fileInput = $event.target.files[0];
    const fileReader = new FileReader();

    fileReader.addEventListener(
      'load',
      () => {
        const fileContents = fileReader.result;
        this.csvPase(fileContents);
      },
      false
    );

    if (fileInput) {
      fileReader.readAsText(fileInput);
    }
  }

  csvPase(csv: any): void {
    const trim = csv.trim();
    const delimiter = ',';
    const headers1 = trim.split('\r\n');
    const headers = headers1[0].split(delimiter);
    const rows = headers1.slice(1);

    const arr = rows.map(function (row: any) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (
        object: { [key: string]: string },
        header: string,
        index: number
      ) {
        object[header] = values[index];
        return object;
      },
      {});
      return el;
    });
    this.store.dispatch(newFileCsv({ data: arr }));
  }

  //----------------- LEER Y PARSEAR CSV CON LIBRERIA ---------------------------------------

  fileChangeListener($event: any): void {
    const files = $event.target.files;

    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .pipe()
      .subscribe({
        next: (result): void => {
          this.csvRecords = result;
          console.log('result', result);
          this.store.dispatch(newFileCsv({ data: this.csvRecords }));
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        },
      });
  }

  ngOnInit(): void {}
}
