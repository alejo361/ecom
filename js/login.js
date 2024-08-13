/*
    Esta clase controla el ingreso a ciertos lugares del proyecto 
    CAMBIO DE CRITERIO: 
    Para compras no hace falta ser usuario registrado.
    Solo inicia sesion el administrador para administrar el AMB de Productos y ver Pedidos
    No tenia mucho sentido implementar toda esta funcionalidad y que sea inseguro, en el curso de React o Node se hara bien.
*/
class Login {
    constructor() {
        this.rol = 'administrador';//sin uso 
        this.usuario = null;
        this.isLogued = null;
        this.mensaje = "";
    }

    ingresar(usuario, clave, ruta) {
        this.usuario = usuario;
        if (this.usuario == 'admin' && clave == 'admin') {
            this.isLogued = true;
            sessionStorage.setItem("isLogued", "true");
            sessionStorage.setItem("usuario", usuario);
            sessionStorage.setItem("rol", "administrador");
            this.mensaje = ""
            if(ruta == 'home'){
                window.location.replace("./vistas/admin.html")
            }else{
                window.location.replace("../vistas/admin.html");
            }
            
        } else {
            this.isLogued = false;
            this.mensaje = "El usuario y/o la contraseña no son correctos."
            sessionStorage.setItem("isLogued", "false");
        }
        console.log(this);
    }

    salir() {
        sessionStorage.clear();
        //Lo envio al inicio
        window.location.replace("../index.html");
    }

    check() {
        if (sessionStorage.getItem("isLogued") == 'true') {
            this.usuario = sessionStorage.getItem("usuario");
            this.rol = sessionStorage.getItem("rol");
            this.isLogued = true;
        } else {
            //Lo envio al inicio
            window.location.replace("../index.html");
        }

    }
}