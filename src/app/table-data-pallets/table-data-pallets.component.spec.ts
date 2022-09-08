import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataPalletsComponent } from './table-data-pallets.component';

describe('TableDataPalletsComponent', () => {
  let component: TableDataPalletsComponent;
  let fixture: ComponentFixture<TableDataPalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDataPalletsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDataPalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
