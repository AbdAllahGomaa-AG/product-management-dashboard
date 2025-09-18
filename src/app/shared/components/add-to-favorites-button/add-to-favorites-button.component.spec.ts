import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFavoritesButtonComponent } from './add-to-favorites-button.component';

describe('AddToFavoritesButtonComponent', () => {
  let component: AddToFavoritesButtonComponent;
  let fixture: ComponentFixture<AddToFavoritesButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToFavoritesButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToFavoritesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
