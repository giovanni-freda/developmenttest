package pages.system

import geb.Page

class LdapConfigPage extends LmcBasePage {
	static url = "#lmc/solutions"
	
    static content = {
		ldapView { $("#ldapview")}
		enableLdap {$("#enabled")}
		enableSSL {$("#secure")}
		serverIpAddress {$("#server")}
		serverPort {$("#port")}
		userSearchFilter {$("#usersearchfilter")}
		userSearchBase {$("#usersearchbase")}
		groupSearchFilter {$("#groupsearchfilter")}
		groupSearchBase {$("#groupsearchbase")}
		groupIdentifier {$("#groupidentifier")}
		memberOfGroups {$("#memberofgroups")}
		anonymousRadio {$("#radio_id_1")}
		usernameRadio {$("#radio_id_2")}
		username{$("#username")}
		password {$("#password")}
		searchBase {$("#searchbase")}
		testSettings {$('#testsettings')}
		saveSettings {$('#ldapsave')}
		cancelTab {$('#cancelldapsettings')}
    }

    static at = {
        waitFor {ldapView.displayed }
        return $("#ldapform").displayed
    }
	
	void enableLdapAuth() {
		if(!enableLdap.value())
			enableLdap.value(true)	
	}
	boolean isLdapAuthDisable () {
		!enableLdap.value()
	}
	void enableSSLConnection() {
		if(!enableSSL.value())
			enableSSL.value(true)		
	}
	boolean isSecureConncetionDisable () {
		!enableSSL.value()
	}
	
	boolean isAnonymous() {
		anonymousRadio.value()
	}

	//void setServerIP(String s){serverIpAddress.value(s)}
	
	void saveLdapSettings() {saveSettings.click()}
	void testLdapSettings() {testSettings.click()}
	void cancel() {cancelTab.click()}
	
	void setLdapSettings(m){

		m.each{k,v ->
			switch (k){
			
				case "serverIpAddress":
				serverIpAddress.value(v)
				break
				case "serverPort":
				serverPort.value(v)
				break
				case "userSearchFilter":
				userSearchFilter.value(v)
				break
				case "userSearchBase":
				userSearchBase.value(v)
				break
				case "groupSearchFilter":
				groupSearchFilter.value(v)
				break
				case "groupSearchBase":
				groupSearchBase.value(v)
				break
				case "groupIdentifier":
				groupIdentifier.value(v)
				break
				case "memberOfGroups":
				memberOfGroups.value(v)
				break
				case "anonymousLogin":
				anonymousRadio.value('Anonymous')
				break
				case "userLogin":
				usernameRadio.value('Username')
				break
				case "username":
				username.value(v)
				break
				case "password":
				password.value(v)
				break
				case "searchBase":
				searchBase.value(v)
			
			}
		}
	}
}
