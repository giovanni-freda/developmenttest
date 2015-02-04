import geb.Page

//import com.ldd.modules.DrawerModule

class SolutionsPage extends LmcBasePage {
    static url = "#lmc/solutions"

    static content = {
        solutionSettingsMenuModule {module SolutionSettingsMenuModule}
        solutions       { moduleList SolutionRow, $(".solutionsArea .grid-viewport > div .item-panel > div")}
        //manageSolutionsMenu {module ManageSolutionsModule}
        //alertMessage(required: false) { module AlertModule, $('div', class: 'alert') }
        //settingsButton  { $('#settingsMenu') }
        summaryButton {$('.solutionSummaryButton')}
        configurationButton {$('.solutionConfigurationButton')}
        securityButton {$('.solutionSecurityButton')}
        removeSolutionButton {$('#solutionRemoveButton')}
        removeAllSolutionsButton {$('#solutionRemoveAllButton')}
        selectAllSolutionsButton {$('.column-header-checkbox')}
        overflowButton(required: false) {$('.overflow-button')}
        overflowAlert(required: false) {module AlertModule , $('.popover.fadable.shown .alert')}
        overflowSecurityButton(required: false) {$('.popover.fadable.shown .solutionSecurityButton')}
        overflowSummaryButton(required: false) {$('.popover.fadable.shown .solutionSummaryButton')}
        overflowConfigurationButton(required: false) {$('.popover.fadable.shown .solutionConfigurationButton')}
    }

    static at = {
        waitFor { $("#solutionsView").displayed }
        return $("#solutionsView").displayed
    }

    void getTo() {
        drawerModule.solutionsButton.click();
    }

    void removeSolution() {
        removeSolutionButton.click();
    }

    void clickSelectAllCheckbox() {
        selectAllSolutionsButton.click();
    }

    void clickRemoveAll() {
        removeAllSolutionsButton.click();
    }


    def getSolutionList() {return solutions;}
    //These enable debugging, due to the translation of the closures by geb
    SolutionRow getSolutionFromList(int index) { solutions[index]; }

    void selectSolution(int index) {
        getSolutionFromList(index).checkbox.click();
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
        else {
            //def test = summaryButton.jquery;
            //test.click();
            clickButton(summaryButton)
        }
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

}
