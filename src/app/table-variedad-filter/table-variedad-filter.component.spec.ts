import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVariedadFilterComponent } from './table-variedad-filter.component';

describe('TableVariedadFilterComponent', () => {
  let component: TableVariedadFilterComponent;
  let fixture: ComponentFixture<TableVariedadFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableVariedadFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableVariedadFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
