import geb.spock.GebReportingSpec
import spock.lang.Stepwise
import spock.lang.Unroll

@Stepwise
class HomePageSpec extends AutoSignOnSignOffSpec {

    def setup () {
        at HomePage
    }

    def cleanup() {
        drawerModule.goHome()
    }

    def "can navigate to system page"() {
        given:
        at HomePage

        when:
        drawerModule.goSystem();

        then:
        at SystemPage
    }

    def "can navigate to solution page"() {
        given:
        at HomePage

        when:
        drawerModule.goSolutions();

        then:
        at SolutionsPage
    }

    def "can navigate to software client groups page"() {
        given:
        at HomePage

        when:
        drawerModule.goClientSoftware()

        then:
        at SoftwareClientGroupsPage
    }

    def "can navigate to services page"() {
        given:
        at HomePage

        when:
        drawerModule.goServices();

        then:
        at ServicesPage
    }

    def "can navigate to device groups page"() {
        given:
        at HomePage

        when:
        drawerModule.goDeviceGroups();

        then:
        at DeviceGroupsPage
    }

    def "can navigate to devices page"() {
        given:
        at HomePage

        when:
        drawerModule.goDevices();

        then:
        at DevicesPage
    }

    def "can navigate to schedule page"() {
        given:
        at HomePage

        when:
        drawerModule.goSchedule();

        then:
        at SchedulePage
    }

    def "can navigate to jobs page"() {
        given:
        at HomePage

        when:
        drawerModule.goJobs();

        then:
        at JobsPage
    }

    def "can navigate to logs page"() {
        given:
        at HomePage

        when:
        drawerModule.goLogs();

        then:
        at LogsPage
    }

    def "can navigate to reports page"() {
        given:
        at HomePage

        when:
        drawerModule.goReports();

        then:
        at ReportsPage
    }

    def "can navigate to eforms page"() {
        given:
        at HomePage

        when:
        drawerModule.goEForms();

        then:
        at EFormsPage
    }

}