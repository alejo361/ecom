//CONTROL DE PERMISOS
let login = new Login();

login.check();
const logout = document.getElementById("logout");
logout.addEventListener('click', (event) => {
    login.salir();
    window.location.replace("../index.html");
})

let productos = new Productos();

//POBLAR SELECT SEGUN rubros 
const rubrosSel = document.getElementById("rubro");
const rubrosSelMd = document.getElementById("mdrubro");
let rubros = ['COMPUTADORAS', 'TABLETS', 'CELULARES', 'PERIFERICOS', 'MONITORES'];

function llenarSelect(select) {
    rubros.forEach((rubro) => {
        let opt = document.createElement("option");
        opt.text = rubro;
        opt.value = rubro;
        select.appendChild(opt);
    });
}

llenarSelect(rubrosSel);
llenarSelect(rubrosSelMd);


const tablaProductos = document.querySelector("#tabla-productos tbody");
const formNuevoProd = document.getElementById("formNuevoProd");
const spanCantProd = document.getElementById("cant-prod");
const editModal = document.getElementById('editModal')

//PRODUCTO AGREGAR NUEVO
formNuevoProd.addEventListener("submit", agregarNuevoProd);
function agregarNuevoProd(e) {
    e.preventDefault();
    const id = document.getElementById("codigo");
    const rubro = document.getElementById("rubro");
    const nombre = document.getElementById("nombre");
    const precio = document.getElementById("precio");
    const stock = document.getElementById("stock");
    if (productos.agregarProducto(new Producto(id.value, rubro.value, nombre.value, precio.value, stock.value))) {
        formNuevoProd.reset();
        armarTabla(productos.lista);
    } else {
        alert("No se pudo agregar producto");
    }
}

// TABLA VACIAR
function limpiarTabla() {
    tablaProductos.innerHTML = "";
}

//TABLA LLENAR OPC: resultados filtrados
function armarTabla(listaProductos = null) {
    limpiarTabla();
    const productosMostrar = listaProductos || productos.lista;
    spanCantProd.innerHTML = productosMostrar.length;

    if (productosMostrar.length === 0) {
        const fila = tablaProductos.insertRow();
        const col = fila.insertCell(0);
        col.setAttribute('colspan', 6);
        col.innerHTML = "No se encontraron productos";
    } else {
        const template = document.getElementById('fila-productos');
        productosMostrar.forEach(producto => {
            const copia = template.content.cloneNode(true);
            copia.querySelector('#tdcodigo').textContent = producto.id;
            copia.querySelector('#tdrubro').textContent = producto.rubro;
            copia.querySelector('#tdnombre').textContent = producto.nombre;
            copia.querySelector('#tdprecio').textContent = "$" + producto.precio;
            copia.querySelector('#tdstock').textContent = producto.stock;

            // Eliminar
            copia.querySelector('.btn-eliminar').addEventListener('click', event => {
                if (productos.eliminarProducto(producto.id)) {
                    const filaBorrar = event.target.closest('tr');
                    filaBorrar.remove();
                    spanCantProd.innerHTML = productos.cantidad();
                }
            });

            // Editar
            const btnEdit = copia.querySelector('.btn-editar');
            btnEdit.setAttribute('data-bs-whatever', producto.id);
            tablaProductos.appendChild(copia);
        });
    }
}

//EDITAR PRODUCTO MODAL / PRECARGA DE VALORES / RELOAD DE TABLA
if (editModal) {
    editModal.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget;
        const idProducto = button.getAttribute('data-bs-whatever');

        document.getElementById("mdcodigo").value = idProducto;
        let producto = productos.buscarId(idProducto);
        document.getElementById("mdrubro").value = producto.rubro;
        document.getElementById("mdnombre").value = producto.nombre;
        document.getElementById("mdprecio").value = producto.precio;
        document.getElementById("mdstock").value = producto.stock;
    })
    editModal.addEventListener('hidden.bs.modal', event => {
        armarTabla(productos.lista);
    })
}

//EDITAR PRODUCTO BOTON Y OPERACION
const btnModificar = document.getElementById('btnMdSave');
btnModificar.addEventListener('click', (event) => {
    prodEdit = productos.buscarId(document.getElementById("mdcodigo").value);
    prodEdit.editarProducto(document.getElementById("mdrubro").value,
        document.getElementById("mdnombre").value,
        document.getElementById("mdprecio").value,
        document.getElementById("mdstock").value
    );
    productos.updateLocalStorage();
    document.getElementById('closeMdEdit').click();
})

//REMARCAR PRODUCTOS
const btnMdRemar = document.getElementById('btnMdRemar');
btnMdRemar.addEventListener('click', (event) => {
    productos.incrementarPrecios(document.getElementById("mdRemar").value);
    document.getElementById('closeMd').click();
    armarTabla();
})

//BUSQUEDA DE PRODUCTOS
const btnBuscarProd = document.getElementById('btnBuscarProd');
btnBuscarProd.addEventListener('click', (event) => {
    let resultados = productos.filtrarProductos(document.getElementById("textBusqueda").value);
    armarTabla(resultados);
})

//COMPORTAMIENTO CLICK EN TH PARA ORDENAR
document.addEventListener('DOMContentLoaded', () => {
    const tablaProductos = document.getElementById('tabla-productos');
    const encabezados = tablaProductos.querySelectorAll('thead th');

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
                productos.ordenarPor(campo, nuevoOrden === 'asc');
                armarTabla(productos.lista);
            }
        });
    });
});

//CARGAR PRODUCTOS DE EJEMPLO
const btnLoadEj = document.getElementById('btnLoadEj');
btnLoadEj.addEventListener('click', (event) => {
    cargarEjemplos();
    armarTabla(productos.lista);
});

function cargarEjemplos() {
    const ejemplos = [
        new Producto('0001', 'COMPUTADORAS', 'LAPTOP ASUS', 65000, 8),
        new Producto('0002', 'COMPUTADORAS', 'DESKTOP HP', 75000, 10),
        new Producto('0003', 'CELULARES', 'SAMSUNG GALAXY S21', 60000, 15),
        new Producto('0004', 'TABLETS', 'IPAD AIR', 40000, 20),
        new Producto('0005', 'COMPUTADORAS', 'LAPTOP DELL', 70000, 12),
        new Producto('0006', 'COMPUTADORAS', 'MINI PC LENOVO', 50000, 7),
        new Producto('0007', 'CELULARES', 'IPHONE 12', 80000, 5),
        new Producto('0008', 'TABLETS', 'SAMSUNG GALAXY TAB S7', 55000, 10),
        // Añade más productos si es necesario
    ];
    productos.lista = ejemplos;
    productos.updateLocalStorage();
}

//CARGAR PRODUCTOS DE EJEMPLO
const btnEliminarTodo = document.getElementById('btnEliminarTodo');
btnEliminarTodo.addEventListener('click', (event) => {
    productos.vaciar();
    armarTabla(productos.lista);
});

armarTabla(productos.lista);