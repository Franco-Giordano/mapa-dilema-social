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
    network.once("afterDrawing", () => network.focus(25, {
        animation: {
            duration: 2000
        },
        scale: 1
    }));

    network.on("select", (event) => {
        var nodo = nodos.get(event.nodes[0]);
        var color = colorIonicDeCategoria(nodo.categoria);
        console.log(color);

        if (nodo.descripcion) {
            mostrarModal(nodo.label, nodo.descripcion, color);
        }
    });

}

function colorIonicDeCategoria(categoria) {
    const COLORESIONIC = {
        CENTRO: 'warning',
        NORMAL: 'primary',
        CICLO: 'success',
        CONSECUENCIA: 'danger'
    }

    return COLORESIONIC[categoria]
}


async function clickeoInfo() {
    mostrarModal('Informacion del proyecto', `Hoy en dia entendemos que hay algun problema con las redes sociales.\
    El aumento de las <b>noticias falsas, polarizacion, extremismo, ansiedad juvenil y\
    suicidios</b> no es casualidad: todo apunta a estas nuevas tecnologias que redefinieron\
    nuestra comunicacion con los demas. <br><br>

    No es sencillo discernir una unica causa responsable,\
    sino que resulta ser mas bien una "telaraña" de causas y consecuencias.\
    <br><br>
    Este mapa intenta dar un primer pantallazo de las\
    multiples tematicas que atraviesan estas cuestiones y como estan interconectadas.\
    <br><br>
    Fuertemente basado en el documental El Dilema de las Redes Sociales en Netflix.
    <br><br>
    Creado por Franco Giordano.
    `);
}


// ------- modal generico

var CURRENT_MODAL = null;

async function mostrarModal(titulo, descripcion, color) {
    const modal = await modalController.create({
        component: 'modal-generico',
        componentProps: {
            titulo: titulo,
            descripcion: descripcion,
            color: color || 'secondary'
        }
    });

    await modal.present();
    CURRENT_MODAL = modal;
}

customElements.define('modal-generico', class extends HTMLElement {
    connectedCallback() {

        const modalElement = document.querySelector('ion-modal');
        var datos = modalElement.componentProps;
        this.innerHTML = `
  <ion-header>
    <ion-toolbar color='`+datos.color+`'>
      <ion-title>` + datos.titulo + `</ion-title>
      <ion-buttons slot="primary">
        <ion-button onclick="dismissModal()">
          <ion-icon slot="icon-only" name="close"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">` + datos.descripcion + `</ion-content>
  `;
    }
});

function dismissModal() {
    if (CURRENT_MODAL) {
        CURRENT_MODAL.dismiss().then(() => {
            CURRENT_MODAL = null;
        });
    }
}