import geb.navigator.Navigator
import geb.spock.GebReportingSpec
import spock.lang.Ignore
import spock.lang.IgnoreRest
import spock.lang.Shared
import spock.lang.Unroll
import spock.lang.Stepwise
import groovyx.net.http.HTTPBuilder
import groovyx.net.http.Method
import static groovyx.net.http.ContentType.TEXT

@Stepwise
class LmcSolutionsSpec extends AutoSignOnSignOffSpec {

    @Shared
    private def restTestConfigurationUrl = "${ browser.baseUrl }/lmc/test/"
    private def restFillDataSetUrl = "${ browser.baseUrl }/datasetSize/50"

    def setup () {
        at HomePage
    }

    def cleanup() {
        drawerModule.goHome()
    }

    def getSelectedRowCount() {
        def count = 0
        for (i in 0..solutions.size()-1) {
            if (getSolutionFromList(i).isSelected())
                count++
        }
        return count
    }

    def "can get to solutions button"() {
        given:
        at HomePage

        when:
        drawerModule.goSolutions()

        then:
        at SolutionsPage
    }

    def "can get to first solution in list"() {
        given:
        at HomePage


        when:
        drawerModule.goSolutions()
        at SolutionsPage

        then:
        solutions != null
        SolutionRow row = getSolutionFromList(0);
        row != null
    }

    def "can get to solution summary"() {
        given:
        at HomePage
        drawerModule.goSolutions()

        when:
        at SolutionsPage
        SolutionRow row = getSolutionFromList(0)
        String solutionName = row.SolutionName();
        selectSolution(0);
        clickSolutionSummary()

        then:
        at SolutionSummaryPage
        String solutionSummaryName = SolutionName()
        solutionSummaryName == solutionName
    }

    def "can get to solution summary for second row in the grid"() {
        given:
        at HomePage
        drawerModule.goSolutions()

        when:
        at SolutionsPage
        SolutionRow row = getSolutionFromList(1)
        String solutionName = row.SolutionName();
        selectSolution(1);
        clickSolutionSummary()

        then:
        at SolutionSummaryPage
        String solutionSummaryName = SolutionName()
        solutionSummaryName == solutionName
    }

    def fillDataset() {
        println 'Requesting a dataset fill..'
        def client = new HTTPBuilder(restFillDataSetUrl);
        client.request(Method.PUT, TEXT) {req ->
            response.failure = {resp ->
                println(resp);
                println '    Error occurred with dataset fill request'
                throw new Exception()
            }

            response.success = {
                println '    Dataset fill request was successfull'
            }

        }

        println '    Dataset fill request has completed processing'
        return true;

    }

    def setDeleteFailureFlag(String solutionName, boolean deleteFailureFlag) {
        def setDeleteFailureUrl =  restTestConfigurationUrl + "solutions/" + solutionName + "/deleteFailure";
        def client = new HTTPBuilder(setDeleteFailureUrl);

        if(deleteFailureFlag) {
            client.request(Method.PUT, TEXT) { req ->
                response.failure = {resp -> println(resp); throw new Exception();}
            }
        }
        else {
            client.request(Method.DELETE, TEXT) {
                response.failure = {resp ->  println(resp); throw new Exception()}
            }
        }
    }

    def "can delete solution"() {
        given:
        drawerModule.goHome();
        drawerModule.goSolutions()

        when:
        at SolutionsPage
        SolutionRow row = getSolutionFromList(0)
        String firstSolutionName = row.SolutionName();
        row.checkbox.click();
        at SolutionsPage


        setDeleteFailureFlag(firstSolutionName, false)

        removeSolution();

        then:
        at SolutionsPage
        SolutionRow nextRow = getSolutionFromList(0)
        String secondSolutionName = nextRow.SolutionName();
        firstSolutionName != secondSolutionName;
        String alertMessageString = getAlertMessageText()
        alertMessageString == "Success removing " + firstSolutionName;
        at SolutionsPage
        dismissAlert();
    }

