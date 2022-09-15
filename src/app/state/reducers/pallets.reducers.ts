import { createReducer, on } from '@ngrx/store';
import { PalletsState } from '../../interfaces/pallets-state';
import {
  getCliente,
  getProductor,
  getVariedad,
  newData,
  newFileCsv,
} from '../actions/pallets.action';
import { ClienteState } from '../../interfaces/cliente-state';
import { VariedadState } from '../../interfaces/variedad-state';
import { ProductorState } from '../../interfaces/productor-state';
import { CsvState } from '../../interfaces/csv-state';

export const initialState: PalletsState = {
  pallets: [],
};

export const initialStateCliente: ClienteState = {
  clientes: '',
};

export const initialStateProductor: ProductorState = {
  productores: '',
};

export const initialStateVariedad: VariedadState = {
  variedades: '',
};

export const palletReducer = createReducer(
  initialState,
  on(newData, (state, { pallets }) => {
    return { ...state, pallets };
  })
);

export const clienteReducer = createReducer(
  initialStateCliente,
  on(getCliente, (state, { clientes }) => {
    return { ...state, clientes };
  })
);

export const productorReducer = createReducer(
  initialStateProductor,
  on(getProductor, (state, { productores }) => {
    return { ...state, productores };
  })
);

export const variedadReducer = createReducer(
  initialStateVariedad,
  on(getVariedad, (state, { variedades }) => {
    return { ...state, variedades };
  })
);
