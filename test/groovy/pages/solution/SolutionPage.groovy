import geb.Page

class SolutionPage extends Page {
    static url = "#lmc/solutions"

    static content = {

    }

    static at = {
        waitFor { $("#solutionsSummaryView").displayed }
        return $("#solutionsSummaryView").displayed
    }
}
