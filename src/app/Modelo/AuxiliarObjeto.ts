/**
 * Este auxiliar objeto lo usamos para cuando queremos registrar un objeto
 * y no mandar los objetos (foraneas) si no solo el id de la foranea
 */
export class AuxiliarObjeto {

    objeto: object;

    /**
     * Remplaza el valor de un atributo del objeto
     * @param atributo el nombre del atributo del objeto
     * @param value valor a remplazar
     */
    replaceValue(atributo, value) {
        for (var key in this.objeto) {
            if (key === atributo) {
                // Asignamos el nuevo valor
                this.objeto[key] = value;
            }
        }
    }

    /**
     * Elimina un atributo del objeto
     * @param atributo el atributo a eliminar (tiene que ser del mismo nombre que en la BD)
     */
    eliminarAtributo(atributo) {
        // eliminamos el atributo del objeto
        delete this.objeto[atributo];
    }
}