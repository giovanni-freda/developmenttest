import geb.Page

class DeviceGroupsPage extends LmcBasePage {

    static content = {
        // TODO: Add additional content here
    }

    static at = {
        waitFor { $("#deviceGroupsView").displayed }
        return $("#deviceGroupsView").displayed
    }
}