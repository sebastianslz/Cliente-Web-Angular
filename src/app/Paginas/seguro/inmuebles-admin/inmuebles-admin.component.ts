import { AuxiliarObjeto } from 'src/app/Modelo/AuxiliarObjeto';
import { Promocion } from 'src/app/Modelo/Promocion';
import { InmuebleTemporal } from './../../../Modelo/InmuebleTemporal';
import { Persona } from './../../../Modelo/Persona';
import { Zona } from './../../../Modelo/Zona';
import { Departamento } from './../../../Modelo/Departamento';
import { Usuario } from './../../../Modelo/Usuario';
import { Inmueble } from './../../../Modelo/Inmueble';
import { VentaArriendo } from './../../../Modelo/VentaArriendo';
import { NgForm } from '@angular/forms';
import { TipoInmueble } from './../../../Modelo/TipoInmueble';
import { Ciudad } from './../../../Modelo/Ciudad';
import { GenericoService } from './../../../Servicios/genericoServ.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../Servicios/usuarioServ.service';
import { Archivo } from '../../../Modelo/Archivo';

@Component({
  selector: 'app-inmuebles-admin',
  templateUrl: './inmuebles-admin.component.html',
  styleUrls: ['./inmuebles-admin.component.css']
})
export class InmueblesAdminComponent implements OnInit {

  file: File[] = null;
  img;
  labelFile: string;
  latSeleccion = 4.540130;
  longSeleccion = -75.665193;
  locationSelec = false;
  selectedEditar = false;
  verInmueble = false;
  zoom = 6;
  zoomMapaLista = 10;
  latSelectedLista = 0;
  longSelectedLista = 0;

  inmueble: Inmueble;
  promocionSelected: Promocion = new Promocion();
  ciudadSeleccionada: Ciudad = new Ciudad();
  tipoInmuebleSeleccionado: TipoInmueble = new TipoInmueble();
  zonaSeleccionada: Zona = new Zona;
  tipoAVSeleccionado: VentaArriendo = new VentaArriendo;
  usuarioCliente: Usuario = new Usuario();
  usuarioEmpleado: Usuario = new Usuario();
  persona: Persona = new Persona();
  usuarioListar: Usuario = new Usuario();
  departamentoSeleccionado: Departamento = new Departamento();
  usuarioSesion: Usuario = new Usuario();
  ciudadBusqueda: Ciudad = new Ciudad();
  inmuebleArchivo: Inmueble = new Inmueble();
  inmuebleTemporal: InmuebleTemporal;

  // variables Checkbox
  theCheckboxAsensor = false;
  theCheckboxCanchasDepor = false;
  theCheckboxZonasHumedas = false;
  theCheckboxZonaInfantil = false;
  theCheckboxJardines = false;
  theCheckboxTransporteCercano = false;
  theCheckboxPrecioNegociable = false;
  theCheckboxZonasRopas = false;
  theCheckboxParqueadero = false;
  theCheckboxDeposito = false;
  theCheckboxEstudio = false;
  theCheckboxCuartoServicio = false;
  theCheckboxChimenea = false;
  theCheckboxCocinaAC = false;
  theCheckboxComedorIndependiente = false;
  theCheckboxVistaExterios = false;

  ciudades: Array<Ciudad> = [];
  tiposInmueble: Array<TipoInmueble> = [];
  zonas: Array<Zona> = [];
  ventaArriendo: Array<VentaArriendo> = [];
  inmuebles: Array<InmuebleTemporal> = [];
  departamentos: Array<Departamento> = [];
  promociones: Array<Promocion> = [];
  promocionesFinal: Array<Promocion> = [];

  show: number;
  msj: string;
  cedula: string;
  encontroUsu: boolean;
  numMatriculaBuscar: string;
  busco: boolean;
  resul: string;

  constructor(private generico: GenericoService, private usuarioServicio: UsuarioService) { }

  ngOnInit() {

    //  Validamos si el usuario tiene acceso a la pagina
    this.usuarioServicio.esAccesible('administracion/gestion-inmuebles');

    this.inmueble = new Inmueble();
    this.inmuebleTemporal = new InmuebleTemporal();

    this.usuarioSesion = this.usuarioServicio.getUsuario();
    this.listar();
    this.listarDepartamentos();
    this.listarTipoInmuebles();
    this.listarZonas();
    this.listarVentaArriendo();
    this.listarPromociones();
    this.busco = false;

  }

