//package com.ldd.modules
import geb.Module

class DrawerModule extends Module {
    //static base = { $("#drawerList") }

    static content = {
        homeButton { $(".list-item-content-container", text: "home") }
        systemButton { $(".list-item-content-container", text: "system") }
        solutionsButton { $(".list-item-content-container", text: "solutions") }
        clientSoftwareButton { $(".list-item-content-container", text: "clientsoftware") }
        servicesButton { $(".list-item-content-container", text: "services") }
        deviceGroupsButton { $(".list-item-content-container", text: "devicegroups") }
        devicesButton { $(".list-item-content-container", text: "devices") }
        scheduleButton { $(".list-item-content-container", text: "schedule") }
        jobsButton { $(".list-item-content-container", text: "jobs") }
        logsButton { $(".list-item-content-container", text: "logs") }
        reportsButton { $(".list-item-content-container", text: "reports") }
        eformsButton { $(".list-item-content-container", text: "eforms") }
		
		//String to be changed
		licenseButton { $(".list-item-content-container", text: "licenses") }
		//String to be changed
		userpasswdButton { $(".list-item-content-container", text: "username&password") }

		licenseButton { $(".list-item-content-container > span", text: "licenses") }
		ldapButton { $(".list-item-content-container > span", text: "ldap") }
    }

    void goHome() {
        homeButton.click()
    }

    void goSystem() {
        systemButton.click()
    }

    void goSolutions() {
        solutionsButton.click()
    }

    void goClientSoftware() {
        clientSoftwareButton.click()
    }

    void goServices() {
        servicesButton.click()
    }

    void goDeviceGroups() {
        deviceGroupsButton.click()
    }

    void goDevices() {
        devicesButton.click()
    }

    void goSchedule() {
        scheduleButton.click()
    }

    void goJobs() {
        jobsButton.click()
    }

    void goLogs() {
        logsButton.click()
    }

    void goReports() {
        reportsButton.click()
    }

    void goEForms() {
        eformsButton.click()
    }
	
	//String to be changed 
	void goLicense() {
		licenseButton.click()
	}
	
	//String to be changed
	void goUserPassword() {
		try{
            userpasswdButton.click()
        }
        catch(Exception e) {
            println(e);
        }
	}
    
	void goLdapConfig() {
		ldapButton.click()
	}
}
