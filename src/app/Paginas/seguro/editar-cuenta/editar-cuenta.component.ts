import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../Modelo/Usuario';
import { Persona } from '../../../Modelo/Persona';
import { Rol } from '../../../Modelo/Rol';
import { RolService } from '../../../Servicios/rolServ.service';
import { PersonaService } from '../../../Servicios/personaServ.service';
import { UsuarioService } from '../../../Servicios/usuarioServ.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent implements OnInit {

  // Usuario que vamos a actualizar
  usuario: Usuario = new Usuario;

  // Variables para los mensajes en la pagina
  show: number;
  msj: string;

  constructor(private rolServicio: RolService, private personaServicio: PersonaService, private usuarioServicio: UsuarioService) { }

  ngOnInit() {
      // Validamos si el usuario ya inicio sesion
      if (this.usuarioServicio.getUsuario() == null) {
        // como no inicio sesion, lo redireccionamos al login
        this.usuarioServicio.redireccionar('/login');
      } else {
        // Asignamos el usuario
        this.usuario = this.usuarioServicio.getUsuario();
      }
  }


  /**
   * Actualizar datos del usuario
   */
  editar(form: NgForm) {
    console.log(this.usuario);
    this.personaServicio.editar(this.usuario).subscribe(rta => {
      if (rta.data === 'exito') {
        this.usuarioServicio.setUsuario(this.usuario);
        this.msj = 'Se ha actualizado tu cuenta';
        this.show = 2;
        window.alert(this.msj);
        // Redirigimos el usuario al inicio
        window.location.reload();
      } else {
        this.msj = rta.data;
        this.show = 1;
        window.alert(rta.data);
      }
    });
  }
}
