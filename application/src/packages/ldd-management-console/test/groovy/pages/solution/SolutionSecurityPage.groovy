import geb.Page

class SolutionSecurityPage extends LmcBasePage {

   //static url = "#lmc/solutions"

    static content = {
        drawerModule { module DrawerModule }
        shellMenu       { module ShellMenuModule }
        securityButton {$('.solutionSecurityButton')}
        overflowButton(required: false) {$('.overflow-button')}
        overflowSecurityButton(required: false) {$('.popover.fadable.shown .solutionSecurityButton')}
        securityFileList { moduleList SecurityFileRow, $('#securitySetupFileList > div.list-item') }
        deploymentTargetList { moduleList SecurityFileDeploymentTargetRow, $('#ssfdtList > div.list-item') }
        fileContent { $('#ssfcArea') }
        applyButton { $('#securitySetupApply')}
        cancelButton { $('#securitySetupCancel')}
        summaryButton {$('.solutionSummaryButton')}
        configurationButton {$('.solutionConfigurationButton')}
        securityButton {$('.solutionSecurityButton')}
        overflowButton(required: false) {$('.overflow-button')}
        overflowAlert(required: false) {module AlertModule , $('.popover.fadable.shown .alert')}
        overflowSecurityButton(required: false) {$('.popover.fadable.shown .solutionSecurityButton')}
        overflowSummaryButton(required: false) {$('.popover.fadable.shown .solutionSummaryButton')}
        overflowConfigurationButton(required: false) {$('.popover.fadable.shown .solutionConfigurationButton')}

    }

    static at = {
        waitFor { securityFileList.displayed }
        return securityFileList.displayed
    }

    def clickButton(button) {
        try{
            button.jquery.click()
        }catch(Exception e) {
            println "**** BUTTON CLICK FAILED **** retry: " + e
            button.jquery.click()
        }
    }

    void clickSolutionSummary() {
        if(overflowButton.displayed) {
            overflowButton.click()
            clickButton(overflowSummaryButton)
        }
        else
            clickButton(summaryButton)
    }

    void clickSolutionConfiguration() {
        if(overflowButton.displayed) {
            overflowButton.click()
            clickButton(overflowConfigurationButton)
        }
        else
            clickButton(configurationButton)

    }

    void clickSolutionSecurity() {
        if(overflowButton.displayed) {
            overflowButton.click()
            clickButton(overflowSecurityButton)
        }
        else
            clickButton(securityButton)
    }

    boolean isApplyEnabled() {
        waitFor { applyButton.displayed }
        return !applyButton.isDisabled()
    }
    
    boolean isCancelEnabled() {
        waitFor { cancelButton.displayed }
        return !cancelButton.isDisabled()
    }
    
    boolean areButtonsEnabled() {
        return isApplyEnabled() && isCancelEnabled()
    }

    def clickApply() {
        waitFor { applyButton.displayed }
        applyButton.click()
        
    }
    
    def clickCancel() {
        waitFor { cancelButton.displayed }
        cancelButton.click()
    }

    SecurityFileRow getSecurityFileRowFromList(int index) {
        println "*****      Got security file row " + securityFileList[index].securityFileName;
        securityFileList[index];
    }

    SecurityFileDeploymentTargetRow getDeploymentTargetRowFromList(int index) {
        waitFor { deploymentTargetList.displayed }
        deploymentTargetList[index];
    }

    String getUCFFileContent() {
        waitFor { fileContent.displayed }
        fileContent.value()
    }

    void setUCFFileContent(String newValue) {
        waitFor { fileContent.displayed }
        fileContent = newValue
    }

}
