import geb.Page

class SystemPage extends LmcBasePage {

    static content = {
        // TODO: Add additional content here
    }

    static at = {
        waitFor { $("#systemView").displayed }
        return $("#systemView").displayed
    }
}
