import geb.Page

class JobsPage extends LmcBasePage {

    static content = {
        // TODO: Add additional content here
    }

    static at = {
        waitFor { $("#jobsView").displayed }
        return $("#jobsView").displayed
    }
}