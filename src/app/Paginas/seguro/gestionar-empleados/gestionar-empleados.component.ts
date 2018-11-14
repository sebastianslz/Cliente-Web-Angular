import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../Modelo/Usuario';
import { Persona } from '../../../Modelo/Persona';
import { Rol } from '../../../Modelo/Rol';
import { PersonaService } from '../../../Servicios/personaServ.service';
import { UsuarioService } from '../../../Servicios/usuarioServ.service';
import { NgForm } from '@angular/forms';
import { Cargo } from '../../../Modelo/Cargo';
import { GenericoService } from '../../../Servicios/genericoServ.service';
import { Experiencia } from '../../../Modelo/Experiencia';
import { Empleado } from '../../../Modelo/Empleado';
import { AuxiliarObjeto } from '../../../Modelo/AuxiliarObjeto';
import { Formacion } from '../../../Modelo/Formacion';

@Component({
  selector: 'app-gestionar-empleados',
  templateUrl: './gestionar-empleados.component.html',
  styleUrls: ['./gestionar-empleados.component.css']
})
export class GestionarEmpleadosComponent implements OnInit {

  // Listado de Empleados
  empleados: Array<Empleado> = [];
  // Listado de Cargos
  cargos: Array<Cargo> = [];
  // Listado de Formaciones de un empleado
  formaciones: Array<Formacion> = [];
  // Listado de Experiencias de un empleado
  experiencias: Array<Experiencia> = [];
  // El Empleado
  empleado: Empleado = new Empleado();
  // El usuario del empleado
  usuario: Usuario = new Usuario();
  // La persona asociada con el empleado
  persona: Persona = new Persona();
  // Rol: Empleado (3)
  rol: Rol = new Rol();
  cargo: Cargo = new Cargo();
  // formacion del empleado
  formacion: Formacion =  new Formacion();
  // Archivo certiFicacion de la ormacion
  archivoFormacion: File = null;
  // experiencia del empleado
  experiencia: Experiencia = new Experiencia();
  // Archivo certiFicacion de la experiencia
  archivoExpeiencia: File = null;
  // Variables para los mensajes en la pagina
  show: number;
  msj: string;

  constructor(private genericoServicio: GenericoService, private personaServicio: PersonaService,
    private usuarioServicio: UsuarioService) { }

  ngOnInit() {
    // Validamos si el usuario tiene acceso a la pagina
    this.usuarioServicio.esAccesible('administracion/gestionar-empleados');
    // Construimos el objeto Empleado, inicialmente vacio
    this.empleado.cargo = this.cargo;
    this.empleado.usuario = this.usuario;
    this.empleado.usuario.persona = this.persona;
    this.rol.id = 3;
    this.empleado.usuario.persona.rol = this.rol;
    // Actualizamos la tabla de empleados
    this.listar();
    // Cargamos los cargos
    this.listarCargos();
  }

