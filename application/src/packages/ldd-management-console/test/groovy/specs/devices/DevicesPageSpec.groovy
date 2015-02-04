import spock.lang.Specification
import spock.lang.Stepwise


@Stepwise
class DevicesPageSpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goDevices()
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def "can get to the devices page"() {
        given:
        at DevicesPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goDevices()

        then:
        at DevicesPage
    }

    def "can get to the devices page again"() {
        given:
        at DevicesPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goDevices()

        then:
        at DevicesPage
    }

}