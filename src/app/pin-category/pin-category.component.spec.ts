import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCategoryComponent } from './pin-category.component';

describe('PinCategoryComponent', () => {
  let component: PinCategoryComponent;
  let fixture: ComponentFixture<PinCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
