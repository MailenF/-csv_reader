import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { newData, newFileCsv } from '../actions/pallets.action';
import { CSV } from '../../interfaces/CSV';
import { Pallets } from '../../interfaces/pallets';

@Injectable()
export class dataEffects {
  loadNewCsvData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newFileCsv),
      map((action) => newData({ pallets: this.mapNewData(action.data) }))
    )
  );

  constructor(private actions$: Actions) {}

  mapNewData(data: CSV[]): Pallets[] {
    console.log(data);
    const result: Pallets[] = [];

    for (let i = 0; i < data.length; i++) {
      const numero_pallet = data[i].NumeroPallet;

      if (result.length === 0) {
        const pallet = {
          numero: data[0].NumeroPallet,
          cliente: data[0].Cliente,
          cliente_codigo: data[0].ClienteCodigo,
          destino: data[0].Destino,
          detalle: [
            {
              variedad: data[0].Variedad,
              cajas: data[0].Cajas,
              fecha_cosecha: data[0].FechaCosecha,
              productor: data[0].Productor,
              productor_id: data[0].ProductorID,
            },
          ],
        };

        result.push(pallet);
      } else if (!result.find((pallet) => pallet.numero === numero_pallet)) {
        const pallet = {
          numero: data[i].NumeroPallet,
          cliente: data[i].Cliente,
          cliente_codigo: data[i].ClienteCodigo,
          destino: data[i].Destino,
          detalle: [
            {
              variedad: data[i].Variedad,
              cajas: data[i].Cajas,
              fecha_cosecha: data[i].FechaCosecha,
              productor: data[i].Productor,
              productor_id: data[i].ProductorID,
            },
          ],
        };

        result.push(pallet);
      } else {
        for (let pallet of result) {
          if (pallet.numero === numero_pallet) {
            pallet.detalle.push({
              variedad: data[i].Variedad,
              cajas: data[i].Cajas,
              fecha_cosecha: data[i].FechaCosecha,
              productor: data[i].Productor,
              productor_id: data[i].ProductorID,
            });
          }
        }
      }
    }
    return result;
  }
}
