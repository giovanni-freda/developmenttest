import geb.spock.GebReportingSpec
import spock.lang.Ignore
import spock.lang.IgnoreRest
import spock.lang.Stepwise
import org.openqa.selenium.Keys

//import spock.lang.Unroll

@Stepwise
class SolutionSecuritySpec extends AutoSignOnSignOffSpec {

    def setup () {
        drawerModule.goSolutions();
        at SolutionsPage
        selectSolution(0);
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def atFirstSolutionSecuritySetupFiles() {
        at SolutionsPage
        clickSolutionSecurity()

        try {
            at SolutionSecurityPage
        }
        catch (Exception e){
            println "clicking security button failed, trying again"
            clickSolutionSecurity()
            at SolutionSecurityPage
        }

    }

    def controlClick(target) {
        interact {
            keyDown(Keys.CONTROL)
            click(target)
            keyUp(Keys.CONTROL)
        }
    }

    def shiftClick(target) {
        interact {
            keyDown(Keys.SHIFT)
            click(target)
            keyUp(Keys.SHIFT)
        }
    }

    def uncheckAllFW = {
        for (j in 0..3) {
            SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(j)
            if(target.isChecked()) target.checkbox.click();
        }
    }

/*    def uncheckAllFW = {
        for (j in 0..3) {
            SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(j)
            if(target.isChecked()) target.checkbox.click();
        }
    }*/

    def shiftSelectAllFW = {
        SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(0)
        target.click()
        shiftClick(getDeploymentTargetRowFromList(deploymentTargetList.size - 1))
    }

    def controlSelectAllFW = {
        for(i in 0..(deploymentTargetList.size - 1)){
            controlClick(deploymentTargetList[i])
        }
    }

    def allFWAreChecked = {
        def allSelected = true
        for(i in 0..(deploymentTargetList.size - 1)){
            allSelected = allSelected && deploymentTargetList[i].isChecked()
        }
        allSelected
    }

    def allFWAreUnchecked = {
        def fwSelected = false
        for(i in 0..(deploymentTargetList.size - 1)){
            fwSelected = fwSelected || deploymentTargetList[i].isChecked()
        }
        !fwSelected
    }


    void toggleSecurityFileDeploymentRowStates() {
        for (i in 0..(deploymentTargetList.size()-1)) {
            SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(i)
            target.checkbox.click()
        }
    }


    def captureSecurityFileDeploymentRowStates() {
        def rowState = []
        for (i in 0..(deploymentTargetList.size()-1)) {
            SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(i)
            rowState[i] = target.isChecked()
            println "*****      rowState[" + i + "] checked state: " + rowState[i]
        }
        return rowState
    }


    void checkAllSecurityFileDeploymentRows() {
        for (i in 0..(deploymentTargetList.size()-1)) {
            SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(i)
            if (!target.isChecked())
                target.checkbox.click()
        }
    }


    def "can get to solution security setup"() {
        given:
        at SolutionsPage


        when:
        clickSolutionSecurity()


        then:
        at SolutionSecurityPage
    }

    def "apply and cancel buttons are initially disabled"() {
        given:
        atFirstSolutionSecuritySetupFiles()

        expect:
        areButtonsEnabled() == false
    }


    def "Apply and cancel buttons are initially enabled" () {
        given:
        atFirstSolutionSecuritySetupFiles()

        expect:
        println "***** apply and cancel buttons are initially enabled == " + areButtonsEnabled()
        areButtonsEnabled() == false
    }


    def "Can get the security file name" () {
        given:
        atFirstSolutionSecuritySetupFiles()

        when:
        SecurityFileRow row = getSecurityFileRowFromList(0)

        then:
        println "***** Name of first security file is " + row.fileName()
    }


    def "Can click on each row" () {
        given:
        atFirstSolutionSecuritySetupFiles()

        when:
        for (i in 0..(securityFileList.size()-1)) {
            SecurityFileRow row = getSecurityFileRowFromList(i)
            println "***** Clicking on row with filename " + row.fileName()
            row.click()
        }

        then:
        areButtonsEnabled() == false
    }


    def "Can get the name of each deployment target row" () {
        given:
        atFirstSolutionSecuritySetupFiles()

        when:
        for (i in 0..(securityFileList.size()-1)) {
            SecurityFileRow row = getSecurityFileRowFromList(i)
            println "***** Security setup file named " + row.fileName() + " has the following possible deployment targets..."
            row.click()
            for (j in 0..(deploymentTargetList.size()-1)) {
                SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(j)
                println "*****      Deployment target[" + j + "] having name " + target.targetName()
            }
        }

        then:
        areButtonsEnabled() == false
    }


    def "Can select deployment targets by row (1 at a time)" () {
        given:
        atFirstSolutionSecuritySetupFiles()

        when:
        for (i in 0..(securityFileList.size()-1)) {
            SecurityFileRow row = getSecurityFileRowFromList(i)
            println "***** Security setup file named " + row.fileName() + " has the following possible deployment targets..."
            row.click()
            for (j in 0..(deploymentTargetList.size()-1)) {
                SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(j)
                println "*****      Selecting deployment target " + target.targetName()
                target.click()
            }
        }

        then:
        areButtonsEnabled() == true
    }
    
    def "Can select deployment targets by row (1 at a time) after clicking menu option twice" () {
        given:
        atFirstSolutionSecuritySetupFiles()
        at SolutionSecurityPage

        when:
        for (i in 0..(securityFileList.size()-1)) {
            SecurityFileRow row = getSecurityFileRowFromList(i)
            println "***** Security setup file named " + row.fileName() + " has the following possible deployment targets..."
            row.click()
            for (j in 0..(deploymentTargetList.size()-1)) {
                SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(j)
                println "*****      Selecting deployment target " + target.targetName()
                target.click()
            }
        }

        then:
        areButtonsEnabled() == true
    }


    def "Can select deployment targets by check box (multi-select)" () {
        given:
        atFirstSolutionSecuritySetupFiles()

        when:
        for (i in 0..(securityFileList.size()-1)) {
            SecurityFileRow row = getSecurityFileRowFromList(i)
            println "***** Security setup file named " + row.fileName() + " has the following possible deployment targets..."
            row.click()
            for (j in 0..(deploymentTargetList.size()-1)) {
                SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(j)
                println "*****      Selecting deployment target " + target.targetName()
                target.checkbox.click()
            }
        }

        then:
        areButtonsEnabled() == true
    }


    def "Can get the checked state of each deployment target row" () {
        given:
        atFirstSolutionSecuritySetupFiles()

        when:
        for (i in 0..(securityFileList.size()-1)) {
            SecurityFileRow row = getSecurityFileRowFromList(i)
            println "***** Security setup file named " + row.fileName() + " has the following possible deployment targets..."
            row.click()
            for (j in 0..3) {
                SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(j)
                println "*****      Deployment target " + target.targetName() + " checked state is " + target.isChecked()
            }
        }

        then:
        areButtonsEnabled() == false
    }


    def "Can get the UCF file contents of each deployment target row" () {
        given:
        atFirstSolutionSecuritySetupFiles()

        when:
        for (i in 0..(securityFileList.size()-1)) {
            SecurityFileRow row = getSecurityFileRowFromList(i)
            println "***** Security setup file named " + row.fileName() + " has UCF file content " + getUCFFileContent()
            row.click()
        }

        then:
        areButtonsEnabled() == false
    }


    def "Can set the UCF file contents of each deployment target row" () {
        given:
        def newText = ['Oh, what a night', 'Late December, back in \'63', 'What a very special time for me', 'As I remember, what a night']
        atFirstSolutionSecuritySetupFiles()

        when:
        for (i in 0..(securityFileList.size()-1)) {
            SecurityFileRow row = getSecurityFileRowFromList(i)
            println "***** Changing content of security setup file named " + row.fileName() + "..."
            row.click()
            setUCFFileContent(newText[i])

        }

        then:
        areButtonsEnabled() == true
    }

    def "Can get the selected state of each security setup file row" () {
        given:
        atFirstSolutionSecuritySetupFiles()

        when:
        for (i in 0..(securityFileList.size()-1)) {
            SecurityFileRow row = getSecurityFileRowFromList(i)
            println "***** Security setup file named " + row.fileName() + " selected state is " + row.isSelected()
        }

        then:
        areButtonsEnabled() == false
    }

    def "Can get the selected state of each deployment target row" () {
        given:
        atFirstSolutionSecuritySetupFiles()

        when:
        for (i in 0..(securityFileList.size()-1)) {
            SecurityFileRow row = getSecurityFileRowFromList(i)
            println "***** Security setup file named " + row.fileName() + " has the following possible deployment targets..."
            row.click()
            for (j in 0..(deploymentTargetList.size()-1)) {
                SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(j)
                println "*****      Deployment target " + target.targetName() + " selected state is " + target.isSelected()
            }
        }

        then:
        areButtonsEnabled() == false
    }

    def "can select each of the security setup files"() {
        given:
        atFirstSolutionSecuritySetupFiles()
        
        when:
        def contentStrings = []
        for(i in 0..(securityFileList.size()-1)){
            getSecurityFileRowFromList(i).click()
            contentStrings.push(getUCFFileContent())
        }
            
        then:
        contentStrings.size == contentStrings.unique().size        
    }
    
    def "can select each of the security setup files after clicking menu option twice" () {
        given:
        atFirstSolutionSecuritySetupFiles()

        at SolutionSecurityPage

        when:
        def contentStrings = []
        for(i in 0..(securityFileList.size()-1)){
            getSecurityFileRowFromList(i).click()
            contentStrings.push(getUCFFileContent())
        }
            
        then:
        contentStrings.size == contentStrings.unique().size        
            
    }
    
    def "cannot select more than one security setup file at a time"() {
        given:
        atFirstSolutionSecuritySetupFiles()
        
        when:
        SecurityFileRow firstRow = getSecurityFileRowFromList(0)
        firstRow.click()
        SecurityFileRow secondRow = getSecurityFileRowFromList(1)
        shiftClick(secondRow)

        then:
        !firstRow.isSelected() && secondRow.isSelected()
        
        when:
        controlClick(firstRow)
        
        then:
        firstRow.isSelected() && !secondRow.isSelected()
    }

    def "can select more than one FW type at a time"() {
        given:
        atFirstSolutionSecuritySetupFiles()
        
        when:
        uncheckAllFW()
        
        then:
        allFWAreUnchecked()

        when:        
        deploymentTargetList[0].checkbox.click();
        deploymentTargetList[deploymentTargetList.size - 1].checkbox.click();

        then:
        def middleSelected = false
        for(i in 1 .. deploymentTargetList.size - 2) middleSelected |= deploymentTargetList[i].isSelected()
            
        deploymentTargetList[0].isSelected() && deploymentTargetList[deploymentTargetList.size - 1].isSelected() && !middleSelected

    }


    def "can select more than one FW type at a time with check boxes"() {
        given:
        def checkedRowState = []
        atFirstSolutionSecuritySetupFiles()

        when:
        SecurityFileRow row = getSecurityFileRowFromList(0)
        checkAllSecurityFileDeploymentRows()
        checkedRowState = captureSecurityFileDeploymentRowStates()

        then:
        checkedRowState.contains(false) == false
    }

    
    def "apply and cancel buttons are enabled when change made to FW list"() {
        given:
        atFirstSolutionSecuritySetupFiles()
        
        when:
        SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(1)
        toggleSecurityFileDeploymentRowStates()

        then:
        areButtonsEnabled()
    }


    def "apply and cancel buttons are enabled when change made to UCF File Content"() {
        given:
        atFirstSolutionSecuritySetupFiles()
        
        when:
        setUCFFileContent("apply and cancel buttons are enabled when change made to UCF File Content")

        then:
        areButtonsEnabled()
    }


    def "apply and cancel buttons are disabled after apply is clicked"() {
        given:
        atFirstSolutionSecuritySetupFiles()
        
        when:
        setUCFFileContent("apply and cancel buttons are enabled when change made to UCF File Content")
        clickApply()

        then:
        !areButtonsEnabled()
    }
    
    def "apply and cancel buttons are disabled after cancel is clicked"() {
        given:
        atFirstSolutionSecuritySetupFiles()
        
        when:
        setUCFFileContent("apply and cancel buttons are enabled when change made to UCF File Content")
        clickCancel()

        then:
        !areButtonsEnabled()
    }

    def "changes to fw are persistent when apply is clicked"() {
        given:
        atFirstSolutionSecuritySetupFiles()
        SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(1)
        def targetSelected = target.isSelected()
        
        /*interact {
            keyDown(Keys.CONTROL)
            click(target)
            keyUp(Keys.CONTROL)
        }*/
        target.checkbox.click()
        clickApply()
        
        when:
        cleanup()
        setup()
        atFirstSolutionSecuritySetupFiles()
        target = getDeploymentTargetRowFromList(1)

        then:
        target.isSelected() != targetSelected

    }

    def "changes to file content are persistent when apply is clicked"() {
        given:
        atFirstSolutionSecuritySetupFiles()
        def modifiedContent = getUCFFileContent() + " (modified)"
        setUCFFileContent(modifiedContent)
        clickApply()
        
        when:
        cleanup()
        setup();
        atFirstSolutionSecuritySetupFiles()

        then:    
        getUCFFileContent().equals(modifiedContent)
    }
    
    def "changes to fw are reverted when cancel is clicked"() {
        given:
        atFirstSolutionSecuritySetupFiles()
        SecurityFileDeploymentTargetRow target = getDeploymentTargetRowFromList(1)
        def targetSelected = target.isSelected()

        target.checkbox.click()
        clickCancel()
        
        when:
        cleanup()
        setup()
        atFirstSolutionSecuritySetupFiles()
        target = getDeploymentTargetRowFromList(1)

        then:
        target.isSelected() == targetSelected

    }

    def "changes to file content are reverted when cancel is clicked"() {
        given:
        atFirstSolutionSecuritySetupFiles()
        def originalContent = getUCFFileContent()
        def modifiedContent = originalContent + " (modified)"
        setUCFFileContent(modifiedContent)
        clickCancel()
        
        when:
        cleanup()
        setup();
        atFirstSolutionSecuritySetupFiles()

        then:    
        getUCFFileContent().equals(originalContent)
    }

    def "navigating away from file with unsaved changes (different page) then navigating back shows disabled apply and cancel buttons"() {
        given:
        def originalRowState = []
        def newRowState = []
        def verifyRowState = []
        atFirstSolutionSecuritySetupFiles()
        
        when:
        SecurityFileRow row = getSecurityFileRowFromList(0)
        originalRowState = captureSecurityFileDeploymentRowStates()
        toggleSecurityFileDeploymentRowStates()
        newRowState = captureSecurityFileDeploymentRowStates()

        then:
        areButtonsEnabled() == true;

        when:
        drawerModule.goHome()

        then:
        at HomePage

        when:
        setup()
        atFirstSolutionSecuritySetupFiles()
        row = getSecurityFileRowFromList(0)
        verifyRowState = captureSecurityFileDeploymentRowStates()

        then:
        originalRowState == verifyRowState

        and:
        originalRowState != newRowState

        and:
        verifyRowState != newRowState

        and:
        areButtonsEnabled() == false;
    }

    def "navigating away from file with unsaved changes (different row) then navigating back shows disabled apply and cancel buttons"() {
        given:
        def originalRowState = []
        def newRowState = []
        def verifyRowState = []
        atFirstSolutionSecuritySetupFiles()

        when:
        SecurityFileRow row = getSecurityFileRowFromList(0)

        originalRowState = captureSecurityFileDeploymentRowStates()
        toggleSecurityFileDeploymentRowStates()
        newRowState = captureSecurityFileDeploymentRowStates()

        then:
        areButtonsEnabled() == true;

        when:
        row = getSecurityFileRowFromList(1)
        row.click()

        then:
        row.isSelected()

        when:
        row = getSecurityFileRowFromList(0)
        row.click()
        waitFor {row.isDisplayed()}
        verifyRowState = captureSecurityFileDeploymentRowStates()

        then:
        row.isSelected()

        and:
        originalRowState == verifyRowState

        and:
        originalRowState != newRowState

        and:
        verifyRowState != newRowState

        and:
        areButtonsEnabled() == false;
    }


    def "navigating away from file with unsaved file content changes then navigating back resets original file content"() {
        given:
        String newContent = 'This represents modified UCF file information'
        atFirstSolutionSecuritySetupFiles()
        
        when:
        String originalContent = getUCFFileContent()
        setUCFFileContent(newContent)

        then:
        getUCFFileContent() == newContent


        when:
        drawerModule.goHome()

        then:
        at HomePage

        when:
        setup()
        atFirstSolutionSecuritySetupFiles()

        then:
        getUCFFileContent() == originalContent
    }

}