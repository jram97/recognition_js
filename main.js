let Camara;
let Botones;
let Texto;
let clasificado = false;

let Knn;
let Modelo;

function setup() {
    createCanvas(320, 240);
    //background(255, 0, 0);
    Camara = createCapture(VIDEO);
    Camara.size(320, 240);
    Camara.hide();

    Modelo = ml5.featureExtractor('MobileNet', modeloListo);
    Knn = ml5.KNNClassifier();

    createP('Presiona botones para entrenar')

    let BotonesA = createButton('A');
    BotonesA.class('botonEntrenar');

    let BotonesB = createButton('B');
    BotonesB.class('botonEntrenar');

    let BotonesC = createButton('C');
    BotonesC.class('botonEntrenar');

    let BotonesD = createButton('D');
    BotonesD.class('botonEntrenar');

    let BotonNada = createButton('Nada');
    BotonNada.class('botonEntrenar');

    Texto = createP('Modelo no listo')

    Botones = selectAll('.botonEntrenar');

    for (let index = 0; index < Botones.length; index++) {
        Botones[index].style('margin', '5px');
        Botones[index].style('padding', '6px');
        Botones[index].mousePressed(presionandoBoton)
    }
}

function modeloListo() {
    console.log('Modelo listo');
    Texto.html('Modelo listo');
}

function clasificar() {
    const Imagen = Modelo.infer(Camara);
    knn.classify(Imagen, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            Texto.html('Es un: ' + result.label);
            clasificar();
        }
    })
}

function entrenarKNN(ObjectoEntrenar) {
    const Imagen = Modelo.infer(Camara);
    Knn.addExample(Imagen, ObjectoEntrenar);
}

function presionandoBoton() {
    let nombreBoton = this.elt.innerHTML;
    console.log('Entrenando con: ' + nombreBoton);
    Texto.html('Entrenando con: ' + nombreBoton);
    entrenarKNN(nombreBoton);
}

function draw() {
    image(Camara, 0, 0, 320, 240)
    if (Knn.getNumLabels() > 0 && !clasificado) {
        clasificar();
        clasificado = true;
    }
}