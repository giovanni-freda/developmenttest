import geb.Page

/**
 * Created by gfreda on 10/9/14.
 */
class SolutionSummaryPage extends LmcBasePage {

   static url = "#lmc/solutions"

   static content = {
        solutionSettingsMenuModule {module SolutionSettingsMenuModule}
        solutionName { $('#solnname') }
   }

    static at = {
        waitFor { $("#solutionsSummaryView").displayed }
        return $("#solutionsSummaryView").displayed
    }

    String SolutionName() {solutionName.text()}


}
