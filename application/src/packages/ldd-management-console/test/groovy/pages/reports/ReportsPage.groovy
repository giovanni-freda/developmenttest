import geb.Page

class ReportsPage extends LmcBasePage {

    static content = {
        // TODO: Add additional content here
    }

    static at = {
        waitFor { $("#reportsView").displayed }
        return $("#reportsView").displayed
    }
}