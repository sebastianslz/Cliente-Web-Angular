import { Rol } from './Rol';
/**
 * Entidad persona
 */
export class Persona {

    id: number;
    cedula: string;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    telefono: string;
    direccion: string;
    rol: Rol;

}

/**
{
    "cedula": "1094",
    "nombre": "Richard",
    "apellido": "Vanegas",
    "email": "richard@gmail.com",
     "fecha_nacimiento": "1997-05-12",
    "experiencia": "1 año",
    "tipo_id": 1,
    "formacion": "Tecnico",
    "direccion": "Calle 50",
    "login": {
            "username": "kuro",
            "contrasenia": "1234"
            },
    "rol_id": 1
}

{
    "id": "1",
    "cedula": "1094",
    "nombre": "sdc",
    "apellido": "skja",
    "fecha_nacimiento": "wdede",
    "telefono": "wecw",
    "direccion": "wwcdc",
    "rol": "1"
    },
    */
