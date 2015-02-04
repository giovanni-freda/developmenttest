import geb.Module
import geb.navigator.Navigator

class SecurityFileDeploymentTargetRow extends Module{
    static content = {
        deploymentTargetName { $("div.list-item-content-container span").text()}
        checkbox { $("div.list-item-checkbox-container input") }
    }

    //These enable debugging, due to the translation of the closures by geb
    String targetName() { deploymentTargetName }

    boolean isSelected() {
        attr('aria-selected') == 'true'
    }

    boolean isChecked() {
        waitFor { checkbox.displayed }
        def checkboxValue = checkbox.value();
        //ie9 will resolve this to ""
        if(checkboxValue == "") {
            checkboxValue = checkbox.attr('checked')
        }

        if(checkboxValue)
            return true;
        else
            return false;
    }

}
