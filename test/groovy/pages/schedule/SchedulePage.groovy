import geb.Page

class SchedulePage extends LmcBasePage {

    static content = {
        // TODO: Add additional content here
    }

    static at = {
        waitFor { $("#scheduleView").displayed }
        return $("#scheduleView").displayed
    }
}