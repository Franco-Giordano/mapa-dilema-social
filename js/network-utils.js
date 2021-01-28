
function convertirNodos(mapa) {
    var nodos = [];

    for (const fila of mapa) {
        var nuevo = {};
        nuevo['id'] = fila['id'];
        nuevo['label'] = fila['label'];
        nuevo['categoria'] = fila['categoria'] || "NORMAL";
        
        nuevo['descripcion'] = fila['descripcion'];
        if (nuevo['descripcion']) {
            nuevo = {
                ...nuevo,
                borderWidth: 6
            };
        } else {
            nuevo = {
                ...nuevo,
                borderWidth: 0
            };
        }
        

        if (ESTILOS[nuevo['categoria']]) {
            nuevo = {
                ...nuevo,
                ...ESTILOS[nuevo['categoria']]
            };
        }

        nodos.push(nuevo);
    }

    return nodos;

}

function convertirAristas(mapa) {
    var aristas = [];

    for (const fila of mapa) {
        var conexiones = fila['conexiones'].split('-');

        if (conexiones[0] === "") continue;

        for (const conexion of conexiones) {
            var nueva = {}
            nueva['from'] = fila['id'];
            nueva['to'] = conexion;
            aristas.push(nueva);
        }
    }

    return aristas;
}
