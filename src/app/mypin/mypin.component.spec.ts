import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypinComponent } from './mypin.component';

describe('MypinComponent', () => {
  let component: MypinComponent;
  let fixture: ComponentFixture<MypinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