 /**
   * Registra un empleado con su usuario
   */
  registrar(form: NgForm) {
    // this.rol.id = this.persona.rol.id;
    // this.persona.rol = this.rol;
    // this.usuario.persona.cedula = this.persona.cedula;
    if (this.empleado.usuario.username != null && this.empleado.usuario.persona.apellido != null) {
      // Validamos si ya hay una persona con esta cedula
      this.genericoServicio.buscar('personas', {'cedula': this.empleado.usuario.persona.cedula}).subscribe(valida => {
        if (valida.data == null) {
          // Validamos si ya hay un usuario con el username
          this.genericoServicio.buscar('usuarios', {'username': "'" + this.empleado.usuario.username + "'"}).subscribe(valida2 => {
            if (valida2.data == null) {
              // Guardamos la persona asociada al empleado
              this.genericoServicio.registrar('personas', this.empleado.usuario.persona).subscribe(rta => {
                if (rta.data === 'exito') {
                  // Agregamos el id de la persona empleado que se acabo de registrar
                  this.empleado.usuario.persona.id = rta.id;
                  // registramos el usuario del empleado
                  this.genericoServicio.registrar('usuarios', this.empleado.usuario).subscribe(rta2 => {
                    if (rta2.data === 'exito') {
                      // por ultimo registramos el empleado
                      this.genericoServicio.registrar('empleados', this.empleado).subscribe(rta3 => {
                        if (rta3.data === 'exito') {
                          this.msj = 'Se ha registrado correctamente';
                          this.show = 2;
                          // Actualizamos la lista de empleados
                          this.listar();
                          window.alert(this.msj);
                        } else {
                          this.msj = rta3.data;
                          this.show = 1;
                          window.alert(this.msj);
                        }
                      });
                    } else {
                      this.msj = rta2.data;
                      this.show = 1;
                      window.alert(this.msj);
                    }
                  });
                } else {
                  this.msj = rta.data;
                  this.show = 1;
                  window.alert(this.msj);
                }
              });
            } else {
              this.msj = 'Ya hay un usuario con el username: ' + this.empleado.usuario.username;
              this.show = 1;
              window.alert(this.msj);
            }
          });
        } else {
          this.msj = 'Ya hay una persona registrada con la cedula: ' + this.empleado.usuario.persona.cedula;
          this.show = 1;
          window.alert(this.msj);
        }
      });
    } else {
      this.msj = 'Ingrese toda los datos';
      this.show = 1;
      window.alert(this.msj);
    }
  }

  /**
   * Edita una empleado con su usuario
   */
  editar(form: NgForm) {
    if (this.empleado.usuario.persona != null && this.empleado.usuario.username != null) {
    // Editamos el usuario y la persona
    this.personaServicio.editar(this.empleado.usuario).subscribe(rta => {
      if (rta.data === 'exito') {
        // Editamos el empleado
        this.genericoServicio.editar('empleados', this.empleado, 'usuario').subscribe(rta2 => {
          if (rta.data === 'exito') {
            this.msj = 'Se ha editado correctamente';
            this.show = 2;
            window.alert(this.msj);
            // limpiamos los campos
            form.reset();
            // Actualizamos la lista de empleados
            this.listar();
          }
        });
      } else {
        this.msj = rta.data;
        this.show = 1;
        window.alert(rta.data);
      }
    });
    } else {
      this.msj = 'Primero busque el empleado que va a editar';
      this.show = 1;
      window.alert(this.msj);
    }
  }

  /**
   * Buscar empleado
   */
  buscar() {
    // Buscamos la persona por cedula y rol 3 (empleado)
    this.genericoServicio.buscar('personas', {'cedula': this.empleado.usuario.persona.cedula, 'rol': 3}).subscribe(rta => {
      if (rta.data == null) {
        this.show = 1;
        this.msj = 'No existe un empleado con cedula ' + this.empleado.usuario.persona.cedula;
        this.limpiar();
      } else {
        this.show = 3;
        // Guardamos el resultado en persona
        this.persona = rta.data;
        this.persona.fecha_nacimiento = this.genericoServicio.formatoFecha(this.persona.fecha_nacimiento);
        // Asignamos el rol
        this.rol.id = rta.data.rol;
        this.persona.rol = this.rol;
        // Buscamos el empleado
        this.genericoServicio.buscar('empleados', {'usuario': this.persona.id}).subscribe(rta2 => {
          this.empleado = rta2.data;
          // Obtenemos el cargo
          this.genericoServicio.buscar('cargos', {'id': this.empleado.cargo}).subscribe(rta3 => {
            // Asignamos el cargo al empleado
            this.empleado.cargo = rta3.data;
            // Obtenemos el usuario
            this.genericoServicio.buscar('usuarios', {'persona': this.persona.id}).subscribe(rta4 => {
              this.usuario = rta4.data;
              // Setteamos los datos al empleado
              this.empleado.usuario = this.usuario;
              this.empleado.usuario.persona = this.persona;
              this.show = 2;
              this.msj = 'Despliegue para ver la informacion del empleado ' + this.persona.nombre + ' ' + this.persona.apellido + '.';
              this.listarFormaciones();
              this.listarExperiencias();
            });
          });
        });
      }
    });
  }

