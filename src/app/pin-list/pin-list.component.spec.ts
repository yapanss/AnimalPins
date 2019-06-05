import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinListComponent } from './pin-list.component';

describe('PinListComponent', () => {
  let component: PinListComponent;
  let fixture: ComponentFixture<PinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
