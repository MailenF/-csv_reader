import { Component, OnInit } from '@angular/core';
import { selectClientes } from '../state/selectors/pallets.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { GroupBy } from '../interfaces/group-by';

@Component({
  selector: 'app-table-cliente-filter',
  templateUrl: './table-cliente-filter.component.html',
  styleUrls: ['./table-cliente-filter.component.css'],
})
export class TableClienteFilterComponent implements OnInit {
  clienteLista$: Observable<GroupBy[]> = new Observable();
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.clienteLista$ = this.store.select(selectClientes);
  }
}
