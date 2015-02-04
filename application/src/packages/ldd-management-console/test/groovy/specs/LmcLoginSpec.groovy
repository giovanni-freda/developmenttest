import geb.spock.GebReportingSpec
import spock.lang.Unroll

class LmcLoginSpec extends GebReportingSpec {

    def "can get to the login page"() {
        when:
        to LoginPage

        then:
        at LoginPage
    }

    def "can't login without a password"() {
        given:
        to LoginPage
        at LoginPage

        when:
        login('admin', '')

        then:
        at LoginPage

        and:
        alertError.isDisplayed()
    }

    def "can login with username and password"() {
        given:
        to LoginPage
        at LoginPage

        when:
        login('admin', 'admin')

        then:
        at HomePage
        shellMenu.disconnect();
    }

    def "can not login with an invalid password"() {
        given:
        to LoginPage
        at LoginPage

        when:
        login('admin', 'fred')

        then:
        at LoginPage

        and:
        alertError.isDisplayed()
    }
}
