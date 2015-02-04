import geb.Page
//import com.ldd.modules.DrawerModule

class HomePage extends LmcBasePage {
    static url = "#lmc"

    static content = {
        alertMessage { $('span', class: 'alert-message') }
    }

    static at = {
        waitFor { $("#mainExampleView").displayed }
        return title.startsWith("Perceptive Evolution")
    }
}
