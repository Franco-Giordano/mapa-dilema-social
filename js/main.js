$.ajax({
    type: "GET",
    url: "data/mapa.csv",
    dataType: "text",
    success: dibujarMapa
});

// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
//   }

// const SEED = getRandomInt(10000);
// console.log("SEED: ", SEED);


function dibujarMapa(data) {
    var mapa = $.csv.toObjects(data);
    console.log(mapa);

    var nodosAdaptados = convertirNodos(mapa);
    var nodos = new vis.DataSet(nodosAdaptados);

    var aristasAdaptadas = convertirAristas(mapa);
    var aristas = new vis.DataSet(aristasAdaptadas);

    var container = document.getElementById('mynetwork');

    var data = {
        nodes: nodos,
        edges: aristas
    };

    var network = new vis.Network(container, data, NETWORK_OPTIONS);
    network.once("beforeDrawing", () => network.fit());
    network.once("afterDrawing", () => network.focus(25, {animation: {duration: 2500}, scale: 1}));

}

function convertirNodos(mapa) {
    var nodos = [];

    for (const fila of mapa) {
        var nuevo = {};
        nuevo['id'] = fila['id'];
        nuevo['label'] = fila['label'];

        if (fila['categoria'] && ESTILOS[fila['categoria']]) {
            nuevo = {
                ...nuevo,
                ...ESTILOS[fila['categoria']]
            };
        }
        else {
            nuevo = {
                ...nuevo,
                ...ESTILOS.NORMAL
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
