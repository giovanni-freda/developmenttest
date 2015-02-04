import spock.lang.Specification
import spock.lang.Stepwise


@Stepwise
class LogsPageSpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goLogs()
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def "can get to the logs page"() {
        given:
        at LogsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goLogs()

        then:
        at LogsPage
    }

    def "can get to the logs page again"() {
        given:
        at LogsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goLogs()

        then:
        at LogsPage
    }

}