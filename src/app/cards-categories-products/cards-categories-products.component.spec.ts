import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsCategoriesProductsComponent } from './cards-categories-products.component';

describe('CardsCategoriesProductsComponent', () => {
  let component: CardsCategoriesProductsComponent;
  let fixture: ComponentFixture<CardsCategoriesProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsCategoriesProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsCategoriesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
