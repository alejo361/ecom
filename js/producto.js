class Producto {
    constructor(id, rubro, nombre, precio, stock) {
        this.id = id;
        this.rubro = rubro;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    editarProducto(rubro, nombre, precio, stock) {
        this.rubro = rubro;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}
