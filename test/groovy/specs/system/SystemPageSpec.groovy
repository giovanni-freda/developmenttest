import pages.system.LicensePage
import pages.system.UserPasswordPage
import spock.lang.Ignore
import spock.lang.Specification
import spock.lang.Stepwise

@Stepwise
class SystemPageSpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goSystem()
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def "can get to the system page"() {
        given:
        at SystemPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goSystem()

        then:
        at SystemPage
    }

    def "can get to the system page again"() {
        given:
        at SystemPage

        when:
        drawerModule.goHome()
        at HomePage
        drawerModule.goSystem()

        then:
        at SystemPage
    }

//For License Page testing	
    def "can get to license info page"() {
        given:		
        at SystemPage

        when:
        drawerModule.goLicense()
        at LicensePage
        String featureID = getLicenseFromList(0).FeatureID()
        String licenseCount = getLicenseFromList(1).LicenseCount()
        String licenseInUse = getLicenseFromList(2).LicenseInUse()
        String licenseType = getLicenseFromList(3).LicenseType()
        drawerModule.goHome()
        at HomePage
		
        then:
        drawerModule.goLicense()
        at LicensePage
		
        and:
        featureID == getLicenseFromList(0).FeatureID();
        licenseCount == getLicenseFromList(1).LicenseCount();
        licenseInUse == getLicenseFromList(2).LicenseInUse();
        licenseType == getLicenseFromList(3).LicenseType();
    }

//For Username and Password Change page testing
	def "display right caption for Username Change" () {
		given:		
        at SystemPage
		
		when:
		drawerModule.goUserPassword()
		at UserPasswordPage
		
		then:
		getUsernameCaption()=="Change Username"
		getPasswordCaption()=="Change Password"
		
	}

	def "change username sucessfully"(){
		given:
		at SystemPage
		drawerModule.goUserPassword()
		at UserPasswordPage
		
		when:
		changeUsername(newUser,retypeNewUser)
		
		then:
		getUsernameCaption()=="Change Username"
		
		String alertMessageString = getAlertMessageText()
        alertMessageString == "Username updated Succesfully"
        at UserPasswordPage
        dismissAlert();
		shellMenu.disconnect()
        at LoginPage
		
		and:
		inputUsername.value(newUser)
        inputPassword.value('admin')
        buttonConnect.click()
        at HomePage
		
		where:
		newUser << ['user1', 'admin']
		retypeNewUser << ['user1', 'admin']
	}

	def "change password sucessfully"(){
		given:
		at SystemPage
		drawerModule.goUserPassword()
		at UserPasswordPage

		when:
		changePassword(currPassword,newPassword,retypeNewPassword)
		then:
		getUsernameCaption()=="Change Username"

		String alertMessageString = getAlertMessageText()
        alertMessageString == "Password updated Succesfully"
        at UserPasswordPage
        dismissAlert();

		shellMenu.disconnect()
		at LoginPage

		and:
		inputUsername.value('admin')
        inputPassword.value(newPassword)
        buttonConnect.click()
        at HomePage

		where:
		currPassword << ['admin', 'admin123']
		newPassword << ['admin123', 'admin']
		retypeNewPassword << ['admin123', 'admin']	
	}

	def "reset change username"(){
		given:
		at SystemPage
		drawerModule.goUserPassword()
		at UserPasswordPage
		
		when:
		resetUserNameChange(newUser,retypeNewUser)
		
		then:
		getUsernameCaption()=="Change Username"
		
		where:
		newUser << ['admin', 'user']
		retypeNewUser << ['rahul', 'user']	
	}

	def "reset change password"(){
		given:
		at SystemPage
		drawerModule.goUserPassword()
		at UserPasswordPage
		
		when:
		resetPasswordChange(currPassword,newPassword,retypeNewPassword)
		
		then:
		getUsernameCaption()=="Change Username"
		
		where:
		currPassword << ['admin1', 'admin']
		newPassword << ['admin12', 'admin123']
		retypeNewPassword << ['admin', 'admin123']
	
	}


}
