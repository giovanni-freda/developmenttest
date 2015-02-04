import spock.lang.Specification
import spock.lang.Stepwise


@Stepwise
class SchedulePageSpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goSchedule()
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def "can get to the schedule page"() {
        given:
        at SchedulePage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goSchedule()

        then:
        at SchedulePage
    }

    def "can get to the schedule page again"() {
        given:
        at SchedulePage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goSchedule()

        then:
        at SchedulePage
    }

}