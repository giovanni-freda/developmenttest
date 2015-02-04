import geb.Page

class SoftwareClientGroupsPage extends LmcBasePage {

    static content = {
        // TODO: Add additional content here
    }

    static at = {
        waitFor { $("#softwareClientGroupsView").displayed }
        return $("#softwareClientGroupsView").displayed
    }
}