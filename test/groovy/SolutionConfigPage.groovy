import geb.Page

class SolutionConfigPage extends LmcBasePage {

   //static url = "#lmc/solutions"

    static content = {
		configList { moduleList SolutionConfigRow, $('#configurationList > .solution-config-input') }
        applyButton { $('#configurationApply')}
		resetButton { $('#configurationReset')} 
    }

    static at = {
        waitFor { $('#solutionsConfigurationView').displayed }
        return $('#solutionsConfigurationView').displayed
    }
	
	SolutionConfigRow getSolutionConfigFromList(int index) { configList[index]; }

    boolean isApplyEnabled() {
        waitFor { applyButton.displayed }
        return !applyButton.isDisabled()
    }

    def clickApply() {
        waitFor { applyButton.displayed }
        applyButton.click() 
    }
	
	def clickReset() {
		waitFor { resetButton.displayed }
		resetButton.click()
	}
}