    def "can delete solution when checkbox selection is mixed"() {
        given:
        drawerModule.goHome();
        drawerModule.goSolutions()

        when:
        at SolutionsPage
        SolutionRow firstRow = getSolutionFromList(0)
        String firstSolutionName = firstRow.SolutionName();
        firstRow.checkbox.click();
        SolutionRow secondRow = getSolutionFromList(1)
        String secondSolutionName = secondRow.SolutionName();
        secondRow.checkbox.click();
        firstRow.checkbox.click();
        at SolutionsPage

        setDeleteFailureFlag(secondSolutionName, false)

        removeSolution();

        then:
        at SolutionsPage
        SolutionRow nextRow = getSolutionFromList(1)
        SolutionRow freshFirstRow = getSolutionFromList(0)
        String thirdSolutionName = nextRow.SolutionName();
        String freshFirstSolutionName = freshFirstRow.SolutionName();
        thirdSolutionName != secondSolutionName;
        freshFirstSolutionName == firstSolutionName
        String alertMessageString = getAlertMessageText()
        alertMessageString == "Success removing " + secondSolutionName;
        at SolutionsPage
        dismissAlert();
    }

    def "can delete all solutions with button click" () {
        given:
        at HomePage
        drawerModule.goSolutions()

        when:
        at SolutionsPage
        clickRemoveAll();
        at SolutionsPage
        //def remainingSolutions = getSolutionList();
        def solutionList = solutions;
        then:
        //remainingSolutions.length == 0
        solutionList.size() == 0
        fillDataset()
        drawerModule.goHome()
        driver.navigate().refresh()
        at HomePage
    }

    def "can delete all solutions with select all then button click" () {
        given:
        drawerModule.goSolutions()

        when:
        at SolutionsPage
        clickSelectAllCheckbox();

        removeSolution();
        //def remainingSolutions = getSolutionList();

        then:
        //remainingSolutions.length == 0
        solutions.size() == 0
        fillDataset()
        drawerModule.goHome()
        driver.navigate().refresh()
        at HomePage
    }

    def "shows error alert if delete solution fails"() {
        given:
        at HomePage
        drawerModule.goSolutions()
        at SolutionsPage

        when:
        SolutionRow row = getSolutionFromList(0)
        String firstSolutionName = row.SolutionName();
        row.checkbox.click();
        setDeleteFailureFlag(firstSolutionName, true)
        at SolutionsPage

        removeSolution();

        then:
        getAlertMessageText() == "Error removing " + firstSolutionName;
    }

    def "can single-select more than the first row" () {
        given:
        String previousSolutionName = ""
        String currentSolutionName = ""
        SolutionRow previousRow = null
        SolutionRow currentRow = null
        at HomePage
        drawerModule.goSolutions()
        at SolutionsPage

        expect:
        for (i in 0..Math.min(2, solutions.size()-2)) {
            previousSolutionName = currentSolutionName
            previousRow = currentRow
            currentRow = getSolutionFromList(i)

            interact {
                moveToElement currentRow.checkbox
            }
            currentRow.click();

            if(!currentRow.isSelected()) {
                SolutionRow nextRow = getSolutionFromList(i + 1)
                interact {
                    println "interact"
                    moveToElement nextRow.checkbox
                }
                currentRow.click();
            }
            currentSolutionName = currentRow.SolutionName()
            assert previousSolutionName != currentSolutionName
            assert previousRow != currentRow
            assert currentRow.isSelected()
            assert !previousRow?.isSelected()
        }
    }

    def "can multi-select more than the first row" () {
        given:
        String previousSolutionName = ""
        String currentSolutionName = ""
        SolutionRow previousRow = null
        SolutionRow currentRow = null
        at HomePage
        drawerModule.goSolutions()
        at SolutionsPage

        expect:
        for (i in 0..Math.min(2, solutions.size()-2)) {
            previousSolutionName = currentSolutionName
            previousRow = currentRow
            currentRow = getSolutionFromList(i)
            currentRow.checkbox.click();
            currentSolutionName = currentRow.SolutionName()
            assert previousSolutionName != currentSolutionName
            assert previousRow != currentRow
        }

        and:
        assert 0 < getSelectedRowCount()
    }

}