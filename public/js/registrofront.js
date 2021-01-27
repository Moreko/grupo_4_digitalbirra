const formulario = document.querySelector(".cont__form");
const email = document.querySelector('#logMail');
const password = document.querySelector('#logPassword')


let errores ={}
function isEmail(email){
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLowerCase());
}
function validate(password) {
return /^(?=.*[0-9]+)[A-Za-z0-9]{6,}$/.test(password);
// return /^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)[A-Za-z0-9]{6,}$/.test(password);
}



formulario.addEventListener('focusout', function(event) {
    checkInputs()
    if (Object.keys(errores).length>0){
    event.preventDefault();
    }
    

})

function checkInputs() {
    const emailValue = email.value.trim();
    const passValue = password.value.trim()

    if (!isEmail(emailValue)) {
       setError(email,'El email no es un formato valido!')
    }else{
        setSucces(email)
    }
    if(!validate(passValue)){
        setError(password,"Tiene que tener al menos 6 caracteres")
    }else{
        setSucces(password)
    }
    }
    console.log(Object.keys(errores).length);

    function setError(input,message){
        let formControl = input.parentElement
        let small = formControl.querySelector('small')
        small.innerText = message
        formControl.className = 'formControl.error'
        errores[input.name] = message
    }
    function setSucces(input){
        let formControl = input.parentElement
        let small = formControl.querySelector('small')
        formControl.className = 'formControl.succes'
        small.innerText = " "
        delete  errores[input.name]
    }
