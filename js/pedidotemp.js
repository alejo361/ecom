/*
    Esta clase maneja el pedido temporal que se almacena en sessionStorage
    es UN solo pedido (1 o varios prod) de una persona.
*/
class PedidoTemporal {
    constructor() {
        this.pedido = JSON.parse(sessionStorage.getItem('pedidoTemporal')) || {
            productos: [],
            nombre: '',
            apellido: '',
            direccion: '',
            email: '',
            estado: 'PENDIENTE',
            total: 0
        };
    }

    // Agrega un producto al pedido
    agregarProducto(producto, stock) {
        const productoExistente = this.pedido.productos.find(p => p.id === producto.id);
        if (productoExistente) {
            // Actualiza la cantidad del producto si ya existe y hay stock
            if(productoExistente.cantidad >= stock){
                return false;    
            }
            productoExistente.cantidad += producto.cantidad            
        } else {
            // Añade el nuevo producto al pedido
            this.pedido.productos.push(producto);
        }
        this.guardarSession();
        return true;
    }

    //Suma o resta una unidad a la cantidad pedida
    cambiarCantidad(producto, operacion = 'sumar', stock = 0) {
        const productoExistente = this.pedido.productos.find(p => p.id === producto.id);
        if (operacion == 'sumar') { //al sumar evaluo si hay stock disponible
            productoExistente.cantidad < stock ? productoExistente.cantidad++ : productoExistente.cantidad;
        }
        if (operacion == 'restar') {//al restar evaluo que no sea < 1 la cantidad
            (productoExistente.cantidad > 1) ? productoExistente.cantidad-- : productoExistente.cantidad;
        }
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

    //Retorna la cantidad de productos del pedido.
    getCantProdCarrito() {
        return this.pedido.productos.length || 0
    }

    //Controla el pedido, devuelve mixed, el mensaje o true
    checkPedido() {
        let mensaje = '';
        if (this.pedido.nombre == '') {
            mensaje = '- Tu nombre es requerido. ';
        }
        if (this.pedido.apellido == '') {
            mensaje = mensaje + '- Tu apellido es requerido. ';
        }
        if (this.pedido.direccion == '') {
            mensaje = mensaje + '- La dirección del envio es requerida. ';
        }
        if (this.pedido.email == '') {
            mensaje = mensaje + '- La dirección de correo electrónico es requerida. ';
        }        
        if (this.getCantProdCarrito() == 0) {
            mensaje = mensaje + '- Tu pedido no tiene productos.'
        }
        if (mensaje == '') {
            return true;
        }
        return mensaje;
    }

    // Establece los datos del cliente
    establecerDatosCliente(nombre, apellido, direccion, email) {
        this.pedido.nombre = nombre;
        this.pedido.apellido = apellido;
        this.pedido.direccion = direccion;
        this.pedido.email = email
        this.guardarSession();
    }

    // Limpia el pedido actual
    vaciarPedido() {
        this.pedido = {
            productos: [],
            nombre: '',
            apellido: '',
            direccion: '',
            email: '',
            estado: '',
            total: 0
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
            return false;
        }

        // Usa la clase Pedidos para manejar pedidos confirmados
        // que almacena en localStorage
        // EN UN CASO REAL DEBERIA CONFIRMAR LA DISPONIBILIDAD DE CADA PRODUCTO AQUI
        // YA QUE NO PUEDO DAR DE BAJA STOCK EN UN PEDIDO SIN CONFIRMAR, PERO TAMPOCO PUEDO VENDER 
        // UN PRODUCTO QUE SE AGOTE (por ej otro usuario compra mientras otro completa el formulario)
        const pedidosConfirmados = new Pedidos();
        const resultado = pedidosConfirmados.agregarPedido({
            productos: this.pedido.productos,
            nombre: this.pedido.nombre,
            apellido: this.pedido.apellido,
            direccion: this.pedido.direccion,
            email: this.pedido.email,
            estado: 'PENDIENTE',
            total: this.getTotalPedido()
        });

        if (resultado) {
            // Vacia el pedido en sessionStorage
            this.vaciarPedido();
            //console.log("Pedido confirmado y almacenado en localStorage.");
            return true;
        }
        return false;
    }

    // Obtener los productos en el pedido
    obtenerProductos() {
        return this.productos;
    }

}