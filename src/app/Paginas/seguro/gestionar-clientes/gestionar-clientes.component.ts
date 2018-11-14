import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../Modelo/Usuario';
import { Persona } from '../../../Modelo/Persona';
import { Rol } from '../../../Modelo/Rol';
import { RolService } from '../../../Servicios/rolServ.service';
import { PersonaService } from '../../../Servicios/personaServ.service';
import { UsuarioService } from '../../../Servicios/usuarioServ.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-gestionar-clientes',
  templateUrl: './gestionar-clientes.component.html',
  styleUrls: ['./gestionar-clientes.component.css']
})
export class GestionarClientesComponent implements OnInit {

  // Listado de personas
  personas: Array<Persona> = [];
  // Rol: Cliente (2)
  rol: Rol = new Rol();

  // Usuario que vamos a registrar
  usuario: Usuario = new Usuario;
  // La persona asignada al usuario que vamos a registrar
  persona: Persona = new Persona();

  // Variables para los mensajes en la pagina
  show: number;
  msj: string;

  constructor(private rolServicio: RolService, private personaServicio: PersonaService, private usuarioServicio: UsuarioService) { }

  ngOnInit() {
    // Asignamos el rol cliente con id 2
    this.rol.id = 2;
    // Asignamos el rol a la persona
    this.persona.rol = this.rol;
    // Validamos si el usuario tiene acceso a la pagina
    this.usuarioServicio.esAccesible('administracion/gestionar-clientes');
    // Actualizamos la tabla de personas
    this.listar();
  }

  /**
   * Registra un cliente con su usuario
   */
  registrar(form: NgForm) {
    this.usuario.persona = this.persona;
    this.personaServicio.registrar(this.usuario).subscribe(rta => {
      if (rta.data === 'exito') {
        this.msj = 'Se ha registrado correctamente';
        this.show = 2;
        window.alert(this.msj);
        // limpiamos los campos
        form.reset();
        // Actualizamos la lista de clientes
        this.listar();
      } else {
        this.msj = rta.data;
        this.show = 1;
        window.alert(rta.data);
      }
    });
  }

  /**
   * Edita un cliente con su usuario
   */
  editar(form: NgForm) {
    if (this.usuario.persona != null && this.persona != null) {
    this.usuario.persona = this.persona;
    this.personaServicio.editar(this.usuario).subscribe(rta => {
      if (rta.data === 'exito') {
        this.msj = 'Se ha editado correctamente';
        this.show = 2;
        window.alert(this.msj);
        // limpiamos los campos
        form.reset();
        // Actualizamos la lista de clientes
        this.listar();
      } else {
        this.msj = rta.data;
        this.show = 1;
        window.alert(rta.data);
      }
    });
    } else {
      this.msj = 'Primero busque el cliente que va a editar';
      this.show = 1;
      window.alert(this.msj);
    }
  }

  /**
   * Buscar empleado
   */
  buscar() {
    this.personaServicio.personaByCedulaRol(this.persona).subscribe(rta => {
      if (rta.data == null) {
        this.show = 1;
        this.msj = 'No existe un cliente con cedula ' + this.persona.cedula;
      } else {
        this.show = 3;
        this.persona = rta.data;
        this.persona.rol = this.rol;
        // Buscamos el usuario asociado con el cliente
        this.personaServicio.usuarioByPersona(this.persona).subscribe(rta2 => {
          this.usuario = rta2.data;
        });
      }
    });
  }

  /**
   * Ver la inormacion de un empleado de la tabla
   */
  ver(p: Persona) {
    this.persona.cedula = p.cedula;
    this.buscar();
  }
  /**
   * Buscar desde el formulario html
   */
  fbuscar(event) {
    event.preventDefault();
    if (this.persona.cedula != null) {
      this.buscar();
    }
  }
  /**
   * Lista todas los empleados registradas
   */
  listar() {
    // Obtenemos la lista de empleado
    this.personaServicio.listarPersonasByRol(this.rol).subscribe(rta => {
      this.personas = rta.data;
    });
  }

  /**
   * Eliminar empleado con su usuario de la base de datos
   */
  eliminar(persona: Persona) {
    window.alert(persona.nombre);
  }
}
