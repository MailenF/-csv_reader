import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupBy } from '../interfaces/group-by';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import {
  selectClientes,
  selectVariedades,
} from '../state/selectors/pallets.selector';

@Component({
  selector: 'app-table-variedad-filter',
  templateUrl: './table-variedad-filter.component.html',
  styleUrls: ['./table-variedad-filter.component.css'],
})
export class TableVariedadFilterComponent implements OnInit {
  variedadLista$: Observable<any> = new Observable();
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.variedadLista$ = this.store.select(selectVariedades);
  }
}
