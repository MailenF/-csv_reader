import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../interfaces/cliente';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { selectedProductores } from '../../state/selectors/pallets.selector';
import { FormControl } from '@angular/forms';
import { getCliente, getProductor } from '../../state/actions/pallets.action';
import { ProductorState } from '../../interfaces/productor-state';
import { Productores } from '../../interfaces/productores';

@Component({
  selector: 'app-productor',
  templateUrl: './productor.component.html',
  styleUrls: ['./productor.component.css'],
})
export class ProductorComponent implements OnInit {
  productores$: Observable<Productores[]> = new Observable();

  productorFormControl = new FormControl();

  constructor(private store: Store<AppState>) {
    this.productorFormControl.valueChanges.subscribe((value: string) => {
      return this.store.dispatch(getProductor({ productores: value }));
    });
  }

  ngOnInit(): void {
    this.productores$ = this.store.select(selectedProductores);
  }
}
