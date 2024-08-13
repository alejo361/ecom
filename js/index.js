/*
    Este arhivo contiene la logica y manejo de DOM de index.html
*/
let cantArtPedidos = 0;
const badgePedidos = document.getElementById("cantProdPedido");
const linkLogin = document.getElementById("loginLink");
const cantProdPedido = document.getElementById("cantProdPedido");
/*const mdLogin = document.getElementById('mdLogin');
const btnLogin = document.getElementById('btnLogin');

if (mdLogin) {
    mdLogin.addEventListener('show.bs.modal', event => {
    })
    mdLogin.addEventListener('hidden.bs.modal', event => {
        document.getElementById("mdMensaje").textContent = "";
    })
}

btnLogin.addEventListener('click', (event) => {
    let usuario = document.getElementById("mdUsuario").value;
    let clave = document.getElementById("mdPass").value;
    console.log("datos de acceso" + usuario + clave);
    login.ingresar(usuario, clave);
    //login.check();
    document.getElementById("mdMensaje").textContent = login.mensaje;

});*/

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
updateBadgePedidos()

function updateBadgePedidos() {
    badgePedidos.textContent = pedidoTemp.getCantProdCarrito();//parseInt(cantArtPedidos);
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