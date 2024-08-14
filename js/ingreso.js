/* INICIO SESSION */
let login = new Login();
const mdLogin = document.getElementById('mdLogin');
const btnLogin = document.getElementById('btnLogin');
const frmLogin = document.getElementById('formLogin');

//comportamiento modal
if (mdLogin) {
    mdLogin.addEventListener('show.bs.modal', event => {
        frmLogin.addEventListener("submit", ingresar);
    })
    mdLogin.addEventListener('hidden.bs.modal', event => {
        document.getElementById("mdMensaje").textContent = "";
    })
}

//ingreso
function ingresar(e) {
    e.preventDefault();
    let usuario = document.getElementById("mdUsuario").value;
    let clave = document.getElementById("mdPass").value;
    let ubi = document.getElementById("ubi").value;

    login.ingresar(usuario, clave, ubi);
    document.getElementById("mdMensaje").textContent = login.mensaje;
}