import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupBy } from '../interfaces/group-by';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { getProductor } from '../state/actions/pallets.action';
import { selectProductores } from '../state/selectors/pallets.selector';
import { ProductorState } from '../interfaces/productor-state';
import { Productores } from '../interfaces/productores';
import { Productor } from '../interfaces/productor';

@Component({
  selector: 'app-table-productor-filter',
  templateUrl: './table-productor-filter.component.html',
  styleUrls: ['./table-productor-filter.component.css'],
})
export class TableProductorFilterComponent implements OnInit {
  productoresList$: Observable<Productor[]> = new Observable();
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.productoresList$ = this.store.select(selectProductores);
  }
}
