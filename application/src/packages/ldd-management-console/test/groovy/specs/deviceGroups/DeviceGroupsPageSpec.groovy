import spock.lang.Specification
import spock.lang.Stepwise


@Stepwise
class DeviceGroupsPageSpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goDeviceGroups()
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def "can get to the device groups page"() {
        given:
        at DeviceGroupsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goDeviceGroups()

        then:
        at DeviceGroupsPage
    }

    def "can get to the device groups page again"() {
        given:
        at DeviceGroupsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goDeviceGroups()

        then:
        at DeviceGroupsPage
    }

}