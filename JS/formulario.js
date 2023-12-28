const nombre = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entry = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    let letras = /^[A-Za-z]+$/
    parrafo.innerHTML = ""
    if((nombre.value.length < 3) || (!letras.test(nombre.value))){
        warnings += `El nombre no es valido <br>`
        entry = true
    }
    console.log(regexEmail.test(email.value))
    if(!regexEmail.test(email.value)){
        warnings += `El email no es valido <br>`
        entry = true
    }
    if(password.value.length < 8){
        warnings += `La contraseña no es valida <br>`
        entry = true
    }
    if(entry){
        parrafo.innerHTML = warnings
    }else{
        parrafo.innerHTML = "¡Te has registrado!"
    }
})