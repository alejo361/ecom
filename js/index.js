/*
    Este arhivo contiene la logica y manejo de DOM de index.html
*/
let cantArtPedidos = 0;
const badgePedidos = document.getElementById("cantProdPedido");
/* INICIO SESSION */
let login = new Login();
const linkLogin = document.getElementById("loginLink");
const cantProdPedido = document.getElementById("cantProdPedido");
const mdLogin = document.getElementById('mdLogin');
const btnLogin = document.getElementById('btnLogin');
const btnRegistro = document.getElementById('btnRegistro');

if (mdLogin) {
    mdLogin.addEventListener('show.bs.modal', event => {
    })
    mdLogin.addEventListener('hidden.bs.modal', event => {
        document.getElementById("mdMensaje").textContent = "";
    })
}

btnRegistro.addEventListener('click', (event) => {
    console.log("registrarse");
    window.location.replace("./vistas/registro.html");
});

btnLogin.addEventListener('click', (event) => {
    let usuario = document.getElementById("mdUsuario").value;
    let clave = document.getElementById("mdPass").value;
    console.log("datos de acceso" + usuario + clave);
    login.ingresar(usuario, clave);
    //login.check();
    document.getElementById("mdMensaje").textContent = login.mensaje;

});

/* PRODUCTOS */
let productos = new Productos();
const grid_productos = document.getElementById('productos-grid');
const template = document.getElementById('producto-show');
let pedidoTemp = new PedidoTemporal();

productos.lista.forEach(producto => {
    if (producto.stock > 0) {
        const copia = template.content.cloneNode(true);
        copia.querySelector('#nombreProd').textContent = producto.nombre;
        copia.querySelector('#stockProd').textContent = "Unidades en stock: " + producto.stock;
        copia.querySelector('#precioProd').textContent = "Precio $" + producto.precio;

        // Comprar
        copia.querySelector('.btn-comprar').addEventListener('click', event => {
            mostrarToast(producto.nombre);
            //const pStock = document.getElementById('stockProd')    
            pedidoTemp.agregarProducto({ id: producto.id, nombre: producto.nombre, cantidad: 1, precio: producto.precio });
            cantArtPedidos++;
            updateBadgePedidos();
        });
        grid_productos.appendChild(copia);
    }
});

function updateBadgePedidos(){
    badgePedidos.textContent = parseInt(cantArtPedidos);
}

/* OPINIONES SIMULADAS */
const opiniones = [
    "El servicio al cliente fue excepcional. Muy atentos y resolutivos.",
    "La atención que recibí superó mis expectativas. Muy satisfecho.",
    "Los representantes fueron muy amables y profesionales.",
    "La solución a mi problema fue rápida y efectiva.",
    "Me impresionó la rapidez con la que se resolvió mi consulta.",
    "El personal mostró gran empatía y comprensión.",
    "Recibí un trato muy cordial y eficiente.",
    "La atención al cliente fue excelente desde el primer contacto.",
    "Fui atendido con gran profesionalismo y amabilidad.",
    "El equipo resolvió mi problema de manera muy efectiva.",
    "Estoy muy contento con la calidad del servicio recibido.",
    "El soporte técnico fue excepcional y muy competente.",
    "La experiencia fue muy positiva y satisfactoria.",
    "El trato recibido fue amable y resolutivo.",
    "La atención fue rápida, eficiente y muy profesional.",
    "El equipo de atención al cliente hizo un trabajo excelente.",
    "Me sentí muy bien atendido y mis dudas fueron aclaradas.",
    "La solución proporcionada fue perfecta y rápida.",
    "El servicio al cliente fue impecable en todos los aspectos.",
    "Recibí una atención de primera categoría.",
    "La comunicación fue clara y efectiva.",
    "El personal mostró gran paciencia y dedicación.",
    "La atención al cliente fue excelente y muy eficiente.",
    "Me sorprendió lo bien que manejaron mi consulta.",
    "La respuesta fue rápida y la solución, perfecta.",
    "El servicio recibido fue de alta calidad y muy profesional.",
    "Me sentí valorado como cliente en todo momento.",
    "La experiencia con el servicio al cliente fue excelente.",
    "La atención fue muy eficaz y superó mis expectativas.",
    "El personal fue muy atento y resolvió mi problema rápidamente.",
    "Estoy muy satisfecho con la calidad de la atención recibida.",
    "El equipo de atención al cliente fue extremadamente eficiente.",
    "La experiencia fue muy positiva gracias al excelente servicio.",
    "El trato fue muy profesional y amable.",
    "Recibí una solución rápida y efectiva a mi problema.",
    "El servicio fue excelente, no tengo ninguna queja.",
    "El personal de atención al cliente fue muy competente y cortés.",
    "Me impresionó la rapidez y la calidad del servicio.",
    "El equipo hizo un trabajo excepcional en resolver mi consulta.",
    "La atención al cliente fue muy buena y eficaz.",
    "El personal mostró una gran actitud y profesionalismo.",
    "Recibí un trato excepcional y una solución eficaz.",
    "La experiencia fue muy positiva gracias a la atención recibida.",
    "El servicio fue muy bueno y el personal muy amable.",
    "Estoy muy contento con la forma en que manejaron mi caso.",
    "El equipo de atención al cliente fue muy diligente y atento.",
    "La solución proporcionada fue excelente y rápida.",
    "El trato recibido fue muy profesional y satisfactorio.",
    "La atención fue ejemplar y el personal muy capacitado.",
    "El servicio al cliente fue excelente y superó mis expectativas.",
    "Me sentí bien atendido y todas mis preguntas fueron respondidas.",
    "La respuesta fue muy rápida y la solución, adecuada."
];

function obtenerOpinionAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * opiniones.length);
    return opiniones[indiceAleatorio];
}

let clientes;
let url_api = 'https://randomuser.me/api/?results=5';
let elemCarousel = document.getElementById("opniones");
let opnionesSection = document.getElementById("opnionesSection");
fetch(url_api)
    .then((response) => response.json())
    .then((data) => {
        clientes = data.results;
        //quito display none para mostrar la section
        opnionesSection.classList.remove("d-none");
        clientes.forEach((cliente, indice) => {
            cliente.opinion = obtenerOpinionAleatoria();
            //si el indice es 0 que agregue active
            loadOpiniones(cliente, indice === 0);
        });
        //inicio carousel
        let carousel = new bootstrap.Carousel(elemCarousel);
    })
    .catch((error) => console.log(error))

const cuerpoCarouselOp = document.getElementById("cuerpoCarouselOp");

function loadOpiniones(cliente, isActive = false) {
    cuerpoCarouselOp.innerHTML += `<div class="carousel-item ${isActive ? 'active' : ''}">
        <p class="lead text-dark mx-4 mx-md-5 clienteOpinion">
            "${cliente.opinion}"
        </p>
        <div class="mt-5 mb-4">
            <img src="${cliente.picture.medium}"
                class="rounded-circle img-fluid shadow-1-strong clienteImagen" alt="foto perfil cliente"
                width="100" height="100" />
        </div>
        <p class="text-dark mb-3 clienteNombre" id="">${cliente.name.last} ${cliente.name.first}</p>
    </div>`;
}


//mostrar toast al apretar comprar
function mostrarToast(nombreProd) {
    Toastify({
        text: "Agregaste " + nombreProd + " a tu pedido",
        duration: 3000,
        style: {
            background: "#22b455",
          },
    }).showToast();
}
/*if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    
  })
}*/