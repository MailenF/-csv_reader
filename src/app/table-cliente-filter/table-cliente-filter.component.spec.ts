import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableClienteFilterComponent } from './table-cliente-filter.component';

describe('TableClienteFilterComponent', () => {
  let component: TableClienteFilterComponent;
  let fixture: ComponentFixture<TableClienteFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableClienteFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableClienteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
