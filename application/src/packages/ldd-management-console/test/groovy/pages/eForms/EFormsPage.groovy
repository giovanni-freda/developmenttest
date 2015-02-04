import geb.Page

class EFormsPage extends LmcBasePage {

    static content = {
        // TODO: Add additional content here
    }

    static at = {
        waitFor { $("#eFormsView").displayed }
        return $("#eFormsView").displayed
    }
}