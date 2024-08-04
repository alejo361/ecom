/*
    Esta clase controla el ingreso a ciertos lugares del proyecto 
*/
class Login{
    constructor() {
        this.rol = 'administrador';//sin uso de momento
        this.usuario = null;
        this.isLogued = null;
        this.mensaje = "";
    }

    ingresar(usuario, clave){
        this.usuario = usuario;
        if(this.usuario == 'admin' && clave == 'admin'){
            this.isLogued = true;
            sessionStorage.setItem("isLogued", "true");
            sessionStorage.setItem("usuario", usuario);
            sessionStorage.setItem("rol", "administrador");
            this.mensaje = ""
            window.location.assign("./vistas/admin.html");
        }else{
            this.isLogued = false;
            this.mensaje = "El usuario y/o la contraseña no son correctos."
            sessionStorage.setItem("isLogued", "false");
        }
        console.log(this);
    }

    salir(){
        sessionStorage.clear();
        //Lo envio al inicio
        window.location.assign("../index.html");
    }

    check(){
        console.log(sessionStorage.getItem("isLogued"));
        if(sessionStorage.getItem("isLogued")== 'true'){
            this.usuario = sessionStorage.getItem("usuario");
            this.rol = sessionStorage.getItem("rol");
            this.isLogued = true;
        }else{
            //Lo envio al inicio
            window.location.assign("../index.html");
        }

    }
}