  /**
   * Metodo que permite despues de buscar al usuario propietario
   * registrar un inmueble
   * @param form el formulario de los datos en el html
   */
  registrar(form: NgForm) {
    this.llenarInmueble();

    const aux: AuxiliarObjeto = new AuxiliarObjeto();
    aux.objeto = this.inmueble;
    aux.replaceValue('promocion', 0);

    this.generico.registrar('inmueble', aux.objeto).subscribe(res => {
      if (res.data === 'exito') {
        this.msj = 'El inmueble se ha registrado correctamente';
        this.show = 2;
        this.listar();
        this.latSeleccion = 4.648908;
        this.longSeleccion = -74.100449;
        this.locationSelec = false;
        form.reset();
      } else {
        this.msj = res.data;
        this.show = 1;
      }
    });
  }

  /**
   * Buscar un inmueble
   */
  buscarInmueble() {
      this.generico.buscar('inmueble', {'numero_matricula': this.numMatriculaBuscar}).subscribe(rta => {
        if (rta.data == null) {
          this.show = 1;
          this.msj = 'No existe el inmueble con ese numero de matricula: ' + this.numMatriculaBuscar;
        } else {
          this.locationSelec = true;
          this.busco = true;
          this.inmuebleTemporal = rta.data;
          console.log(rta.data);
          this.buscarCiudad(this.inmuebleTemporal);
          this.llenarInmuebleBusqueda(this.inmuebleTemporal);
        }
      });
  }

  /**
   * Buscar un usuario
   */
  buscarUsuario(form: NgForm) {
    if (this.cedula != null) {
      this.generico.buscar('personas', {'cedula': this.cedula}).subscribe(rta => {
        console.log(rta.data);
        if (rta.data == null) {
          console.log('entro null');
          this.show = 1;
          this.msj = rta.data;
        } else {
          console.log('entro no null');
          // Guardamos el resultado en persona
          this.persona = rta.data;
          this.generico.buscar('usuarios', {'persona': this.persona.id}).subscribe(res => {
            if (res.data != null) {
              this.usuarioCliente = res.data;
              this.registrar(form);
            } else {
              this.show = 1;
              this.msj = 'error, esta persona no tiene un usuario creado en nuestro sistema';
            }
          });
        }
      });
    } else {
      this.show = 1;
      this.msj = 'error, debe ingresar la cedula del propietaria';
    }
  }

  limpiarCampos(form: NgForm) {
    this.selectedEditar = false;
    this.busco = false;
    this.numMatriculaBuscar = '';
    this.latSeleccion = 4.648908;
    this.longSeleccion = -74.100449;
    this.locationSelec = false;
    this.selectedEditar = false;
    form.reset();
  }

  verUnInmuebleEnMap(e: InmuebleTemporal) {
    this.verInmueble = true;
    this.latSelectedLista = e.latitud;
    this.longSelectedLista = e.longitud;

  }

  mostrarTodosInmueblesEnMap() {
    this.verInmueble = false;
  }

  ver(e: InmuebleTemporal) {

    this.selectedEditar = true;
    for ( const i of this.inmuebles) {
      if (e.id === i.id) {
        this.busco = true;
        this.locationSelec = true;
        this.buscarCiudad(i);
        this.llenarInmuebleBusqueda(i);
        return;
      }
    }
  }

  eliminar(e: Inmueble) {

    this.generico.eliminar('inmueble', {'id': e.id}).subscribe(res => {
      if (res.data === 'exito') {
        this.show = 2;
        this.msj = 'El inmueble fue eliminado';
        this.listar();
      } else {
        this.show = 1;
        this.msj = 'no se pudo eliminar el inmueble ' + res.data;
      }
    });
  }

