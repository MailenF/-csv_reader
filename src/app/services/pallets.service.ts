// import { Injectable } from '@angular/core';
// import { BehaviorSubject, map } from 'rxjs';
// import * as _ from 'lodash';
// import { Pallets } from '../interfaces/pallets';
// import { CSV } from '../interfaces/CSV';
// import { GroupBy } from '../interfaces/group-by';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class PalletsService {
//   private _palletObservable: BehaviorSubject<Pallets[]> = new BehaviorSubject<
//     Pallets[]
//   >([]);
//
//   private dataCsv: BehaviorSubject<CSV[]> = new BehaviorSubject<CSV[]>([]);
//
//   public dataCsv$ = this.dataCsv.asObservable();
//
//   public palletObservable$ = this._palletObservable.asObservable();
//   public view$ = this.palletObservable$.pipe(
//     map((state) => this.mapView(state))
//   );
//
//   palletObservableData(data: CSV[]) {
//     this.dataCsv.next(data);
//     console.log('dataCSV', this.dataCsv);
//
//     // // map CSV data to Entity Data
//     const result: Pallets[] = [];
//
//     for (let i = 0; i < data.length; i++) {
//       const numero_pallet = data[i].NumeroPallet;
//
//       if (result.length === 0) {
//         const pallet = {
//           numero: data[0].NumeroPallet,
//           cliente: data[0].Cliente,
//           cliente_codigo: data[0].ClienteCodigo,
//           destino: data[0].Destino,
//           detalle: [
//             {
//               variedad: data[0].Variedad,
//               cajas: data[0].Cajas,
//               fecha_cosecha: data[0].FechaCosecha,
//               productor: data[0].Productor,
//               productor_id: data[0].ProductorID,
//             },
//           ],
//         };
//
//         result.push(pallet);
//       } else if (!result.find((pallet) => pallet.numero === numero_pallet)) {
//         const pallet = {
//           numero: data[i].NumeroPallet,
//           cliente: data[i].Cliente,
//           cliente_codigo: data[i].ClienteCodigo,
//           destino: data[i].Destino,
//           detalle: [
//             {
//               variedad: data[i].Variedad,
//               cajas: data[i].Cajas,
//               fecha_cosecha: data[i].FechaCosecha,
//               productor: data[i].Productor,
//               productor_id: data[i].ProductorID,
//             },
//           ],
//         };
//
//         result.push(pallet);
//       } else {
//         for (let pallet of result) {
//           if (pallet.numero === numero_pallet) {
//             pallet.detalle.push({
//               variedad: data[i].Variedad,
//               cajas: data[i].Cajas,
//               fecha_cosecha: data[i].FechaCosecha,
//               productor: data[i].Productor,
//               productor_id: data[i].ProductorID,
//             });
//           }
//         }
//       }
//     }
//
//     console.log('RESULT', result);
//
//     this._palletObservable.next(result);
//   }
//
//   mapView(state: Pallets[]) {
//     // map Entity Data to View Data
//
//     const arr: GroupBy[] = [];
//
//     for (let i = 0; i < state.length; i++) {
//       const palletCliente = state[i].cliente;
//
//       if (arr.length === 0) {
//         const data = {
//           cliente: state[0].cliente,
//           cliente_codigo: state[0].cliente_codigo,
//           destino: state[0].destino,
//           lista: [{ numero: state[0].numero, detalle: state[0].detalle }],
//         };
//
//         arr.push(data);
//       } else if (!arr.find((pallet) => pallet.cliente === palletCliente)) {
//         const data = {
//           cliente: state[i].cliente,
//           cliente_codigo: state[i].cliente_codigo,
//           destino: state[i].destino,
//           lista: [
//             {
//               numero: state[i].numero,
//               detalle: state[i].detalle,
//             },
//           ],
//         };
//         arr.push(data);
//       } else {
//         for (let pallet of arr) {
//           if (pallet.cliente === palletCliente) {
//             pallet.lista.push({
//               numero: state[i].numero,
//               detalle: state[i].detalle,
//             });
//           }
//         }
//       }
//     }
//     console.log(arr);
//     return arr;
//   }
// }
