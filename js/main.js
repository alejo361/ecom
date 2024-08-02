/* Cargar productos de ejemplo */

//localStorage.setItem('alumno', JSON.stringify(alumno))

let productos = new Productos();
productos.cargarEjemplos();
/* Permitir inicio de sesion */
/* Mostrar los productos de la HOME*/
const productosStorage = JSON.parse(localStorage.getItem('lista'));//localStorage.getItem('lista');//JSON.parse(productosStorage);
//const 
//console.log((JSON.parse(productosStorage))[0].nombre);
//localStorage.getItem('userInfo')