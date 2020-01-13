import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProduitsComponent } from './card-produits.component';

describe('CardProduitsComponent', () => {
  let component: CardProduitsComponent;
  let fixture: ComponentFixture<CardProduitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProduitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
