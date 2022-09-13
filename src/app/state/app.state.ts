import { PalletsState } from '../interfaces/pallets-state';
import { ActionReducerMap } from '@ngrx/store';
import {
  clienteReducer,
  csvReducer,
  palletReducer,
  productorReducer,
  variedadReducer,
} from './reducers/pallets.reducers';
import { ClienteState } from '../interfaces/cliente-state';
import { VariedadState } from '../interfaces/variedad-state';
import { ProductorState } from '../interfaces/productor-state';
import { CsvState } from '../interfaces/csv-state';

export interface AppState {
  pallets: PalletsState;
  data: CsvState;
  clientes: ClienteState;
  productores: ProductorState;
  variedades: VariedadState;
}
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  pallets: palletReducer,
  data: csvReducer,
  clientes: clienteReducer,
  productores: productorReducer,
  variedades: variedadReducer,
};
