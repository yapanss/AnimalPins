import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinDetailComponent } from './pin-detail.component';

describe('PinDetailComponent', () => {
  let component: PinDetailComponent;
  let fixture: ComponentFixture<PinDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
