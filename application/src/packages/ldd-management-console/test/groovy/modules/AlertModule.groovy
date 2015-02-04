import geb.Module

class AlertModule extends Module {
    static content = {
        alertMessage { $('span', class: 'alert-message') }
        alertClose {$('span', class: 'icon-close')}
    }

    String getMessage() {
        return alertMessage.text();
    }

    void dismiss() {
        alertClose.click();
    }

    boolean isDisplayed() {
        return alertMessage.displayed;
    }
}
