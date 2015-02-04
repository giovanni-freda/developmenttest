import geb.Page
import groovy.util.logging.Slf4j

class LmcBasePage extends Page {

    static content = {
        drawerModule { module DrawerModule }
        shellMenu    { module ShellMenuModule }
		alertMessage(required: false) { module AlertModule, $('div', class: 'alert') }
    }
	
	String getAlertMessageText() {
        String message;

        waitFor {alertMessage.isDisplayed()}
        message = alertMessage.getMessage();

        return message;
    }
	
	boolean dismissAlert() {
        waitFor {alertMessage.isDisplayed()}
        alertMessage.dismiss();
        //no better way to wait for empty check yet
        sleep(1000);
        def resultNavigator = alertMessage();
        def isEmpty = !resultNavigator.asBoolean();
        if(isEmpty) {
            return true;
        }
        return false;
    }
}
