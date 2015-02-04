import geb.Page

class LogsPage extends LmcBasePage {

    static content = {
        // TODO: Add additional content here
    }

    static at = {
        waitFor { $("#logsView").displayed }
        return $("#logsView").displayed
    }
}