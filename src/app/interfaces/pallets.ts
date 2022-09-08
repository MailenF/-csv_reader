import { DetallePallets } from './detalle-pallets';

export interface Pallets {
  numero: string;
  cliente: string;
  cliente_codigo: string;
  destino: string;
  detalle: DetallePallets[];
}
