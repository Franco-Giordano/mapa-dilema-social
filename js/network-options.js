const ESTILOS = {
    CENTRO: {
        color: '#ffc409',
        margin: 20,
        font: {
            size: 50
        },
        widthConstraint: {
            maximum: 250
        }
    },
    NORMAL: {
        color: '#a3ddcb',
        margin: 20,
        font: {
            size: 20
        },
        widthConstraint: {
            maximum: 150
        }
    },
    CICLO: {
        color: '#42d77d',
        margin: 20,
        font: {
            size: 20
        },
        widthConstraint: {
            maximum: 150
        }
    },
    CONSECUENCIA: {
        color: '#ed576b',
        margin: 20,
        font: {
            size: 20
        },
        widthConstraint: {
            maximum: 200
        }
    },
}

const NETWORK_OPTIONS = {
    nodes: {
        shape: 'box',
        shadow: {
            enabled: true
        },
        scaling: {
            label: {
                enabled: false,
                drawThreshold: 0
            }
        }
    },
    edges: {
        arrows: 'to',
        width: 6,
        color: {inherit: 'to'}
    },
    physics: {
        barnesHut: {
            gravitationalConstant: -100000,
            centralGravity: 0.5
        }
    },
    layout: {
        randomSeed: 1126
    },
    // manipulation: {enabled: true}
    // layout: {hierarchical: {enabled: true, direction: 'LR', levelSeparation: 400}},
};