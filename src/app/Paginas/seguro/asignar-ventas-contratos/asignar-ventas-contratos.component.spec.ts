import { Contrato } from './../../../Modelo/Contrato';
import { GenericoService } from './../../../Servicios/genericoServ.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarVentasContratosComponent } from './asignar-ventas-contratos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AsignarVentasContratosComponent', () => {
  let component: AsignarVentasContratosComponent;
  let fixture: ComponentFixture<AsignarVentasContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [GenericoService],
      // Importamos el http para poder consumir los servicios
      imports: [HttpClientModule, FormsModule, RouterTestingModule],
      declarations: [ AsignarVentasContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarVentasContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('buscar un contrato', () => {
    // persona asociada al usuario
    // tslint:disable-next-line:prefer-const
    let contrato: Contrato = new Contrato();
    contrato.id = 2 ;
    component.contrato.id = 2;
    const buscarSi = component.buscarContrato();
    // tslint:disable-next-line:no-unused-expression
    expect(buscarSi).toBeTruthy;
  });
});
