import { PalletsState } from '../interfaces/pallets-state';
import { ActionReducerMap } from '@ngrx/store';
import {
  clienteReducer,
  palletReducer,
  productorReducer,
  variedadReducer,
} from './reducers/pallets.reducers';
import { ClienteState } from '../interfaces/cliente-state';
import { VariedadState } from '../interfaces/variedad-state';
import { ProductorState } from '../interfaces/productor-state';

export interface AppState {
  pallets: PalletsState;
  clientes: ClienteState;
  productores: ProductorState;
  variedades: VariedadState;
}
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  pallets: palletReducer,
  clientes: clienteReducer,
  productores: productorReducer,
  variedades: variedadReducer,
};
