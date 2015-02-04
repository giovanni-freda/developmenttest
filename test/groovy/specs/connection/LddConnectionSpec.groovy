import spock.lang.Ignore
import spock.lang.Specification
import spock.lang.Stepwise


@Stepwise
class LddConnectionSpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goSolutions()
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def "refreshing the browser will not log the user out"() {
        given:
        at SolutionsPage
        def solutionsCount = solutions.size()

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goSolutions()

        then:
        at SolutionsPage

        and:
        solutions.size() == solutionsCount

        when:
        drawerModule.goHome()
        driver.navigate().refresh()

        then:
        at HomePage

        when:
        drawerModule.goSolutions()

        then:
        at SolutionsPage

        and:
        solutions.size() == solutionsCount
    }

}