  /**
   * Resetea los objetos
   */
  limpiar() {
    this.usuario = new Usuario();
    this.persona = new Persona();
    this.empleado = new Empleado();
    this.empleado.cargo = this.cargo;
    this.empleado.usuario = this.usuario;
    this.empleado.usuario.persona = this.persona;
    this.empleado.usuario.persona.rol = this.rol;
    this.experiencias = [];
    this.formaciones = [];
  }
  /**
   * Ver la inormacion de un empleado de la tabla
   */
  ver(e: Empleado) {
    this.empleado = e;
    this.buscar();
    return true;
  }

  /**
   * Buscar desde el formulario html
   */
  fbuscar(event) {
    event.preventDefault();
    if (this.empleado.usuario.persona.cedula != null) {
      this.buscar();
    }
  }

  /**
   * Lista todas los empleados registradas
   */
  listar() {
    // Obtenemos la lista de empleado
    this.genericoServicio.listar('empleados', null).subscribe(rta => {
    if ( rta.data != null ) {
      this.empleados = rta.data;
      // obtenemos el resto de informacion del empleado
      // tslint:disable-next-line:prefer-const
      for (let e of this.empleados) {
        // obtenemos el cargo del empleado
        this.genericoServicio.buscar('cargos', {'id': e.cargo}).subscribe(rta2 => {
          e.cargo = rta2.data;
          // Obtenemos el usuario
          this.genericoServicio.buscar('usuarios', {'persona': e.usuario}).subscribe(rta3 => {
            e.usuario = rta3.data;
            // Obtenemos la persona
            this.genericoServicio.buscar('personas', {'id': e.usuario.persona}).subscribe(rta4 => {
              e.usuario.persona = rta4.data;
            });
          });
        });
      }
    }
    });
  }

  /**
   * Cargos
   */
  listarCargos() {
    // Obtenemos la lista de cargos
    this.genericoServicio.listar('cargos', null).subscribe(rta => {
      this.cargos = rta.data;
    });
  }

  /**
   * Eliminar empleado con su usuario de la base de datos
   */
  eliminar(e: Empleado) {
    this.genericoServicio.eliminar('personas', {'id': e.usuario.persona.id}).subscribe(rta => {
      if (rta.data === 'exito') {
        this.msj = 'Se ha eliminado la persona correctamente';
        this.show = 2;
        this.listar();
      } else {
        this.msj = 'No se ha podido eliminar la persona: ' + rta.data;
        this.show = 1;
      }
      window.alert(this.msj);
    });
  }

  /**
   * Asigna el archivo seleccionado del input en certificacion de experiencia o formacion
   * @param event contiene el archivo que selecciono el usuario
   * @param tipo define si el tipo de archivo es para experiencia o formacion
   */
  asignarArchivo(event, tipo) {
    // tslint:disable-next-line:prefer-const
    let selectedFile = <File>event.target.files[0];
    if (tipo === 1) {
      // Archivo Formacion
      this.archivoFormacion = selectedFile;
    } else {
      // Archivo Experiencia
      this.archivoExpeiencia = selectedFile;
    }
  }

