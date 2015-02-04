import spock.lang.Specification
import spock.lang.Stepwise


@Stepwise
class ReportsPageSpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goReports()
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def "can get to the reports page"() {
        given:
        at ReportsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goReports()

        then:
        at ReportsPage
    }

    def "can get to the reports page again"() {
        given:
        at ReportsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goReports()

        then:
        at ReportsPage
    }

}