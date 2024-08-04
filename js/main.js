/* 
La funcionalidad de la muestra de los productos y agregar al carrito sera en la proxima entrega
para el mejor manejo de datos, imagenes e implementacion de mas clases.
*/
let login = new Login();


const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', (event) => {
    let usuario = document.getElementById("mdUsuario").value;
    let clave = document.getElementById("mdPass").value;
    console.log("datos de acceso"+usuario+clave);
    login.ingresar(usuario, clave);
    //login.check();
    document.getElementById("mdMensaje").textContent = login.mensaje;

});