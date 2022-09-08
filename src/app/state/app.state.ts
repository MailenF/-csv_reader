import { PalletsState } from '../interfaces/pallets-state';
import { ActionReducerMap } from '@ngrx/store';
import {
  clienteReducer,
  palletReducer,
  variedadReducer,
} from './reducers/pallets.reducers';
import { ClienteState } from '../interfaces/cliente-state';
import { VariedadState } from '../interfaces/variedad-state';

export interface AppState {
  pallets: PalletsState;
  clientes: ClienteState;
  variedades: VariedadState;
}
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  pallets: palletReducer,
  clientes: clienteReducer,
  variedades: variedadReducer,
};
