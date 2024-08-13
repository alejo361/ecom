/* INICIO SESSION */
let login = new Login();
const mdLogin = document.getElementById('mdLogin');
const btnLogin = document.getElementById('btnLogin');
const frmLogin = document.getElementById('formLogin');


if (mdLogin) {
    mdLogin.addEventListener('show.bs.modal', event => {
        frmLogin.addEventListener("submit", ingresar);
    })
    mdLogin.addEventListener('hidden.bs.modal', event => {
        document.getElementById("mdMensaje").textContent = "";
    })
}


function ingresar(e) {
    e.preventDefault();
    let usuario = document.getElementById("mdUsuario").value;
    let clave = document.getElementById("mdPass").value;
    let ubi = document.getElementById("ubi").value;
    /*console.log("datos de acceso" + usuario + clave);
    console.log(ubi);*/
    login.ingresar(usuario, clave, ubi);
    document.getElementById("mdMensaje").textContent = login.mensaje;
}

/*btnLogin.addEventListener('click', (event) => {
    let usuario = document.getElementById("mdUsuario").value;
    let clave = document.getElementById("mdPass").value;
    console.log("datos de acceso" + usuario + clave);
    login.ingresar(usuario, clave);
    //login.check();
    document.getElementById("mdMensaje").textContent = login.mensaje;

});*/