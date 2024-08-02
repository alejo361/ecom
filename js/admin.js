let productos = new Productos();
productos.cargarEjemplos();

const tablaProductos = document.querySelector("#tabla-productos tbody");
const formNuevoProd = document.getElementById("formNuevoProd");
const spanCantProd = document.getElementById("cant-prod");


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
        armarTabla(productos);
    } else {
        alert("No se pudo agregar producto");
    }

}


function limpiarTabla() {
    tablaProductos.innerHTML = "";
}

function armarTabla(productos = null) {
    limpiarTabla();
    spanCantProd.innerHTML = productos.cantidad();
    if (productos.cantidad() == 0 || productos == undefined) {
        alert("entro aca ");
        fila = tablaProductos.insertRow();
        col = fila.insertCell(0);
        col.setAttribute('colspan', 6);
        col.innerHTML = "Aún no se cargaron productos";
    } else {
        console.log(productos.cantidad());
        let template = document.getElementById('fila-productos');
        productos.lista.forEach(producto => {
            let copia = template.content.cloneNode(true);
            copia.getElementById('tdcodigo').innerHTML = producto.id;
            copia.getElementById('tdrubro').innerHTML = producto.rubro;
            copia.getElementById('tdnombre').innerHTML = producto.nombre;
            copia.getElementById('tdprecio').innerHTML = "$" + producto.precio;
            copia.getElementById('tdstock').innerHTML = producto.stock;
            //eliminar
            copia.querySelector('.btn-eliminar').addEventListener('click', (event) => {
                console.log('Le diste click a ' + producto.nombre);
                console.log(event.target.parentNode.parentNode);

                if (productos.eliminarProducto(producto.id)) {
                    const filaBorrar = event.target.parentNode.parentNode;
                    filaBorrar.remove();
                    spanCantProd.innerHTML = productos.cantidad();
                }
            })
            //editar
            let btnEdit = copia.querySelector('.btn-editar');
            btnEdit.setAttribute('data-bs-whatever', producto.id);
            tablaProductos.appendChild(copia);
        });
    }
}

armarTabla(productos);


/*let buscarCodigo = document.getElementById("buscarCodigo");
buscarCodigo.addEventListener('click', () => {
    console.log("buscaste" + document.getElementById("codigo").value);
    let prodEdit = new Producto();
    productos.buscarCodigo
    //prodEdit = productos.buscarId(document.getElementById("codigo").value);
    document.getElementById("rubro").value = prodEdit.rubro;
    document.getElementById("nombre").value = prodEdit.nombre;
    //    document.getElementsByClassName("enviarForm").setAttribute('text',"Editar");
});*/

const editModal = document.getElementById('editModal')

if (editModal) {
    editModal.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget
        const idProducto = button.getAttribute('data-bs-whatever')

        document.getElementById("mdcodigo").value = idProducto;
        let producto = productos.buscarId(idProducto);
        document.getElementById("mdrubro").value = producto.rubro;
        document.getElementById("mdnombre").value = producto.nombre;
        document.getElementById("mdprecio").value = producto.precio;
        document.getElementById("mdstock").value = producto.stock;
        
        const modalTitle = document.querySelector('.modal-title')
        const modalBodyInput = document.querySelector('.modal-body input')
        const mdnombre = document.getElementById("mdnombre");
        mdnombre.value = idProducto;
        

        modalTitle.textContent = `Editar producto: ${idProducto}`
        modalBodyInput.value = idProducto
    })
}