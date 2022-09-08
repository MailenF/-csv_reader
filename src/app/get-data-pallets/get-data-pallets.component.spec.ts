import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDataPalletsComponent } from './get-data-pallets.component';

describe('GetDataPalletsComponent', () => {
  let component: GetDataPalletsComponent;
  let fixture: ComponentFixture<GetDataPalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetDataPalletsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDataPalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
