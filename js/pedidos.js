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
            return false;
        }

        // Crear un nuevo pedido con un ID único
        const nuevoPedido = {
            id: Date.now().toString(), // Usar timestamp como ID único
            productos: pedido.productos,
            nombre: pedido.nombre,
            apellido: pedido.apellido,
            direccion: pedido.direccion,
            estado: 'PENDIENTE',
            email: pedido.email,
            total: pedido.total
        };

        // Añadir el nuevo pedido a la lista de pedidos
        this.pedidos.push(nuevoPedido);

        // Guardar la lista actualizada de pedidos en localStorage
        localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
        return true;
    }

    updateLocalStorage() {
		//Esta condicion evita que si estoy borrando y queda un solo elemento me lo dejaba en LocalStorage
		if (this.pedidos.length === 0) {
            localStorage.removeItem("pedidos");
        } else {
            localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
        }
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

    // Obtiene la cantidad de pedidos totales
    getCantidadPedidos(){
        return this.length;
    }

    // Ordenar listado de pedidos
    ordenarPor(campo, ascendente = true) {
		this.pedidos.sort((a, b) => {
			if (a[campo] < b[campo]) return ascendente ? -1 : 1;
			if (a[campo] > b[campo]) return ascendente ? 1 : -1;
			return 0;
		});
	}

    //Filtrar pedidos
    filtrarPedidos(busqueda) {
		const busquedaUpper = busqueda.toUpperCase();
		return this.pedidos.filter((pedido) =>
			pedido.nombre.toUpperCase().includes(busquedaUpper) ||
			pedido.apellido.toUpperCase().includes(busquedaUpper) ||
            pedido.email.toUpperCase().includes(busquedaUpper) 
		);
	}

    //Filtrar pendientes
    filtrarEstado(estado = 'PENDIENTE'){
		return this.pedidos.filter((pedido) =>
			pedido.estado.toUpperCase().includes(estado) 
		);
    }

    buscarId(id) {
		return this.pedidos.find((pedido) => pedido.id.toUpperCase() == id.toUpperCase());
	}
}