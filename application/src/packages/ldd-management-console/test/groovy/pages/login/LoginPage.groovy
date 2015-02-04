import geb.Page

class LoginPage extends Page {
    static url = "#login"

    static content = {
        inputUsername { $('#txtLogin') }
        inputPassword { $('#txtPassword') }
        buttonConnect { $('#btnLogin') }
        alertError(required:false) {  $('#errorMessage') }
    }

    static at = {
        waitFor { $("#login-form").displayed }
        return title.startsWith("Perceptive Evolution")
    }

    void login(String user, String password) {
        inputUsername.value(user)
        inputPassword.value(password)
        buttonConnect.click()
    }
}
