import spock.lang.Specification
import spock.lang.Stepwise


@Stepwise
class SoftwareClientGroupsPageSpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goClientSoftware()
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def "can get to the software client groups page"() {
        given:
        at SoftwareClientGroupsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goClientSoftware()

        then:
        at SoftwareClientGroupsPage
    }

    def "can get to the software client groups page again"() {
        given:
        at SoftwareClientGroupsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goClientSoftware()

        then:
        at SoftwareClientGroupsPage
    }

}