  /**
   * Registra la formacion del empleado
   */
  registrarFormacion(form: NgForm) {
    // Limpiamos el id, en caso de que hayan buscado una formacion
    this.formacion.id = null;
    if (this.empleado.usuario.persona.id != null) {
      // Asignamos el empleado a la formacion
      this.formacion.empleado = this.empleado;
      if (this.formacion.institucion != null && this.formacion.titulo != null && this.archivoFormacion != null) {
        // Guardamos el archivo en el servidor y
        // Asignamos el nombre del archivo a la certificacion de la formacion
        this.genericoServicio.cargarArchivo(this.archivoFormacion).subscribe(r => {
          if (r.data === 'exito') {
            this.formacion.file_certificacion = r.nombreArchivo;
            // Usamos AuxiliarObjeto para no mandar los objetos dentro, solo las foraneas
            // tslint:disable-next-line:prefer-const
            let auxiliar: AuxiliarObjeto = new AuxiliarObjeto();
            auxiliar.objeto = this.formacion;
            auxiliar.replaceValue('empleado', this.empleado.usuario.persona.id);
            // Guardamos la formacion del empleado
            this.genericoServicio.registrar('formaciones', auxiliar.objeto).subscribe(rta => {
              if (rta.data === 'exito') {
                this.msj = 'Se ha registrado la formacion academica del empleado ' + this.empleado.usuario.username;
                this.show = 2;
                this.listarFormaciones();
                form.reset();
              } else {
                this.msj = rta.data;
                this.show = 1;
              }
              window.alert(this.msj);
            });
          } else {
            this.msj = 'No se pudo subir el archivo, intente de nuevo';
            this.show = 1;
            window.alert(this.msj);
          }
        });
      } else {
        this.msj = 'Ingrese los datos para registrar la Formacion Academica';
        this.show = 1;
        window.alert(this.msj);
      }
    } else {
      this.msj = 'Primero busque el empleado al que le va a registrar la Formacion Academica';
      this.show = 1;
      window.alert(this.msj);
    }
  }

  /**
   * lista las Formaciones academicas del empleado buscado o registrado
   */
  listarFormaciones() {
    this.genericoServicio.listar('formaciones', {'empleado': this.empleado.usuario.persona.id}).subscribe(rta => {
      if (rta.data != null) {
        this.formaciones = rta.data;
      }
    });
  }

  /**
   * Lista de Experiencias del empleado buscado o registrado
   */
  listarExperiencias() {
    this.genericoServicio.listar('experiencias', {'empleado': this.empleado.usuario.persona.id}).subscribe(rta => {
      if (rta.data != null) {
        this.experiencias = rta.data;
      }
    });
  }

  /**
   * Editar la formacion del empleado
   */
  editarFormacion(form: NgForm) {
    if (this.formacion.id != null) {
      if (this.formacion.institucion != null && this.formacion.titulo != null) {
        // Usamos AuxiliarObjeto para no mandar los objetos dentro, solo las foraneas
        // tslint:disable-next-line:prefer-const
        let auxiliar: AuxiliarObjeto = new AuxiliarObjeto();
        auxiliar.objeto = this.formacion;
        auxiliar.replaceValue('empleado', this.empleado.usuario.persona.id);
        // Guardamos la formacion del empleado
        this.genericoServicio.editar('formaciones', auxiliar.objeto, 'id').subscribe(rta => {
          if (rta.data === 'exito') {
            this.msj = 'Se ha editado la formacion academica';
            this.show = 2;
            this.listarFormaciones();
            form.reset();
          } else {
            this.msj = rta.data;
            this.show = 1;
          }
          window.alert(this.msj);
        });
      } else {
        this.msj = 'Ingrese los datos para editar la Formacion Academica';
        this.show = 1;
        window.alert(this.msj);
      }
    } else {
      this.msj = 'Primero seleccione la formacion academica que va a editar';
      this.show = 1;
      window.alert(this.msj);
    }
  }

  /**
   * Muestra los datos de la certificacion en el formulario y abre el pdf
   */
  verFormacion(f: Formacion) {
    this.formacion = f;
  }

  /**
   * Elimina una Formacion
   */
  eliminarFormacion(f: Formacion) {
    this.genericoServicio.eliminar('formaciones', {'id': f.id}).subscribe(rta => {
      if (rta.data === 'exito') {
        this.msj = 'La formacion academica se ha eliminado correctamente';
        this.show = 2;
        this.listarFormaciones();
      } else {
        this.msj = 'No se ha podido eliminar la formacion academica: ' + rta.data;
        this.show = 1;
      }
      window.alert(this.msj);
    });
  }

