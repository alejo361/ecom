
class Productos {
	constructor() {
		this.lista = JSON.parse(localStorage.getItem('productos')) || [];
	}

	agregarProducto(producto) {
		if (!this.yaExisteId(producto.id)) {
			this.lista.push(producto);
			this.updateLocalStorage();
			return true;
		}
		return false;
	}

	updateLocalStorage() {
		//Esta condicion evita que si estoy borrando y queda un solo elemento me lo dejaba en LocalStorage
		if (this.lista.length === 0) {
            localStorage.removeItem("productos");
        } else {
            localStorage.setItem('productos', JSON.stringify(this.lista));
        }
	}

	vaciar(){
		this.lista = [];
		this.vaciarLocalStorage();
	}

	vaciarLocalStorage() {
		localStorage.removeItem("productos");
	}

	cantidad() {
		return (this.lista == undefined || this.lista.length == 0) ? 0 : this.lista.length;
	}

	yaExisteId(id) {
		if (this.cantidad() > 0) {
			return this.lista.some((producto) => producto.id.includes(id));
		}
		return false;
	}

	buscarId(id) {
		return this.lista.find((producto) => producto.id.toUpperCase() == id.toUpperCase());
	}
	
	incrementarPrecios(porcentaje) {
		this.lista.forEach((producto) => {
			producto.precio = parseInt(((parseInt(producto.precio) * porcentaje) / 100) + parseInt(producto.precio))
		});
		this.updateLocalStorage();
	}

	filtrarProductos(busqueda) {
		const busquedaUpper = busqueda.toUpperCase();
		return this.lista.filter((producto) =>
			producto.nombre.toUpperCase().includes(busquedaUpper) ||
			producto.rubro.toUpperCase().includes(busquedaUpper)
		);
	}

	ordenarPor(campo, ascendente = true) {
		this.lista.sort((a, b) => {
			if (a[campo] < b[campo]) return ascendente ? -1 : 1;
			if (a[campo] > b[campo]) return ascendente ? 1 : -1;
			return 0;
		});
	}

	eliminarProducto(id) {
		console.log("id a liminar" + id)
		let indice = this.lista.findIndex((producto) => producto.id.toUpperCase() === id.toUpperCase());
		console.log("indice encontrado" + indice)
		if (indice != -1) {
			this.lista.splice(indice, 1);
			this.updateLocalStorage();
			return true;
		}
		console.log(indice);
		return false;
	}

}