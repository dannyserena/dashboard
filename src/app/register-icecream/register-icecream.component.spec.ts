import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterIcecreamComponent } from './register-icecream.component';

describe('RegisterIcecreamComponent', () => {
  let component: RegisterIcecreamComponent;
  let fixture: ComponentFixture<RegisterIcecreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterIcecreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterIcecreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
