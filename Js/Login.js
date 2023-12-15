import { LoginTemplate, UserTemplate } from "./Objetos.js";
import { PeticionesManagement } from "./PeticionesLogin.js";


// cargar modulo de peticiones
const peticiones = new PeticionesManagement();
document.getElementById('register-btn').addEventListener("click", registerUser);
document.getElementById('login-btn').addEventListener("click", loginUser);

function checkNulls(array){
    return array.some(p => p == null || p == "");
}

async function registerUser() {
   // const registerName = document.getElementById('registerName').value;
    //const registerLastName = document.getElementById('registerLastName').value;
    const registerUsername = document.getElementById('registerUsername').value;
    const registerEmail = document.getElementById('registerEmail').value;
    const registerPassword = document.getElementById('registerPassword').value;
    const registerRepeatPassword = document.getElementById('registerRepeatPassword').value;
    
    if(registerPassword != registerRepeatPassword){
        alert("Passwords don´t match");
        return;
    }

    const User = new UserTemplate(registerUsername.trim(), registerEmail, registerPassword);
    if( checkNulls(Object.values(User)))
    {
        alert("you have to fill out all the fields");
        return;
    }
    var response = await peticiones.PostDatos(User, "User/Register");
    alert(await response.text());
}

async function loginUser(){
    const loginName = document.getElementById('loginName').value.trim();
    const loginPassword = document.getElementById('loginPassword').value;
    const LoginUser = new LoginTemplate(loginName, loginPassword)
    if( checkNulls(Object.values(LoginUser)))
    {
        alert("you have to fill out all the fields");
        return;
    }
    var response = await (await peticiones.PostDatos(LoginUser, "User/Token")).json();
    if(response.message == "OK")
    {
        window.location.href = "../Views/login.html";
    }else{
        alert(response.message);
    }
}