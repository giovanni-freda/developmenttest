import geb.Page

class ServicesPage extends LmcBasePage {

    static content = {
        // TODO: Add additional content here
    }

    static at = {
        waitFor { $("#servicesView").displayed }
        return $("#servicesView").displayed
    }
}