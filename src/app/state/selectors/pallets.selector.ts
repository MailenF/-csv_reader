import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PalletsState } from '../../interfaces/pallets-state';
import { GroupBy } from '../../interfaces/group-by';
import { Cliente } from '../../interfaces/cliente';
import { ClienteState } from '../../interfaces/cliente-state';
import * as _ from 'lodash';
import { VariedadState } from '../../interfaces/variedad-state';
import { Variedad } from '../../interfaces/variedad';
import { Productores } from '../../interfaces/productores';
import { ProductorState } from '../../interfaces/productor-state';
import { Productor } from '../../interfaces/productor';
import { resolve } from '@angular/compiler-cli';

export const selectPalletsFeature = (state: AppState) => state.pallets;
export const selectClientesFeature = (state: AppState) => state.clientes;
export const selectProductoresFeature = (state: AppState) => state.productores;
export const selectedVariedadesFeature = (state: AppState) => state.variedades;

//------------------------INFORMACION TABLA PRINCIPAL--------------------------------

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

//------------------------INFORMACION TABLA CLIENTES--------------------------------

export const selectClientes = createSelector(
  selectPalletsFeature,
  selectClientesFeature,
  (state: PalletsState, clientes: ClienteState) => {
    const arrClientes: GroupBy[] = [];

    for (let i = 0; i < clientes.clientes.length; i++) {
      console.log(clientes.clientes[i]);
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

//------------------------INFORMACION TABLA PRODUCTORES-----------------------------

export const selectProductores = createSelector(
  selectPalletsFeature,
  selectProductoresFeature,
  (state: PalletsState, productores: ProductorState) => {
    const valuesPallet: any[] = [];
    const productor: Productor[] = [];

    for (let h = 0; h < productores.productores.length; h++) {
      for (let i = 0; i < state.pallets.length; i++) {
        for (let k = 0; k < state.pallets[i].detalle.length; k++) {
          if (
            productores.productores[h] ===
              state.pallets[i].detalle[k].productor_id &&
            !productor.find(
              (values) => values.productor_id === productores.productores[h]
            )
          ) {
            const data = {
              productor: state.pallets[i].detalle[k].productor,
              productor_id: productores.productores[h],
              lista: [
                {
                  numero: state.pallets[i].numero,
                  cliente: state.pallets[i].cliente,
                  cliente_codigo: state.pallets[i].cliente_codigo,
                  destino: state.pallets[i].destino,
                  cajas: state.pallets[i].detalle[k].cajas,
                  fecha_cosecha: state.pallets[i].detalle[k].fecha_cosecha,
                  variedad: state.pallets[i].detalle[k].variedad,
                },
              ],
            };
            productor.push(data);
          } else if (
            productores.productores[h] ===
              state.pallets[i].detalle[k].productor_id &&
            productor.find(
              (values) => values.productor_id === productores.productores[h]
            )
          ) {
            for (let value of productor) {
              if (value.productor_id === productores.productores[h]) {
                value.lista.push({
                  numero: state.pallets[i].numero,
                  cliente: state.pallets[i].cliente,
                  cliente_codigo: state.pallets[i].cliente_codigo,
                  destino: state.pallets[i].destino,
                  cajas: state.pallets[i].detalle[k].cajas,
                  fecha_cosecha: state.pallets[i].detalle[k].fecha_cosecha,
                  variedad: state.pallets[i].detalle[k].variedad,
                });
              }
            }
          }
        }
      }
    }
    return productor;
  }
);

//------------------------INFORMACION TABLA VARIEDAD--------------------------------

export const selectVariedades = createSelector(
  selectPalletsFeature,
  selectedVariedadesFeature,
  (state: PalletsState, variedades: VariedadState) => {
    const variedad: Variedad[] = [];

    for (let h = 0; h < variedades.variedades.length; h++) {
      for (let i = 0; i < state.pallets.length; i++) {
        for (let k = 0; k < state.pallets[i].detalle.length; k++) {
          if (
            variedades.variedades[h] === state.pallets[i].detalle[k].variedad &&
            !variedad.find(
              (values) => values.variedad === variedades.variedades[h]
            )
          ) {
            const result = {
              variedad: variedades.variedades[h],
              lista: [
                {
                  numero: state.pallets[i].numero,
                  cliente: state.pallets[i].cliente,
                  cliente_codigo: state.pallets[i].cliente_codigo,
                  destino: state.pallets[i].destino,
                  cajas: state.pallets[i].detalle[k].cajas,
                  fecha_cosecha: state.pallets[i].detalle[k].fecha_cosecha,
                  productor: state.pallets[i].detalle[k].productor,
                  productor_id: state.pallets[i].detalle[k].productor_id,
                },
              ],
            };

            variedad.push(result);
          } else if (
            variedades.variedades[h] === state.pallets[i].detalle[k].variedad &&
            variedad.find(
              (values) => values.variedad === variedades.variedades[h]
            )
          ) {
            for (let value of variedad) {
              if (value.variedad === variedades.variedades[h]) {
                value.lista.push({
                  numero: state.pallets[i].numero,
                  cliente: state.pallets[i].cliente,
                  cliente_codigo: state.pallets[i].cliente_codigo,
                  destino: state.pallets[i].destino,
                  cajas: state.pallets[i].detalle[k].cajas,
                  fecha_cosecha: state.pallets[i].detalle[k].fecha_cosecha,
                  productor: state.pallets[i].detalle[k].productor,
                  productor_id: state.pallets[i].detalle[k].productor_id,
                });
              }
            }
          }
        }
      }
    }
    console.log(variedad);
    return variedad;
  }
);

//----------------------SELECCIONAR LOS CLIENTES PARA EL FILTER--------------------------------

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

//----------------------SELECCIONAR LOS PRODUCTORES PARA EL FILTER---------------------------------

export const selectedProductores = createSelector(
  selectPalletsFeature,
  (state: PalletsState) => {
    const productores: Productores[] = [];

    for (let i = 0; i < state.pallets.length; i++) {
      for (let k = 0; k < state.pallets[i].detalle.length; k++) {
        if (productores.length === 0) {
          const productor = {
            productor: state.pallets[0].detalle[0].productor,
            id: state.pallets[0].detalle[0].productor_id,
          };
          productores.push(productor);
        } else if (
          !productores.find(
            (value) => value.id === state.pallets[i].detalle[k].productor_id
          )
        ) {
          const productor = {
            productor: state.pallets[i].detalle[k].productor,
            id: state.pallets[i].detalle[k].productor_id,
          };
          productores.push(productor);
        }
      }
    }
    return productores;
  }
);

//----------------------SELECCIONAR LAS VARIEDADES PARA EL FILTER--------------------------

export const selectedVariedad = createSelector(
  selectPalletsFeature,
  (state) => {
    const arr: VariedadState[] = [];

    for (let i = 0; i < state.pallets.length; i++) {
      state.pallets[i].detalle.map((values) => {
        if (!arr.find((value) => value.variedades === values.variedad)) {
          const result = {
            variedades: values.variedad,
          };
          arr.push(result);
        }
      });
    }
    return arr;
  }
);