  /**
   * Registra la experiencia del empleado
   */
  registrarExperiencia(form: NgForm) {
    // Limpiamos el id, en caso de    que hayan buscado una experiencia
    this.experiencia.id = null;
    if (this.empleado.usuario.persona.id != null) {
      // Asignamos el empleado a la experiencia
      this.experiencia.empleado = this.empleado;
      if (this.experiencia.empresa != null && this.experiencia.cargo != null && this.archivoExpeiencia != null) {
        // Guardamos el archivo en el servidor y
        // Asignamos el nombre del archivo a la certificacion de la experiencia
        this.genericoServicio.cargarArchivo(this.archivoExpeiencia).subscribe(r => {
          if (r.data === 'exito') {
            this.experiencia.file_certificacion = r.nombreArchivo;
            // Usamos AuxiliarObjeto para no mandar los objetos dentro, solo las foraneas
            // tslint:disable-next-line:prefer-const
            let auxiliar: AuxiliarObjeto = new AuxiliarObjeto();
            auxiliar.objeto = this.experiencia;
            auxiliar.replaceValue('empleado', this.empleado.usuario.persona.id);
            // Guardamos la experiencia del empleado
            this.genericoServicio.registrar('experiencias', auxiliar.objeto).subscribe(rta => {
              if (rta.data === 'exito') {
                this.msj = 'Se ha registrado la experiencia laboral del empleado ' + this.empleado.usuario.username;
                this.show = 2;
                this.listarExperiencias();
                form.reset();
              } else {
                this.msj = rta.data;
               this.show = 1;
              }
              window.alert(this.msj);
            });
          } else {
            this.msj = 'No se pudo subir el archivo, intente de nuevo';
            this.show = 1;
            window.alert(this.msj);
          }
        });
      } else {
        this.msj = 'Ingrese los datos para registrar la experiencia laboral';
        this.show = 1;
        window.alert(this.msj);
      }
    } else {
      this.msj = 'Primero busque el empleado al que le va a registrar la experiencia laboral';
      this.show = 1;
      window.alert(this.msj);
    }
  }

  /**
   * Registra la experiencia del empleado
   */
  editarExperiencia(form: NgForm) {
    if (this.experiencia.id != null) {
      if (this.experiencia.empresa != null && this.experiencia.cargo != null) {
        // Usamos AuxiliarObjeto para no mandar los objetos dentro, solo las foraneas
        // tslint:disable-next-line:prefer-const
        let auxiliar: AuxiliarObjeto = new AuxiliarObjeto();
        auxiliar.objeto = this.experiencia;
        auxiliar.replaceValue('empleado', this.empleado.usuario.persona.id);
        // editamos la experiencia del empleado
        this.genericoServicio.editar('experiencias', auxiliar.objeto, 'id').subscribe(rta => {
          if (rta.data === 'exito') {
            this.msj = 'Se ha editado la experiencia laboral del empleado';
            this.show = 2;
            this.listarExperiencias();
            form.reset();
          } else {
            this.msj = rta.data;
            this.show = 1;
          }
          window.alert(this.msj);
        });
      } else {
        this.msj = 'Ingrese los datos para editar la Experiencia laboral';
        this.show = 1;
        window.alert(this.msj);
      }
    } else {
      this.msj = 'Primero seleccione la Experiencia laboral que va a editar';
      this.show = 1;
      window.alert(this.msj);
    }
  }

  /**
   * Muestra los datos de la certificacion en el formulario y abre el pdf
   */
  verExperiencia(e: Experiencia) {
    e.fecha_fin = this.genericoServicio.formatoFecha(e.fecha_fin);
    e.fecha_inicio = this.genericoServicio.formatoFecha(e.fecha_inicio);
    this.experiencia = e;
  }

  /**
   * Elimina una Experiencia
   */
  eliminarExperiencia(e: Experiencia) {
    this.genericoServicio.eliminar('experiencias', {'id': e.id}).subscribe(rta => {
      if (rta.data === 'exito') {
        this.msj = 'La experiencia laboral se ha eliminado correctamente';
        this.show = 2;
        this.listarExperiencias();
      } else {
        this.msj = 'No se ha podido eliminar la experiencia laboral: ' + rta.data;
        this.show = 1;
      }
      window.alert(this.msj);
    });
  }

}
