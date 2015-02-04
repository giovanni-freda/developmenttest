import spock.lang.Specification
import spock.lang.Stepwise


@Stepwise
class JobsPageSpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goJobs()
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def "can get to the jobs page"() {
        given:
        at JobsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goJobs()

        then:
        at JobsPage
    }

    def "can get to the jobs page again"() {
        given:
        at JobsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goJobs()

        then:
        at JobsPage
    }

}