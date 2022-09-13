import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductorFilterComponent } from './table-productor-filter.component';

describe('TableProductorFilterComponent', () => {
  let component: TableProductorFilterComponent;
  let fixture: ComponentFixture<TableProductorFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableProductorFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableProductorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
