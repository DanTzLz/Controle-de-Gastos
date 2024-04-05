const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: ()=> document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequireError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
}

function onChangeEmail(){
    toggleButtonDisable();
    toggleEmailErrors();
}

function onChangePassword(){
    toggleButtonDisable();
    togglePasswordErrors()
}

function login(){
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value)
    .then(response => {
        window.location.href = "pages/home.html";
    }).catch(error => {
        alert(getErrorMessage(error))
    });
}

function getErrorMessage(error){
    if (error.code == "auth/invalid-credential"){
        return "Usuário não encontrado";
    }
    return error.message;
}

function register(){
    window.location.href = "pages/register.html"
}

function isEmailValid(){

    const email = form.email().value;
    if(!email){
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid(){
    const password = form.password().value;
    if(!password){
        return false;
    }
    return true
}

function toggleEmailErrors(){
    const email = form.email().value
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors(){
    const password = form.password().value;

    form.passwordRequireError().style.display = password ? "none" : "block";
}

function toggleButtonDisable(){
    const emailValid = document.getElementById("email").value;
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;

}