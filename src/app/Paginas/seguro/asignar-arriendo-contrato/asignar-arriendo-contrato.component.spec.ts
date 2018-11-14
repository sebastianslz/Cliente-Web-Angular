import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarArriendoContratoComponent } from './asignar-arriendo-contrato.component';

describe('AsignarArriendoContratoComponent', () => {
  let component: AsignarArriendoContratoComponent;
  let fixture: ComponentFixture<AsignarArriendoContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarArriendoContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarArriendoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
