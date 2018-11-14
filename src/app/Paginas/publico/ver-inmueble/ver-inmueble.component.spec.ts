import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInmuebleComponent } from './ver-inmueble.component';
import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
  HttpModule
} from '@angular/http';
import { Inmueble } from '../../../Modelo/Inmueble';
import { GenericoService } from '../../../Servicios/genericoServ.service';
import { HttpClientModule } from '@angular/common/http';

fdescribe('VerInmuebleComponent', () => {
  // inmueble a ver
  let inmueble = new Inmueble();
  /**
   * Se ejecuta antes de cada it
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      // el servicio a usar
      providers: [ GenericoService],
      // Importamos el http para poder consumir los servicios
      imports: [ HttpClientModule ],
      // Se declara el componente, para poder ver el reporte en el coverage
      declarations: [ VerInmuebleComponent ]
    });
  });

  /**
   * Buscar el inmueble cuando este ya existe
   */
  it('buscar inmueble cuando existe', () => {
    // Usamos TestBed para poder usar el servicio http
    const servicio: GenericoService = TestBed.get(GenericoService);
    // Setteamos el id del inmueble a buscar, ya debe existir un inmueble con id 4
    inmueble.id = 4;
    // Usamos el servicio para buscar el inmueble
    servicio.buscar("inmueble", {"id":inmueble.id}).subscribe(rta => {
      // Validamos si la respuesta si concuerda con la esparada      
      expect(rta.data.length).toEqual(1);
    });
  });
});
