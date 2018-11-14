import { Component, OnInit } from '@angular/core';
import { ReservarVisita } from 'src/app/Modelo/ReservarVisita';
import { Usuario } from 'src/app/Modelo/Usuario';
import { GenericoService } from 'src/app/Servicios/genericoServ.service';
import { UsuarioService } from 'src/app/Servicios/usuarioServ.service';
import { Empleado } from 'src/app/Modelo/Empleado';
import { AuxiliarObjeto } from 'src/app/Modelo/AuxiliarObjeto';

@Component({
  selector: 'app-asignar-visitas',
  templateUrl: './asignar-visitas.component.html',
  styleUrls: ['./asignar-visitas.component.css']
})
export class AsignarVisitasComponent implements OnInit {

  // Listado de visitas
  visitas: Array<ReservarVisita> = [];
  visitasFinales: Array<ReservarVisita> = [];
   // Listado de empleados
  empleados: Array<Empleado> = [];

  // Visita seleccionada para comentar
  visitaSeleccionada: ReservarVisita = new ReservarVisita();

   // Empleado seleccionado para asignarlo a la visita
  empleadoSeleccionado: Empleado = new Empleado();

  // usuario de session
  usuarioSesion: Usuario = new Usuario();

   // Variables para los mensajes en la pagina
  show: number;
  msj: string;

  // mostradores
  numeroVisita: number;
  nombreCliente: String;
  nombreEmpleado: String;

  // arreglo de horas
  horas: Array<String> = [];

  //variable booleana para la prueba
  asignoVisita= false;
  seleccionoVisita = false;
  seleccionoEmpleado=false;
  limpioCampos=false;

  constructor(private servicioGenerico: GenericoService, private usuarioServicio: UsuarioService) { }

  ngOnInit() {

   // this.usuarioServicio.esAccesible('administracion/asignar-visitas');
  //this.usuarioSesion = this.usuarioServicio.getUsuario();
    this.listarVisitas();
    this.listarEmpleados();
  }

  seleccionarVisita(visita: ReservarVisita) {
    this.visitaSeleccionada = visita;
    this.numeroVisita = visita.id;
    this.nombreCliente = visita.cliente.nombre;
    this.seleccionoVisita =true;
  }

  seleccionEmpleado(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
    this.nombreEmpleado = empleado.usuario.persona.nombre;
    this.seleccionoEmpleado = true;
  }

  asignarVisita(): void {
    if (this.visitaSeleccionada.id == null || this.empleadoSeleccionado.usuario == null) {
      this.msj = 'Por favor seleccione una visita y un empleado';
      this.show = 1;
      window.alert(this.msj);
      return;
    }
    this.visitaSeleccionada.empleado = this.empleadoSeleccionado.usuario.persona;
    this.visitaSeleccionada.comentario = '';
    const aux: AuxiliarObjeto = new AuxiliarObjeto();
    aux.objeto = this.visitaSeleccionada;
    this.asignoVisita=true;
    aux.replaceValue('inmueble', this.visitaSeleccionada.inmueble.id);
    aux.replaceValue('cliente', this.visitaSeleccionada.cliente.id);
    aux.replaceValue('empleado', this.visitaSeleccionada.empleado.id);

    console.log(aux.objeto);
    this.servicioGenerico.editar('reservar_visita', aux.objeto, 'id').subscribe(rta => {
    console.log("ENTRO ESTA VAINA");
    if (rta.data === 'exito') {
      this.msj = 'Se ha asignado el empleado exitosamente !';
      this.show = 2;
      this.visitasFinales = new Array<ReservarVisita>();
      this.listarVisitas();
      this.limpiarCampos();
    } else {
      this.msj = 'No se ha podido asignar el empleado: ' + rta.data;
      this.show = 1;
    }
      window.alert(this.msj);
    });
  }

  limpiarCampos() {
    this.numeroVisita = null;
    this.nombreCliente = '';
    this.nombreEmpleado = '';
    this.visitaSeleccionada.mensaje = '';
    this.limpioCampos=true;
  }



  // Lista las visitas a las cuales estan pendientes
  listarVisitas() {
    this.servicioGenerico.listar('reservar_visita', {'estado': "'PENDIENTE'"}).subscribe(rta => {
      if (rta.data != null) {
        this.visitas = rta.data;
       this.agregarObjetosVisitas(this.visitas);
      }
    });
  }

  agregarObjetosVisitas(lista: Array<ReservarVisita>) {
    for (const i of lista) {
      if (i.empleado == null) {
        const data = i.fecha.split('T');
        const fecha = data[0];
        i.fecha = fecha;
        this.servicioGenerico.buscar('inmueble', {'id': i.inmueble}).subscribe(r2 => {
          i.inmueble = r2.data;
          this.servicioGenerico.buscar('personas', {'id': i.empleado}).subscribe(r3 => {
            i.empleado = r3.data;
            this.servicioGenerico.buscar('personas', {'id': i.cliente}).subscribe(r4 => {
              i.cliente = r4.data;
              this.visitasFinales.push(i);
            });
          });
        });
      }
    }
  }

 /**
   * Lista todas los empleados registradas
   */
  listarEmpleados() {
    // Obtenemos la lista de empleado
    this.servicioGenerico.listar('empleados', null).subscribe(rta => {
    if ( rta.data != null ) {
      this.empleados = rta.data;
      // obtenemos el resto de informacion del empleado
      // tslint:disable-next-line:prefer-const
      for (let e of this.empleados) {
        // obtenemos el cargo del empleado
        this.servicioGenerico.buscar('cargos', {'id': e.cargo}).subscribe(rta2 => {
          e.cargo = rta2.data;
          // Obtenemos el usuario
          this.servicioGenerico.buscar('usuarios', {'persona': e.usuario}).subscribe(rta3 => {
            e.usuario = rta3.data;
            // Obtenemos la persona
            this.servicioGenerico.buscar('personas', {'id': e.usuario.persona}).subscribe(rta4 => {
              e.usuario.persona = rta4.data;
            });
          });
        });
      }
    }
    });
  }


}
