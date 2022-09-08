import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPallets } from '../state/selectors/pallets.selector';
import { AppState } from '../state/app.state';
import { GroupBy } from '../interfaces/group-by';

@Component({
  selector: 'app-table-data-pallets',
  templateUrl: './table-data-pallets.component.html',
  styleUrls: ['./table-data-pallets.component.css'],
})
export class TableDataPalletsComponent implements OnInit {
  list$: Observable<GroupBy[]> = new Observable();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.list$ = this.store.select(selectPallets);
  }
}
