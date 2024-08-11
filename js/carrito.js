/*
    Este arhivo contiene la logica y manejo de DOM de pedido.html
*/
let pedidoTemp = new PedidoTemporal();

console.log(pedidoTemp);
//CARGO LA TABLA DEL PEDIDO
const tablaPedidoProd = document.querySelector('#tabla-productos-pedido tbody');
const templatePed = document.getElementById('fila-pedido');

function armarTablaPedidos(){
    limpiarTablaPedidos();

    pedidoTemp.pedido.productos.forEach(prodPed => {    
        const copia = templatePed.content.cloneNode(true);
    
        copia.querySelector('#tdNombre').textContent = prodPed.nombre;
        copia.querySelector('#spCantidad').textContent = prodPed.cantidad;
        copia.querySelector('#tdPrecio').textContent = '$ '+ prodPed.precio;
        let subtotal = prodPed.cantidad * prodPed.precio;
        totalPedido += subtotal;
        copia.querySelector('#tdSubTotal').textContent = '$ '+ subtotal;
    
        //Quitar el producto del carrito
        copia.querySelector('.btn-eliminar').addEventListener('click', event => {
            
            pedidoTemp.eliminarProducto(prodPed.id);
            armarTablaPedidos();
        });

        //Aumentar cantidad producto
        copia.querySelector('.btn-mas').addEventListener('click', event => {
            pedidoTemp.cambiarCantidad(prodPed,'sumar');
            armarTablaPedidos();
        });

        //disminuir cantidad producto
        copia.querySelector('.btn-menos').addEventListener('click', event => {
            pedidoTemp.cambiarCantidad(prodPed,'restar');
            armarTablaPedidos();
        });
        tablaPedidoProd.appendChild(copia);
    });
    //Actualizo total
    document.getElementById('totalPedido').textContent = "$ "+pedidoTemp.getTotalPedido();
}

function limpiarTablaPedidos(){
    tablaPedidoProd.innerHTML = "";
}


armarTablaPedidos();



//CARGO DATOS ENTREGA DEL PEDIDO


//SI FINALIZA EL PEDIO LO PASO A localStorage y lo ELIMINO DE sessionStorage