  editar(form: NgForm) {

    this.llenarInmuebleEditar();

    const aux: AuxiliarObjeto = new AuxiliarObjeto();
    aux.objeto = this.inmueble;
    aux.replaceValue('promocion', this.promocionSelected.id);

    this.generico.editar('inmueble', aux.objeto, 'id').subscribe(res => {
      if (res.data === 'exito') {
        this.busco = false;
        this.show = 2;
        this.msj = 'el inmueble se edito correctamente';
        this.inmueble = new Inmueble();
        form.reset();
        this.latSeleccion = 4.648908;
        this.longSeleccion = -74.100449;
        this.locationSelec = false;
        this.selectedEditar = false;
        this.listar();
      } else {
        this.show = 1;
        this.msj = res.data;
      }
    });
  }

  /**
   * Lista todos los inmuebles
   */
  listar() {
    // Obtenemos la lista de inmuebles
    this.generico.listar('inmueble', {'estado': 1}).subscribe(rta => {
    if ( rta.data != null ) {
      this.inmuebles = rta.data;
      // tslint:disable-next-line:prefer-const
      for (let e of this.inmuebles) {
        // obtenemos el cargo del empleado
        this.generico.buscar('usuarios', {'persona': e.usuario}).subscribe(rta2 => {
          e.usuario = rta2.data;
          this.generico.buscar('personas', {'id': e.usuario.persona}).subscribe(res => {
            e.usuario.persona = res.data;
          });
        });
      }
    }
    });
  }

  listarPromociones() {
    this.generico.listar('promocion', null).subscribe(res => {
      this.promociones = res.data;
      this.llenarListaFinalPromo();
    });
  }

  llenarListaFinalPromo() {
    for (const p of this.promociones) {
      const fechaIni = new Date(p.fecha_inicio);
      const fechaFin = new Date(p.fecha_fin);
      const fechaAct = new Date;
      if (fechaIni <= fechaAct && fechaFin >= fechaAct) {
        this.promocionesFinal.push(p);
      }
    }
  }

  /**
   * lista los departamentos
   */
  listarDepartamentos() {
    this.generico.listar('departamentos', null).subscribe(res => {
      this.departamentos = res.data;
    });
  }

  /**
   * lista ciudades dependiendo del departamento que elijan
   */
  listarCiudades() {
    this.generico.listar('ciudades', {'departamento': this.departamentoSeleccionado.id}).subscribe(res => {
      this.ciudades = res.data;
    });
  }

  /**
   * lista los tipos de inmuebles
   */
  listarTipoInmuebles() {
    this.generico.listar('tipo_inmueble', null).subscribe(res => {
      this.tiposInmueble = res.data;
    });
  }

  buscarCiudad(inmuebleTemporal: InmuebleTemporal) {
    this.generico.buscar('ciudades', {'id': inmuebleTemporal.ciudad}).subscribe(res => {
      this.ciudadSeleccionada = res.data;
      this.generico.buscar('departamentos', {'id': this.ciudadSeleccionada.departamento}).subscribe(res2 => {
        this.departamentoSeleccionado = res2.data;
        this.listarCiudades();
      });
    });
  }

  cambio(cambiar: boolean): boolean {
    if (cambiar === false || cambiar === null) {
      return false;
    } else {
      return true;
    }
  }

  llenarInmueble() {

    if (this.promocionSelected != null) {
      this.inmueble.promocion = this.promocionSelected;
    } else {
      const promocionLlenar = new Promocion();
      this.inmueble.promocion = promocionLlenar;
    }
    const fecha = this.fechaActual();
    this.inmueble.fechaAprobacion = fecha;
    this.inmueble.latitud = this.latSeleccion;
    this.inmueble.longitud = this.longSeleccion;
    this.inmueble.tipoAV = this.tipoAVSeleccionado.id;
    this.inmueble.zona = this.zonaSeleccionada.id;
    this.inmueble.ciudad = this.ciudadSeleccionada;
    this.inmueble.tipo = this.tipoInmuebleSeleccionado;
    this.inmueble.usuario = this.usuarioCliente;
    this.inmueble.estado = 1;
    this.inmueble.administrador = this.usuarioSesion;
    this.inmueble.ascensor = this.cambio(this.theCheckboxAsensor);
    this.inmueble.canchasDepor = this.cambio(this.theCheckboxCanchasDepor);
    this.inmueble.zonasHumedas = this.cambio(this.theCheckboxZonasHumedas);
    this.inmueble.zonaInfantil = this.cambio(this.theCheckboxZonaInfantil);
    this.inmueble.jardines = this.cambio(this.theCheckboxJardines);
    this.inmueble.transporteCercano = this.cambio(this.theCheckboxTransporteCercano);
    this.inmueble.precioNegociable = this.cambio(this.theCheckboxPrecioNegociable);
    this.inmueble.zonaRopas =  this.cambio(this.theCheckboxZonasRopas);
    this.inmueble.parqueadero = this.cambio(this.theCheckboxParqueadero);
    this.inmueble.deposito = this.cambio(this.theCheckboxDeposito);
    this.inmueble.estudio = this.cambio(this.theCheckboxEstudio);
    this.inmueble.cuartoServicio = this.cambio(this.theCheckboxCuartoServicio);
    this.inmueble.chimenea = this.cambio(this.theCheckboxChimenea);
    this.inmueble.cocinaAC = this.cambio(this.theCheckboxCocinaAC);
    this.inmueble.comedorIndependiente = this.cambio(this.theCheckboxComedorIndependiente);
    this.inmueble.vistaExterior = this.cambio(this.theCheckboxVistaExterios);
  }

