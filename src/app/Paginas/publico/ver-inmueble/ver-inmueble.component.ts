import { Component, OnInit } from '@angular/core';
import { GenericoService } from '../../../Servicios/genericoServ.service';
import { Inmueble } from '../../../Modelo/Inmueble';
import { UsuarioService } from '../../../Servicios/usuarioServ.service';
import { Archivo } from '../../../Modelo/Archivo';

@Component({
  selector: 'app-ver-inmueble',
  templateUrl: './ver-inmueble.component.html',
  styleUrls: ['./ver-inmueble.component.css']
})
export class VerInmuebleComponent implements OnInit {

  // El inmueble que se mostrara
  inmueble: Inmueble = new Inmueble();
  inmueble2: Inmueble = new Inmueble();

  // Imagenes del inmueble
  fotos: Array<Archivo> = [];
  // Año actual
  anio = new Date().getFullYear();

  constructor(private genericoServicio: GenericoService, private usuarioServicio: UsuarioService) { }

  ngOnInit() {
    // Obtenemos el id del inmueble, que se paso por get (url)
    const id = this.genericoServicio.getUrlParameter('id');
    if (id === undefined || id === '') {
      // Como el id no esta, redireccionamos al inicio
      this.usuarioServicio.redireccionar('/');
    } else {
      // Cargamos el inmueble
      this.inmueble.id = id;
      this.cargarInmueble();

    }
  }

  /**
   * Busca el inmueble y carga la informacion
   */
  cargarInmueble() {
    this.genericoServicio.buscar('inmueble', {'id': this.inmueble.id, 'estado': 1}).subscribe(rta => {
      if (rta.data != null) {
        this.inmueble = rta.data;
        // Obtenemos el tipo de inmueble
        this.genericoServicio.buscar('tipo_inmueble', {'id': this.inmueble.tipo}).subscribe(r2 => {
          // Setteamos el tipo inmueble
          this.inmueble.tipo = r2.data;
          // Obtenemos la ciudad
          this.genericoServicio.buscar('ciudades', {'id': this.inmueble.ciudad}).subscribe(r3 => {
            // Setteamos la ciudad
            this.inmueble.ciudad = r3.data;
            // Obtenemos el departamento
            this.genericoServicio.buscar('departamentos', {'id': this.inmueble.ciudad.departamento}).subscribe(r4 => {
              // Setteamos el departamento
              this.inmueble.ciudad.departamento = r4.data;
              // Obtenemos las fotos del inmueble
              this.genericoServicio.listar('archivo_inmueble', {'inmueble': this.inmueble.id}).subscribe(r5 => {
                // Guardamos el nombre de la foto en el array de fotos,
                // asignando como clave el id del inmueble
                this.fotos = r5.data;
            });
          });
        });
      });
      } else {
        // Como el inmueble no se encontro, redireccionamos el usuario al inicio
        this.usuarioServicio.redireccionar('/');
      }
    });
  }

  /**
   * Obtiene la zona apartir del numero de zona asignado en el inmueble
   */
  getZona(indice: number) {
    return this.inmueble2.getZona(indice);
  }

  /**
   * Obtiene el tipo de inmueble (Arriendo o Venta)
   */
  getTipoAV(indice: number) {
    return this.inmueble2.getTipoAV(indice);
  }

  /**
   * Agrega comas a un valor numerico
   * @param valor
   */
  addComa(valor: number) {
    return this.inmueble2.addComa(valor);
  }

  /**
   * Apartir de un booleano nos devuelve si, si o no
   */
  siNo(boolean) {
    if (boolean === 1) {
      return 'Si';
    } else {
      return 'No';
    }
  }

}
