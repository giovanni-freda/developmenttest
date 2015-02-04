import geb.spock.GebReportingSpec
import spock.lang.Stepwise

@Stepwise
class AutoSignOnSignOffSpec extends GebReportingSpec {

    def setupSpec() {
        try{
            to LoginPage
            at LoginPage
        }
        catch(Exception e) {
            println "Could not get to login page, maybe you are already logged in, trying to disconnect"
            at Homepage
            shellMenu.disconnect()
            at LoginPage
        }

        login('admin', 'admin')
        at HomePage
    }

    def cleanupSpec() {
        try {

            shellMenu.disconnect()
            at LoginPage
        }
        catch (Exception e) {
            println 'Exception while trying to signoff (do you have a shell menu?) ' + e.message
            e.printStackTrace()
            to HomePage
            at HomePage
        }
    }


}