  llenarInmuebleEditar() {
    if (this.promocionSelected != null) {
      this.inmueble.promocion = this.promocionSelected;
    } else {
      const promocionLlenar = new Promocion();
      this.inmueble.promocion = promocionLlenar;
    }
    this.inmueble.usuario = this.usuarioCliente;
    this.inmueble.tipoAV = this.tipoAVSeleccionado.id;
    this.inmueble.zona = this.zonaSeleccionada.id;
    this.inmueble.ciudad = this.ciudadSeleccionada;
    this.inmueble.tipo = this.tipoInmuebleSeleccionado;
    this.inmueble.latitud = this.latSeleccion;
    this.inmueble.longitud = this.longSeleccion;
    this.inmueble.ascensor = this.cambio(this.theCheckboxAsensor);
    this.inmueble.canchasDepor = this.cambio(this.theCheckboxCanchasDepor);
    this.inmueble.zonasHumedas = this.cambio(this.theCheckboxZonasHumedas);
    this.inmueble.zonaInfantil = this.cambio(this.theCheckboxZonaInfantil);
    this.inmueble.jardines = this.cambio(this.theCheckboxJardines);
    this.inmueble.transporteCercano = this.cambio(this.theCheckboxTransporteCercano);
    this.inmueble.precioNegociable = this.cambio(this.theCheckboxPrecioNegociable);
    this.inmueble.zonaRopas =  this.cambio(this.theCheckboxZonasRopas);
    this.inmueble.parqueadero = this.cambio(this.theCheckboxParqueadero);
    this.inmueble.deposito = this.cambio(this.theCheckboxDeposito);
    this.inmueble.estudio = this.cambio(this.theCheckboxEstudio);
    this.inmueble.cuartoServicio = this.cambio(this.theCheckboxCuartoServicio);
    this.inmueble.chimenea = this.cambio(this.theCheckboxChimenea);
    this.inmueble.cocinaAC = this.cambio(this.theCheckboxCocinaAC);
    this.inmueble.comedorIndependiente = this.cambio(this.theCheckboxComedorIndependiente);
    this.inmueble.vistaExterior = this.cambio(this.theCheckboxVistaExterios);
  }

