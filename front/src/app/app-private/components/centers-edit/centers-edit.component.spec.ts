import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentersEditComponent } from './centers-edit.component';

describe('CentersEditComponent', () => {
  let component: CentersEditComponent;
  let fixture: ComponentFixture<CentersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentersEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
