import { Component, OnInit } from '@angular/core';
import { GenericoService } from '../../../Servicios/genericoServ.service';
import { Inmueble } from '../../../Modelo/Inmueble';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  /**
   * Listado de inmuebles
   */
  inmuebles: Array<Inmueble> = [];
  /**
   * imagenes de los inmuebles
   */
  fotos: Array<{}> = [];
  // Inmueble
  inmueble: Inmueble = new Inmueble();
  // parametros de busqueda

  constructor(private genericoServicio: GenericoService) {}

  ngOnInit() {
    // validamos si hay parametros para filtrar
    var objeto = this.genericoServicio.getUrlParameter("objeto");
    if(objeto != undefined && objeto != '' && objeto != null && objeto != "{}"){
      // Cargamos el resultado de inmuebles teniendo en cuenta los parametros en el objeto
      this.listarByParametros(objeto);
    }else{
      // Como no hay parametros de busqueda, cargamos todos los inmuebles
      // listamos los inmuebles
      this.listarInmuebles();
    }
  }

  /**
   * Carga la lista de inmuebles disponibles (estado 1 = publicado)
   */
  listarInmuebles(){
    // Obtenemos la lista de inmuebles
    this.genericoServicio.listar("inmueble",{"estado":1}).subscribe(r => {
      if(r.data != null){
        this.inmuebles = r.data;
        // Agregamos los datos (objetos) adicionales a cada inmueble
        this.agregarObjetos(this.inmuebles);
      }
    });
  }

    /**
   * Carga la lista de inmuebles disponibles (estado 1 = publicado)
   */
  listarByParametros(objeto){
    // convertimos el texto a objeto json
    var json = JSON.parse(objeto);
    // Obtenemos la lista de inmuebles
    this.genericoServicio.listar("inmueble",json).subscribe(r => {
      if(r.data != null){
        this.inmuebles = r.data;
        // Agregamos los datos (objetos) adicionales a cada inmueble
        this.agregarObjetos(this.inmuebles);
      }
    });
  }

  /**
   * Agrega objetos a los inmuebles
   * @param lista 
   */
  agregarObjetos(lista){
    for(let i of lista){
      // Obtenemos el tipo de inmueble
      this.genericoServicio.buscar("tipo_inmueble",{"id":i.tipo}).subscribe(r2 => {
        // Setteamos el tipo inmueble
        i.tipo = r2.data;
        // Obtenemos la ciudad
        this.genericoServicio.buscar("ciudades",{"id":i.ciudad}).subscribe(r3 => {
          // Setteamos la ciudad
          i.ciudad = r3.data;
          // Obtenemos el departamento
          this.genericoServicio.buscar("departamentos",{"id":i.ciudad.departamento}).subscribe(r4 => {
            // Setteamos el departamento
            i.ciudad.departamento = r4.data;
            // Obtenemos una sola foto del inmueble
            this.genericoServicio.buscar("archivo_inmueble",{"inmueble":i.id}).subscribe(r5 => {
              // Guardamos el nombre de la foto en el array de fotos,
              // asignando como clave el id del inmueble
              this.fotos[i.id] = r5.data.nombre;
            });
          });
        });
      });
    }
  }

  /**
   * Obtiene la zona apartir del numero de zona asignado en el inmueble
   */
  getZona(indice:number){
    return this.inmueble.getZona(indice);
  }

  /**
   * Obtiene el tipo de inmueble (Arriendo o Venta)
   */
  getTipoAV(indice:number){
    return this.inmueble.getTipoAV(indice);
  }

  /**
   * Agrega comas a un valor numerico
   * @param valor 
   */
  addComa(valor:number){
    return this.inmueble.addComa(valor);
  }

}
