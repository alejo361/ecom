//CONTROL DE PERMISOS
let login = new Login();

login.check();
const logout = document.getElementById("logout");
logout.addEventListener('click', (event) => {
    login.salir();
    window.location.replace("../index.html");
})

let productos = new Productos();
let pedidos = new Pedidos();

//POBLAR SELECT SEGUN rubros 
let estadosPedidos = ['PENDIENTE', 'FINALIZADO'];
function llenarSelect(select) {
    estadosPedidos.forEach((estado) => {
        let opt = document.createElement("option");
        opt.text = estado;
        opt.value = estado;
        select.appendChild(opt);
    });
}

llenarSelect(mdEstado);

const tablaPedidos = document.querySelector("#tabla-pedidos tbody");
const spanCantPed = document.getElementById("cant-ped");
const verModal = document.getElementById('verModal')

// TABLA VACIAR
function limpiarTabla() {
    tablaPedidos.innerHTML = "";
}

//TABLA LLENAR OPC: resultados filtrados
function armarTabla(filtrados = null) {
    limpiarTabla();
    const pedidosMostrar = filtrados || pedidos.pedidos;
    spanCantPed.innerHTML = pedidosMostrar.length;
    console.log(pedidosMostrar)
    if (pedidosMostrar.length === 0) {
        const fila = tablaPedidos.insertRow();
        const col = fila.insertCell(0);
        col.setAttribute('colspan', 6);
        col.innerHTML = "No se encontraron pedidos";
    } else {
        const template = document.getElementById('fila-pedido');
        pedidosMostrar.forEach(pedido => {
            const copia = template.content.cloneNode(true);
            copia.querySelector('#tdid').textContent = pedido.id;
            copia.querySelector('#tdnombre').textContent = pedido.nombre;
            copia.querySelector('#tdapellido').textContent = pedido.apellido;
            copia.querySelector('#tdestado').textContent =  pedido.estado;
            copia.querySelector('#tdtotal').textContent = "$ " + pedido.total;

            // Eliminar
            copia.querySelector('.btn-eliminar').addEventListener('click', event => {
                /*if (productos.eliminarProducto(producto.id)) {
                    const filaBorrar = event.target.closest('tr');
                    filaBorrar.remove();
                    spanCantPed.innerHTML = productos.cantidad();
                }*/
            });

            // Ver detalle
            const btnVer = copia.querySelector('.btn-detalle');
            btnVer.setAttribute('data-bs-whatever', pedido.id);
            tablaPedidos.appendChild(copia);
        });
    }
}

//CAMBIAR ESTADO PEDIDO MODAL / PRECARGA DE VALORES / RELOAD DE TABLA
if (verModal) {
    verModal.addEventListener('show.bs.modal', event => {
        //Obtendo el id del producto
        const button = event.relatedTarget;
        const totalMdPedido = document.getElementById('totalMdPedido');
        const idPedido = button.getAttribute('data-bs-whatever');
        const bodyModalPedidos = document.getElementById('bodyModalPedidos');
        let pedido = pedidos.buscarId(idPedido);
        console.log(pedido);
        console.log(pedido.estado)
        //Relleno el formulario con los valores
        document.getElementById("mdCodigo").value = idPedido;
        document.getElementById("mdEstado").value = pedido.estado;
        //armar detalle de productos
        bodyModalPedidos.innerHTML = '';
        pedido.productos.forEach(producto => {
            console.log(producto)
            bodyModalPedidos.innerHTML += `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$ ${(producto.cantidad * producto.precio)}</td>
            </tr>`;
        });
        totalMdPedido.textContent = "$ "+ pedido.total;
        
    })
    verModal.addEventListener('hidden.bs.modal', event => {
        armarTabla(pedidos.obtenerPedidos());
    })
}

//MODIFICAR ESTADO PEDIDO BOTON Y OPERACION
const btnModificar = document.getElementById('btnMdSave');
btnModificar.addEventListener('click', (event) => {
    let valido = true;
    pedEdit = pedidos.buscarId(document.getElementById("mdCodigo").value);

    if (valido) {
        /*prodEdit.editarProducto(document.getElementById("mdrubro").value,
            document.getElementById("mdnombre").value,
            document.getElementById("mdprecio").value,
            document.getElementById("mdstock").value
        );*/
        //productos.updateLocalStorage();
        document.getElementById('closeMdVer').click();
    }

})

//BUSQUEDA DE PEDIDOS
const btnBuscarPed = document.getElementById('btnBuscarPed');
btnBuscarPed.addEventListener('click', (event) => {
    let resultados = pedidos.filtrarPedidos(document.getElementById("textBusqueda").value);
    armarTabla(resultados);
})

//COMPORTAMIENTO CLICK EN TH PARA ORDENAR
document.addEventListener('DOMContentLoaded', () => {
    const tablaPedidos = document.getElementById('tabla-pedidos');
    const encabezados = tablaPedidos.querySelectorAll('thead th');

    encabezados.forEach(th => {
        th.addEventListener('click', () => {
            const campo = th.getAttribute('data-campo');
            if (campo != 'no') { //si no es la columna Acciones
                const ordenAscendente = th.classList.contains('asc');
                // Alternar entre orden ascendente y descendente
                const nuevoOrden = ordenAscendente ? 'desc' : 'asc';
                th.classList.toggle('asc', nuevoOrden === 'asc');
                th.classList.toggle('desc', nuevoOrden === 'desc');
                // Ordenar y actualizar la tabla
                pedidos.ordenarPor(campo, nuevoOrden === 'asc');
                armarTabla(pedidos.obtenerPedidos());
            }
        });
    });
});

armarTabla(pedidos.obtenerPedidos());