  llenarInmuebleBusqueda(inmuebleTemporal: InmuebleTemporal) {

    this.usuarioCliente = inmuebleTemporal.usuario;
    this.latSeleccion = inmuebleTemporal.latitud;
    this.longSeleccion = inmuebleTemporal.longitud;
    this.getTipoInmueble(inmuebleTemporal);
    this.zonaSeleccionada.id = inmuebleTemporal.zona;
    this.tipoAVSeleccionado.id = inmuebleTemporal.tipoAV;
    this.inmueble.anoconstruccion = inmuebleTemporal.anoconstruccion;
    this.inmueble.id = inmuebleTemporal.id;
    this.inmueble.direccion = inmuebleTemporal.direccion;
    this.inmueble.numero_matricula = inmuebleTemporal.numero_matricula;
    this.inmueble.area = inmuebleTemporal.area;
    this.inmueble.valor = inmuebleTemporal.valor;
    this.inmueble.banios = inmuebleTemporal.banios;
    this.inmueble.estado = inmuebleTemporal.estado;
    this.inmueble.garajes = inmuebleTemporal.garajes;
    this.inmueble.habitaciones = inmuebleTemporal.habitaciones;
    this.inmueble.detalles = inmuebleTemporal.detalles;
    this.inmueble.anoconstruccion = inmuebleTemporal.anoconstruccion;
    this.inmueble.tipoCortinas = inmuebleTemporal.tipoCortinas;
    this.inmueble.fechaAprobacion = inmuebleTemporal.fechaAprobacion;
    this.theCheckboxAsensor = this.booleanComp(inmuebleTemporal.ascensor);
    this.theCheckboxCanchasDepor = this.booleanComp(inmuebleTemporal.canchasDepor);
    this.theCheckboxZonasHumedas = this.booleanComp(inmuebleTemporal.zonasHumedas);
    this.theCheckboxZonaInfantil = this.booleanComp(inmuebleTemporal.zonaInfantil);
    this.theCheckboxJardines = this.booleanComp(inmuebleTemporal.jardines);
    this.theCheckboxTransporteCercano = this.booleanComp(inmuebleTemporal.transporteCercano);
    this.theCheckboxPrecioNegociable = this.booleanComp(inmuebleTemporal.precioNegociable);
    this.theCheckboxZonasRopas = this.booleanComp(inmuebleTemporal.zonasRopas);
    this.theCheckboxParqueadero = this.booleanComp(inmuebleTemporal.parqueadero);
    this.theCheckboxDeposito = this.booleanComp(inmuebleTemporal.deposito);
    this.theCheckboxEstudio = this.booleanComp(inmuebleTemporal.estudio);
    this.theCheckboxCuartoServicio = this.booleanComp(inmuebleTemporal.cuartoServicio);
    this.theCheckboxChimenea = this.booleanComp(inmuebleTemporal.chimenea);
    this.theCheckboxCocinaAC = this.booleanComp(inmuebleTemporal.cocinaAC);
    this.theCheckboxComedorIndependiente = this.booleanComp(inmuebleTemporal.comedorIndependiente);
    this.theCheckboxVistaExterios = this.booleanComp(inmuebleTemporal.vistaExterior);

  }

  getTipoInmueble(inm: InmuebleTemporal) {
    this.generico.buscar('tipo_inmueble', {'id': inm.tipo}).subscribe(res => {
      this.tipoInmuebleSeleccionado = res.data;
    });
  }

  booleanComp(comp: string): boolean {
    if (comp === '1') {
      return true;
    }
    return null;
  }

  fechaActual(): string {

    // tslint:disable-next-line:prefer-const
    let dateFormat = require('dateformat');
    // tslint:disable-next-line:prefer-const
    let now = new Date();
    return dateFormat(now, 'yyyy/mm/dd');

  }

  listarZonas() {

    // tslint:disable-next-line:prefer-const
    let zona1: Zona = new Zona();
    zona1.id = 0;
    zona1.nombre = 'Norte';

    // tslint:disable-next-line:prefer-const
    let zona2: Zona = new Zona();
    zona2.id = 1;
    zona2.nombre = 'Sur';

    // tslint:disable-next-line:prefer-const
    let zona3: Zona = new Zona();
    zona3.id = 2;
    zona3.nombre = 'Oriente';

    // tslint:disable-next-line:prefer-const
    let zona4: Zona = new Zona();
    zona4.id = 3;
    zona4.nombre = 'Occidente';

    this.zonas.push(zona1, zona2, zona3, zona4);

  }

  listarVentaArriendo() {

    // tslint:disable-next-line:prefer-const
    let tipo1: VentaArriendo = new VentaArriendo();
    tipo1.id = 0;
    tipo1.nombre = 'Arriendo';

    // tslint:disable-next-line:prefer-const
    let tipo2: VentaArriendo = new VentaArriendo();
    tipo2.id = 1;
    tipo2.nombre = 'Venta';

    this.ventaArriendo.push(tipo1, tipo2);

  }

  onFileSelected(event) {
    this.file = event.target.files;
  }

