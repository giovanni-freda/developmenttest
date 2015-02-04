import spock.lang.Specification
import spock.lang.Stepwise


@Stepwise
class ServicesPageSpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goServices()
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def "can get to the jobs page"() {
        given:
        at ServicesPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goServices()

        then:
        at ServicesPage
    }

    def "can get to the jobs page again"() {
        given:
        at ServicesPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goServices()

        then:
        at ServicesPage
    }

}