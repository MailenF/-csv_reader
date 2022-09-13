import { createAction, props } from '@ngrx/store';
import { Pallets } from '../../interfaces/pallets';
import { CSV } from '../../interfaces/CSV';

export const newFileCsv = createAction(
  '[New Csv] file csv',
  props<{ data: CSV[] }>()
);

export const newData = createAction(
  '[New Data] new data',
  props<{ pallets: Pallets[] }>()
);

export const getCliente = createAction(
  '[Get Cliente] get cliente',
  props<{ clientes: string }>()
);

export const getProductor = createAction(
  '[Get Productor] get productor',
  props<{ productores: string }>()
);

export const getVariedad = createAction(
  '[Get Variedad] get variedad',
  props<{ variedades: string }>()
);
