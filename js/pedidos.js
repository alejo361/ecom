/*
    Esta clase controla los pedidos confirmados, estos son almacenados en el localStorage
    y son uno o muchos
*/
class Pedidos {
    constructor() {
        this.pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    }

    // Agrega un nuevo pedido
    agregarPedido(pedido) {
        if (!pedido || !pedido.productos || pedido.productos.length === 0) {
            console.log("Pedido inválido.");
            return false;
        }

        // Crear un nuevo pedido con un ID único
        const nuevoPedido = {
            id: Date.now().toString(), // Usar timestamp como ID único
            productos: pedido.productos,
            nombre: pedido.nombre,
            apellido: pedido.apellido,
            direccion: pedido.direccion
        };

        // Añadir el nuevo pedido a la lista de pedidos
        this.pedidos.push(nuevoPedido);

        // Guardar la lista actualizada de pedidos en localStorage
        localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
        return true;
    }

    // Obtiene todos los pedidos almacenados
    obtenerPedidos() {
        return this.pedidos;
    }

    // Elimina un pedido por ID
    eliminarPedido(id) {
        this.pedidos = this.pedidos.filter(p => p.id !== id);
        localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
    }
}