  buscarInmuebleArchivo(form: NgForm) {
    this.generico.buscar('inmueble', {'numero_matricula': this.numMatriculaBuscar}).subscribe(res => {
      if (res.data != null) {
        this.inmuebleArchivo = res.data;
        console.log('inmueble' + this.inmuebleArchivo.id);
        this.crearArchivo(this.inmuebleArchivo, form);
      } else {
        this.show = 1;
        this.msj = 'ERROR ' + res.data;
      }
    });
  }

  crearArchivo(inmueble: Inmueble, form: NgForm) {
    for (const fileC of this.file) {
      const ext = fileC.name.substr(fileC.name.lastIndexOf('.') + 1);
      if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
        this.convertirArchivoBase64(fileC, true, inmueble, form);
      } else if (ext === 'mp4') {

      } else {
        this.show = 404;
        this.msj = 'El archivo ' + fileC.name + ' tiene una extensión no permitida';
      }
    }
  }

  convertirArchivoBase64(file: File, imgn: boolean, inmueble: Inmueble, form: NgForm) {
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.img = myReader.result;
      // tslint:disable-next-line:prefer-const
      const archivoIngresado: Archivo = new Archivo();
      archivoIngresado.nombre = this.img;
      archivoIngresado.inmueble = inmueble;
      if (imgn) {
        archivoIngresado.tipo = 0;
      } else {
        archivoIngresado.tipo = 1;
      }
      this.generico.registrar('archivo_inmueble', archivoIngresado)
      .subscribe(res => {
        if (res.data === 'exito') {
          this.show = 2;
          this.msj = 'El archivo se registro correctamente';
          form.reset();
        } else {
          this.show = 1;
          this.msj = 'ERROR, no se pudo registrar ' + res.data;
        }
      });
    };
    myReader.readAsDataURL(file);
  }

  onChoseLocation(event) {
    this.latSeleccion = event.coords.lat;
    this.longSeleccion = event.coords.lng;
    this.locationSelec = true;
  }

  /**
  imprimirInmueble() {
    console.log('admin: ' + this.inmueble.administrador.username);
    console.log('año construccion: ' + this.inmueble.anoconstruccion);
    console.log('area: ' + this.inmueble.area);
    console.log('ascensor: ' + this.inmueble.ascensor);
    console.log('baños: ' + this.inmueble.banios);
    console.log('Cancha depor: ' + this.inmueble.canchasDepor);
    console.log('chimenea: ' + this.inmueble.chimenea);
    console.log('ciudad: ' + this.inmueble.ciudad);
    console.log('cocinaAC: ' + this.inmueble.cocinaAC);
    console.log('comedor independiente: ' + this.inmueble.comedorIndependiente);
    console.log('cuarto servicios: ' + this.inmueble.cuartoServicio);
    console.log('deposito: ' + this.inmueble.deposito);
    console.log('detalles: ' + this.inmueble.detalles);
    console.log('direccion: ' + this.inmueble.direccion);
    console.log('estado: ' + this.inmueble.estado);
    console.log('estudio: ' + this.inmueble.estudio);
    console.log('fecha aprobacion: ' + this.inmueble.fechaAprobacion);
    console.log('garajes: ' + this.inmueble.garajes);
    console.log('habitaciones: ' + this.inmueble.habitaciones);
    console.log('chimenea: ' + this.inmueble.jardines);
    console.log('numero matricula: ' + this.inmueble.numero_matricula);
    console.log('parqueadero: ' + this.inmueble.parqueadero);
    console.log('precio negociable: ' + this.inmueble.precioNegociable);
    console.log('tipoAV: ' + this.inmueble.tipoAV);
    console.log('tipo cortinas: ' + this.inmueble.tipoCortinas);
    console.log('transporte cercano: ' + this.inmueble.transporteCercano);
    console.log('usuario: ' + this.inmueble.usuario);
    console.log('valor: ' + this.inmueble.valor);
    console.log('vista exterios: ' + this.inmueble.vistaExterior);
    console.log('zona: ' + this.inmueble.zona);
    console.log('zona infantil: ' + this.inmueble.zonaInfantil);
    console.log('zona ropas: ' + this.inmueble.zonaRopas);
    console.log('zonas humedas: ' + this.inmueble.zonasHumedas);
  }
  */
}