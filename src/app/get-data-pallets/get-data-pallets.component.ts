import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Store } from '@ngrx/store';
import { newFileCsv } from '../state/actions/pallets.action';
import Swal from 'sweetalert2';
import { CSV } from '../interfaces/CSV';

@Component({
  selector: 'app-get-data-pallets',
  templateUrl: './get-data-pallets.component.html',
  styleUrls: ['./get-data-pallets.component.css'],
})
export class GetDataPalletsComponent implements OnInit {
  constructor(private ngxCsvParser: NgxCsvParser, private store: Store) {}

  //------------------- READ AND PARSE CSV WITHOUT LIBRERY ------------------------------------------

  //-------------------LEYENDO MI CSV CON FILEREADER---------------------------------

  changeListener($event: any): void {
    const fileInput = $event.target.files[0];
    const fileReader = new FileReader();

    fileReader.addEventListener(
      'load',
      () => {
        const fileContents = fileReader.result;
        this.csvValitation(fileContents);
      },
      false
    );

    if (fileInput) {
      fileReader.readAsText(fileInput);
    }
  }

  //------------------ VALIDACIÓN DEL CSV ------------------------------------

  csvValitation(csv: any): void {
    const trim = csv.trim();
    const delimiter = ',';
    const headers1 = trim.split('\r\n');
    const headers = headers1[0].split(delimiter);
    const rows = headers1.slice(1);
    const headerLower = [];
    const prop = [
      'numeropallet',
      'clientecodigo',
      'cliente',
      'destino',
      'productorid',
      'productor',
      'fechacosecha',
      'variedad',
      'cajas',
    ];
    const variableMissing: string[] = [];
    const arr: CSV[] = [];

    //---------------- CONVERSIÓN DE HEADERS A MINÚSCULA-------------------------

    for (let i = 0; i < headers.length; i++) {
      const result = headers[i].toLowerCase();
      headerLower.push(result);
    }

    //-----------------VALIDACIÓN CANTIDAD DE COLUMNAS-----------------------------

    if (headers.length < 9) {
      for (let i = 0; i < prop.length; i++) {
        if (!headerLower.includes(prop[i])) {
          const result = prop[i].toUpperCase();
          console.log(result);
          variableMissing.push(result);
        }
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `  ${'You are missing'} '${variableMissing}' ${'column from your csv!'}`,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } else if (headers.length > 9) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There are extra columns in your file csv',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } else {
      //--------------------VALIDAMOS POSICION DE COLUMNAS--------------------------------------
      if (
        headers[0].toLowerCase() != 'numeropallet' ||
        headers[1].toLowerCase() != 'clientecodigo' ||
        headers[2].toLowerCase() != 'cliente' ||
        headers[3].toLowerCase() != 'destino' ||
        headers[4].toLowerCase() != 'productorid' ||
        headers[5].toLowerCase() != 'productor' ||
        headers[6].toLowerCase() != 'fechacosecha' ||
        headers[7].toLowerCase() != 'variedad' ||
        headers[8].toLowerCase() != 'cajas'
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ' Column positioning error. Please check that it follows the following format: NumeroPallets, ClienteCodigo, Cliente, Destino, ProductorId, Productor, Fechacosecha, Variedad, Cajas',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        for (let i = 0; i < rows.length; i++) {
          const result = rows[i].split(delimiter);
          const obj: any = {};
          for (let h = 0; h < result.length; h++) {
            const key = headers[h];

            obj[key] = result[h];
          }
          arr.push(obj);
        }
      }
    }

    //-------------------TRANFORMO TIPO DE CAJAS EN NUMBER-------------------------------------------

    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i].Cajas === 'string') {
          arr[i].Cajas = Number(arr[i].Cajas);
        }
      }
    }

    //-----------------VALIDACION TIPO DE DATOS-------------------------------------------------

    for (let i = 0; i < arr.length; i++) {
      if (
        typeof arr[i].Cajas === 'number' &&
        typeof arr[i].Cliente === 'string' &&
        typeof arr[i].ClienteCodigo === 'string' &&
        typeof arr[i].Destino === 'string' &&
        typeof arr[i].FechaCosecha === 'string' &&
        typeof arr[i].NumeroPallet === 'string' &&
        typeof arr[i].Productor === 'string' &&
        typeof arr[i].ProductorID === 'string' &&
        typeof arr[i].Variedad === 'string'
      ) {
        this.store.dispatch(newFileCsv({ data: arr }));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Alguno de los tipos de datos no coincide',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    }
  }

  //----------------- LEER Y PARSEAR CSV CON LIBRERIA ---------------------------------------

  //   fileChangeListener($event: any): void {
  //     const files = $event.target.files;
  //
  //     this.ngxCsvParser
  //       .parse(files[0], { header: this.header, delimiter: ',' })
  //       .pipe()
  //       .subscribe({
  //         next: (result): void => {
  //           this.csvRecords = result;
  //           console.log('result', result);
  //           this.store.dispatch(newFileCsv({ data: this.csvRecords }));
  //         },
  //         error: (error: NgxCSVParserError): void => {
  //           console.log('Error', error);
  //         },
  //       });
  //   }
  //
  ngOnInit(): void {}
}
