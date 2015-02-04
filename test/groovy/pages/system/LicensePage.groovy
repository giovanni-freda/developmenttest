package pages.system

import geb.Page

class LicensePage extends LmcBasePage {
	static url = "#lmc/solutions"
    static content = {

		licenses       { moduleList LicenseRow, $("div .grid-viewport >div .item-panel > div")}
    }

    static at = {
        waitFor { $("#licenseView").displayed }
        return $("#licenseView").displayed
    }
	
	LicenseRow getLicenseFromList(int index){ licenses[index]; }
}
