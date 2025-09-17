import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetailsComponentComponent } from './products-details-component.component';

describe('ProductsDetailsComponentComponent', () => {
  let component: ProductsDetailsComponentComponent;
  let fixture: ComponentFixture<ProductsDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsDetailsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
