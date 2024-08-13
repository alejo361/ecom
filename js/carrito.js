/*
    Este arhivo contiene la logica y manejo de DOM de pedido.html
*/
let pedidoTemp = new PedidoTemporal();
let productos = new Productos();
//console.log(pedidoTemp);

//CONTROLAR Y CONFIRMAR PEDIDO
const mensajePedido = document.getElementById("mensajePedido");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const direccion = document.getElementById("direccion");
const formFinalizarPedido = document.getElementById('finalizarPedido');

//CARGO DATOS ENTREGA DEL PEDIDO
function cargarPedidoForm() {
    nombre.value = pedidoTemp.pedido.nombre;
    apellido.value = pedidoTemp.pedido.apellido;
    direccion.value = pedidoTemp.pedido.direccion;
}

formFinalizarPedido.addEventListener('submit', (e) => {
    pedidoTemp.establecerDatosCliente(nombre.value, apellido.value, direccion.value);
    let pedidoValido = pedidoTemp.checkPedido();
    if (pedidoValido !== true) {
        e.preventDefault();
        mensajePedido.classList.remove("d-none");
        mensajePedido.textContent = pedidoValido;
    } else {
        //Pedido confirmado, paso a localStorage y lo ELIMINO DE sessionStorage
        pedidoTemp.confirmarPedido();
    }
});

//CARGO LA TABLA DEL PEDIDO
const tablaPedidoProd = document.querySelector('#tabla-productos-pedido tbody');
const templatePed = document.getElementById('fila-pedido');

function armarTablaPedidos() {
    limpiarTablaPedidos();
    cargarPedidoForm();
    pedidoTemp.pedido.productos.forEach(prodPed => {
        const copia = templatePed.content.cloneNode(true);
        let prodStock = productos.buscarId(prodPed.id);
        copia.querySelector('#tdNombre').textContent = prodPed.nombre + " (" + prodStock.stock + " disp.)";

        copia.querySelector('#spCantidad').textContent = prodPed.cantidad;
        copia.querySelector('#tdPrecio').textContent = '$ ' + prodPed.precio;
        let subtotal = prodPed.cantidad * prodPed.precio;
        totalPedido += subtotal;
        copia.querySelector('#tdSubTotal').textContent = '$ ' + subtotal;

        //Quitar el producto del carrito
        copia.querySelector('.btn-eliminar').addEventListener('click', event => {

            pedidoTemp.eliminarProducto(prodPed.id);
            armarTablaPedidos();
        });

        //Aumentar cantidad producto
        copia.querySelector('.btn-mas').addEventListener('click', event => {
            console.log(prodStock.stock);
            pedidoTemp.cambiarCantidad(prodPed, 'sumar', prodStock.stock);
            armarTablaPedidos();
        });

        //disminuir cantidad producto
        copia.querySelector('.btn-menos').addEventListener('click', event => {
            pedidoTemp.cambiarCantidad(prodPed, 'restar');
            armarTablaPedidos();
        });
        tablaPedidoProd.appendChild(copia);
    });
    //Actualizo total
    document.getElementById('totalPedido').textContent = "$ " + pedidoTemp.getTotalPedido();
}

function limpiarTablaPedidos() {
    tablaPedidoProd.innerHTML = "";
}

armarTablaPedidos();
