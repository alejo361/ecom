/*
    Esta clase maneja el pedido temporal que se almacena en sessionStorage
    es UN solo pedido de una persona.
*/
class PedidoTemporal {
    constructor() {
        //this.cargarPedido();
        this.pedido = JSON.parse(sessionStorage.getItem('pedidoTemporal')) || {
            productos: [],
            nombre: '',
            apellido: '',
            direccion: ''
        };
    }

    // Agrega un producto al pedido
    agregarProducto(producto) {
        const productoExistente = this.pedido.productos.find(p => p.id === producto.id);
        if (productoExistente) {
            // Actualiza la cantidad del producto si ya existe
            productoExistente.cantidad += producto.cantidad;
        } else {
            // Añade el nuevo producto al pedido
            this.pedido.productos.push(producto);
        }
        this.guardarSession();
    }

    //Suma o resta una unidad a la cantidad pedida
    cambiarCantidad(producto, operacion = 'sumar') {
        const productoExistente = this.pedido.productos.find(p => p.id === producto.id);
        if(operacion == 'sumar'){
            productoExistente.cantidad++;
        }
        if(operacion == 'restar'){
            if(productoExistente.cantidad > 0){
                productoExistente.cantidad--;
            }
        }
        console.log(productoExistente.cantidad);
        this.guardarSession();
    }

    // Elimina un producto del pedido por ID
    eliminarProducto(id) {
        this.pedido.productos = this.pedido.productos.filter(p => p.id !== id);
        this.guardarSession();
    }

    //Calcula total del pedido
    getTotalPedido() {
        return this.pedido.productos.reduce((total, producto) => {
            const precio = parseInt(producto.precio) || 0;
            const cantidad = parseInt(producto.cantidad) || 0;
            return total + (precio * cantidad);
        }, 0);
    }

    // Establece los datos del cliente
    establecerDatosCliente(nombre, apellido, direccion) {
        this.pedido.nombre = nombre;
        this.pedido.apellido = apellido;
        this.pedido.direccion = direccion;
        this.guardarSession();
    }

    // Limpia el pedido actual
    vaciarPedido() {
        this.pedido = {
            productos: [],
            nombre: '',
            apellido: '',
            direccion: ''
        };
        this.guardarSession();
    }

    // Guarda el pedido en sessionStorage
    guardarSession() {
        sessionStorage.setItem('pedidoTemporal', JSON.stringify(this.pedido));
    }

    // Confirma el pedido y lo guarda en localStorage usando HistorialPedidos
    confirmarPedido() {
        if (this.pedido.productos.length === 0) {
            console.log("El pedido está vacío. No se puede confirmar el pedido.");
            return false;
        }

        // Usa la clase Pedidos para manejar pedidos confirmados
        const historial = new Pedidos();
        const resultado = historial.agregarPedido({
            productos: this.pedido.productos,
            nombre: this.pedido.nombre,
            apellido: this.pedido.apellido,
            direccion: this.pedido.direccion
        });

        if (resultado) {
            // Vacia el pedido en sessionStorage
            this.vaciarPedido();
            console.log("Pedido confirmado y almacenado en localStorage.");
            return true;
        }

        return false;
    }

    // Obtener los productos en el pedido
    obtenerProductos() {
        return this.productos;
    }

    // Obtener los datos del cliente
    obtenerDatosCliente() {
        return {
            nombre: this.pedido.nombre,
            apellido: this.pedido.apellido,
            direccion: this.pedido.direccion
        };
    }
}