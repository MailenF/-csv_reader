import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { selectedClientes } from '../../state/selectors/pallets.selector';
import { FormControl } from '@angular/forms';
import { getCliente } from '../../state/actions/pallets.action';
import { Cliente } from '../../interfaces/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  clientes$: Observable<Cliente[]> = new Observable();

  clienteFormControl = new FormControl();

  constructor(private store: Store<AppState>) {
    this.clienteFormControl.valueChanges.subscribe((value: string) => {
      return this.store.dispatch(getCliente({ clientes: value }));
    });
  }

  ngOnInit(): void {
    this.clientes$ = this.store.select(selectedClientes);
  }
}
