import spock.lang.Specification
import spock.lang.Stepwise


@Stepwise
class EFormsPageSpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goEForms()
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def "can get to the eforms page"() {
        given:
        at EFormsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goEForms()

        then:
        at EFormsPage
    }

    def "can get to the eforms page again"() {
        given:
        at EFormsPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goEForms()

        then:
        at EFormsPage
    }

}