import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRechercheComponent } from './input-recherche.component';

describe('InputRechercheComponent', () => {
  let component: InputRechercheComponent;
  let fixture: ComponentFixture<InputRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRechercheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
