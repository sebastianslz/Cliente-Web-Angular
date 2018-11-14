import { Component, OnInit } from '@angular/core';
import { Contrato } from '../../../Modelo/Contrato';
import { Arriendo } from '../../../Modelo/Arriendo';
import { Usuario } from '../../../Modelo/Usuario';
import { GenericoService } from '../../../Servicios/genericoServ.service';
import { UsuarioService } from '../../../Servicios/usuarioServ.service';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { AuxiliarObjeto } from '../../../Modelo/AuxiliarObjeto';
import { Empleado } from 'src/app/Modelo/Empleado';


@Component({
  selector: 'app-asignar-arriendo-contrato',
  templateUrl: './asignar-arriendo-contrato.component.html',
  styleUrls: ['./asignar-arriendo-contrato.component.css']
})
export class AsignarArriendoContratoComponent implements OnInit {

  contratos: Array<Contrato> = [];
  constratosFinales: Array<Contrato> = [];
  arriendos: Array<Arriendo> = [];
  arr: Arriendo = new Arriendo();
  contrato: Contrato = new Contrato();

  // usuario en sesion
  usuarioSesion: Usuario = new Usuario();

   // Variables para los mensajes en la pagina
   show: number;
   msj: string;
   idContrato: number;
   busco: boolean;
   verSelec = false;
   descripcionSel: string;

  constructor(private generico: GenericoService, private usuarioServicio: UsuarioService) { }

  ngOnInit() {
    // Validamos si el usuario tiene acceso a la pagina
    this.usuarioServicio.esAccesible('administracion/asignar-arriendo-contrato');
    this.usuarioSesion = this.usuarioServicio.getUsuario();
    this.listar();
  }

  listarArriendos() {
    this.generico.listar('arriendo', null).subscribe(res => {
      this.arriendos = res.data;
      this.agregarObjetosArriendos();
    });
  }

  agregarObjetosArriendos() {
    for (const v of this.arriendos) {

      const data = v.fecha.split('T');
      const fecha = data[0];
      v.fecha = fecha;

      this.generico.buscar('contrato', {'id': v.contrato}).subscribe(res => {
        v.contrato = res.data;
        this.generico.buscar('reservar_visita', {'id': v.contrato.visita}).subscribe(res2 => {
          v.contrato.visita = res2.data;
          this.generico.buscar('inmueble', {'id': v.contrato.visita.inmueble}).subscribe(res3 => {
            v.contrato.visita.inmueble = res3.data;
            this.generico.buscar('usuarios', {'persona': v.contrato.cliente}).subscribe(res1 => {
              v.contrato.cliente = res1.data;
              this.generico.buscar('personas', {'id': v.contrato.cliente.persona}).subscribe(res5 => {
                v.contrato.cliente.persona = res5.data;
                this.generico.buscar('empleados', {'usuario': v.empleado}).subscribe(res4 => {
                  v.empleado = res4.data;
                  this.generico.buscar('usuarios', {'persona': v.empleado.usuario}).subscribe(res6 => {
                    v.empleado.usuario = res6.data;
                    this.generico.buscar('personas', {'id': v.empleado.usuario.persona}).subscribe(res7 => {
                      v.empleado.usuario.persona = res7.data;
                    });
                  });
                });
              });
            });
          });
        });
      });
    }
  }


  /**
   * lista los contratos de estado "1" para llegar a su finalizacion
   */
  listar() {
    this.generico.listar('contrato', {'estado': 1}).subscribe(res => {
      this.contratos = res.data;
      this.agregarObjetos();
      this.listarArriendos();
    });
  }

  agregarObjetos() {
    for (const c of this.contratos) {
      const fields = c.fecha_solicitud.split('T');
      const fechaSoli = fields[0];
      c.fecha_solicitud = fechaSoli;
      this.generico.buscar('usuarios', {'persona': c.cliente}).subscribe(res1 => {
        c.cliente = res1.data;
        this.generico.buscar('personas', {'id': c.cliente.persona}).subscribe(res5 => {
          c.cliente.persona = res5.data;
          this.generico.buscar('empleados', {'usuario': c.empleado}).subscribe(res3 => {
            c.empleado = res3.data;
            this.generico.buscar('usuarios', {'persona': c.empleado.usuario}).subscribe(res2 => {
              c.empleado.usuario = res2.data;
              this.generico.buscar('personas', {'id': c.empleado.usuario.persona}).subscribe(res4 => {
                c.empleado.usuario.persona = res4.data;
                this.generico.buscar('reservar_visita', {'id': c.visita}).subscribe(res6 => {
                  c.visita = res6.data;
                  this.generico.buscar('inmueble', {'id': c.visita.inmueble}).subscribe(res7 => {
                    c.visita.inmueble = res7.data;
                    this.listadoFinal();
                  });
                });
              });
            });
          });
        });
      });
    }
  }


  listadoFinal() {
    for (const c of this.contratos) {
      if (c.visita.inmueble.tipoAV === 0) {
        this.constratosFinales.push(c);
      }
    }
  }

  /*
  * Buscar contrato
  */
 buscarContrato() {
     this.generico.buscar('contrato', {'id': this.idContrato}).subscribe(rta => {
       if (rta.data == null) {
         this.show = 1;
         this.msj = 'No existe el contrato con ese numero de identificacion: ' + this.idContrato;
       } else {
         this.busco = true;
         this.contrato = rta.data;
       }
     });
 }

  /**
   * Ver la inormacion del contrato
   */
  ver(i: Contrato) {
    this.verSelec = true;
    this.contrato = i;
    console.log(this.contrato.id);
  }

  registrar(form: NgForm) {
    const empleado: Empleado = new Empleado();

    const fecha = this.fechaActual();
    this.arr.fecha = fecha;
    this.arr.empleado = empleado;
    this.arr.contrato = this.contrato;
    this.arr.descripcion = this.descripcionSel;
    const aux: AuxiliarObjeto = new AuxiliarObjeto();
    aux.objeto = this.arr;
    aux.replaceValue('contrato', this.contrato.id);
    aux.replaceValue('empleado', this.usuarioSesion.persona.id);
    console.log(aux.objeto);


    this.generico.registrar('arriendo', aux.objeto).subscribe(res => {
      if (res.data === 'exito') {
        this.contrato.estado = 2;
        const aux2: AuxiliarObjeto = new AuxiliarObjeto();
        aux2.objeto = this.contrato;
        aux2.replaceValue('cliente', this.contrato.cliente.persona.id);
        aux2.replaceValue('empleado', this.contrato.empleado.usuario.persona.id);
        aux2.replaceValue('visita', this.contrato.visita.id);

        this.generico.editar('contrato', aux2.objeto, 'id').subscribe(res2 => {
          if (res2.data === 'exito') {
            this.msj = 'el arriendo se ha registrado correctamente';
            this.show = 2;
            this.descripcionSel = '';
            this.constratosFinales = new Array<Contrato>();
            this.listar();
            form.reset();
          } else {
            this.msj = res2.data;
            this.show = 1;
          }
        });
      } else {
        this.msj = res.data;
        this.show = 1;
      }
    });
  }

  fechaActual(): string {

    // tslint:disable-next-line:prefer-const
    let dateFormat = require('dateformat');
    // tslint:disable-next-line:prefer-const
    let now = new Date();
    return dateFormat(now, 'yyyy/mm/dd');

  }

}
