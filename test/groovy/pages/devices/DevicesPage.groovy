import geb.Page

class DevicesPage extends LmcBasePage {

    static content = {
        // TODO: Add additional content here
    }

    static at = {
        waitFor { $("#devicesView").displayed }
        return $("#devicesView").displayed
    }
}