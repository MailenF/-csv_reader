import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PalletsState } from '../../interfaces/pallets-state';
import { GroupBy } from '../../interfaces/group-by';
import { Cliente } from '../../interfaces/cliente';
import { ClienteState } from '../../interfaces/cliente-state';
import * as _ from 'lodash';
import { VariedadState } from '../../interfaces/variedad-state';
import { Variedad } from '../../interfaces/variedad';

export const selectPalletsFeature = (state: AppState) => state.pallets;
export const selectClientesFeature = (state: AppState) => state.clientes;
export const selectedVariedadesFeature = (state: AppState) => state.variedades;

export const selectPallets = createSelector(
  selectPalletsFeature,
  (state: PalletsState) => {
    const arr: GroupBy[] = [];

    for (let i = 0; i < state.pallets.length; i++) {
      const palletCliente = state.pallets[i].cliente;

      if (arr.length === 0) {
        const data = {
          cliente: state.pallets[0].cliente,
          cliente_codigo: state.pallets[0].cliente_codigo,
          destino: state.pallets[0].destino,
          lista: [
            {
              numero: state.pallets[0].numero,
              detalle: state.pallets[0].detalle,
            },
          ],
        };

        arr.push(data);
      } else if (!arr.find((pallet) => pallet.cliente === palletCliente)) {
        const data = {
          cliente: state.pallets[i].cliente,
          cliente_codigo: state.pallets[i].cliente_codigo,
          destino: state.pallets[i].destino,
          lista: [
            {
              numero: state.pallets[i].numero,
              detalle: state.pallets[i].detalle,
            },
          ],
        };
        arr.push(data);
      } else {
        for (let pallet of arr) {
          if (pallet.cliente === palletCliente) {
            pallet.lista.push({
              numero: state.pallets[i].numero,
              detalle: state.pallets[i].detalle,
            });
          }
        }
      }
    }
    return arr;
  }
);

//---------------------------------------------------------------------------------

export const selectClientes = createSelector(
  selectPalletsFeature,
  selectClientesFeature,
  (state: PalletsState, clientes: ClienteState) => {
    const arrClientes: GroupBy[] = [];

    for (let i = 0; i < clientes.clientes.length; i++) {
      for (let h = 0; h < state.pallets.length; h++) {
        if (
          clientes.clientes[i] === state.pallets[h].cliente_codigo &&
          !arrClientes.find(
            (pallet) => pallet.cliente_codigo === clientes.clientes[i]
          )
        ) {
          const data = {
            cliente: state.pallets[h].cliente,
            cliente_codigo: state.pallets[h].cliente_codigo,
            destino: state.pallets[h].destino,
            lista: [
              {
                numero: state.pallets[h].numero,
                detalle: state.pallets[h].detalle,
              },
            ],
          };
          arrClientes.push(data);
        } else if (
          clientes.clientes[i] === state.pallets[h].cliente_codigo &&
          arrClientes.find((pallet) =>
            pallet.lista.map((value) => {
              value.numero !== state.pallets[h].numero;
            })
          )
        ) {
          for (let pallet of arrClientes) {
            if (pallet.cliente_codigo === clientes.clientes[i]) {
              pallet.lista.push({
                numero: state.pallets[h].numero,
                detalle: state.pallets[h].detalle,
              });
            }
          }
        }
      }
    }
    return arrClientes;
  }
);

//---------------------------------------------------------------------------------

export const selectVariedades = createSelector(
  selectPalletsFeature,
  selectedVariedadesFeature,
  (state: PalletsState, variedades: VariedadState) => {
    const valuesPallet: any[] = [];
    const variedad: Variedad[] = [];

    for (let i = 0; i < state.pallets.length; i++) {
      state.pallets[i].detalle.map((values) => {
        const result = {
          numero: state.pallets[i].numero,
          cliente: state.pallets[i].cliente,
          cliente_codigo: state.pallets[i].cliente_codigo,
          destino: state.pallets[i].destino,
          cajas: values.cajas,
          fecha_cosecha: values.fecha_cosecha,
          productor: values.productor,
          productor_id: values.productor_id,
          variedad: values.variedad,
        };
        valuesPallet.push(result);
      });
    }

    for (let i = 0; i < variedades.variedades.length; i++) {
      for (let h = 0; h < valuesPallet.length; h++) {
        if (
          variedades.variedades[i] === valuesPallet[h].variedad &&
          !variedad.find(
            (values) => values.variedad === variedades.variedades[i]
          )
        ) {
          const result = {
            variedad: variedades.variedades[i],
            lista: [
              {
                numero: valuesPallet[h].numero,
                cliente: valuesPallet[h].cliente,
                cliente_codigo: valuesPallet[h].cliente_codigo,
                destino: valuesPallet[h].destino,
                cajas: valuesPallet[h].cajas,
                fecha_cosecha: valuesPallet[h].fecha_cosecha,
                productor: valuesPallet[h].productor,
                productor_id: valuesPallet[h].productor_id,
              },
            ],
          };
          variedad.push(result);
        } else if (
          variedades.variedades[i] === valuesPallet[h].variedad &&
          variedad.find(
            (values) => values.variedad === variedades.variedades[i]
          )
        ) {
          for (let value of variedad) {
            if (value.variedad === variedades.variedades[i]) {
              value.lista.push({
                numero: valuesPallet[h].numero,
                cliente: valuesPallet[h].cliente,
                cliente_codigo: valuesPallet[h].cliente_codigo,
                destino: valuesPallet[h].destino,
                cajas: valuesPallet[h].cajas,
                fecha_cosecha: valuesPallet[h].fecha_cosecha,
                productor: valuesPallet[h].productor,
                productor_id: valuesPallet[h].productor_id,
              });
            }
          }
        }
      }
    }
    return variedad;
  }
);

//---------------------------------------------------------------------------------

export const selectedClientes = createSelector(
  selectPalletsFeature,
  (state: PalletsState) => {
    const clientes: Cliente[] = [];

    for (let i = 0; i < state.pallets.length; i++) {
      if (clientes.length === 0) {
        const cliente = {
          cliente: state.pallets[0].cliente,
          id: state.pallets[0].cliente_codigo,
        };
        clientes.push(cliente);
      } else if (
        !clientes.find(
          (value) =>
            value.cliente === state.pallets[i].cliente &&
            value.id === state.pallets[i].cliente_codigo
        )
      ) {
        const cliente = {
          cliente: state.pallets[i].cliente,
          id: state.pallets[i].cliente_codigo,
        };
        clientes.push(cliente);
      } else if (
        clientes.find(
          (value) =>
            value.cliente === state.pallets[i].cliente &&
            value.id !== state.pallets[i].cliente_codigo
        )
      ) {
        const cliente = {
          cliente: state.pallets[i].cliente,
          id: state.pallets[i].cliente_codigo,
        };
        clientes.push(cliente);
      }
    }
    return clientes;
  }
);

//---------------------------------------------------------------------------------

export const selectedVariedad = createSelector(
  selectPalletsFeature,
  (state) => {
    const arr: string[] = [];

    for (let i = 0; i < state.pallets.length; i++) {
      state.pallets[i].detalle.map((value) => {
        arr.push(value.variedad);
      });
    }
    const variedad = _.uniq(arr);
    return variedad;
  }
);
