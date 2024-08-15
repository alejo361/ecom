/*
    Este arhivo contiene la logica y manejo de DOM de index.html
*/
let cantArtPedidos = 0;
const badgePedidos = document.getElementById("cantProdPedido");
const linkLogin = document.getElementById("loginLink");
const cantProdPedido = document.getElementById("cantProdPedido");

/* PRODUCTOS */
let productos = new Productos();
const grid_productos = document.getElementById('productos-grid');
const template = document.getElementById('producto-show');
let pedidoTemp = new PedidoTemporal();

productos.lista.forEach(producto => {
    if (producto.stock > 0) {
        const copia = template.content.cloneNode(true);
        copia.querySelector('#nombreProd').textContent = producto.nombre;
        copia.querySelector('#stockProd').textContent = producto.stock;
        copia.querySelector('#precioProd').textContent = "Precio $" + producto.precio;
        // Comprar
        copia.querySelector('.btn-comprar').addEventListener('click', event => {
            pedidoTemp.agregarProducto({ id: producto.id, nombre: producto.nombre, cantidad: 1, precio: producto.precio }, producto.stock) ? mostrarToast(producto.nombre) : mostrarToast(producto.nombre, true);
            cantArtPedidos++;
            updateBadgePedidos();
        });
        grid_productos.appendChild(copia);
    }
});
updateBadgePedidos()

function updateBadgePedidos() {
    badgePedidos.textContent = pedidoTemp.getCantProdCarrito();
}

//mostrar toast al apretar comprar
function mostrarToast(nombreProd, error = false) {
    let textoToast = error ? `Ya tenes la maxima cantidad de ${nombreProd}` : `Agregaste ${nombreProd} a tu pedido`;
    let color = error ? "#ee4724" : "#22b455";
    Toastify({
        text: textoToast,//"Agregaste " + nombreProd + " a tu pedido",
        duration: 3000,
        style: {
            background: color,
        },
    }).showToast();
}