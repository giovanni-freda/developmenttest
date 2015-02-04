package pages.system

import geb.Module

class LicenseRow extends Module {
	
	static content = {
		cell            { $("div .cell", it)}       
        featureID    { cell(0).text()}
        expirationDate         { cell(1).text()}
        licenseCount     { cell(2).text()}
        licenseInUse      { cell(3).text()}
		licenseType      { cell(4).text()}
    }
	
	String FeatureID(){featureID}
	String ExpirationDate(){expirationDate}
	String LicenseCount(){licenseCount}
	String LicenseInUse(){licenseInUse}
	String LicenseType(){licenseType}	
}