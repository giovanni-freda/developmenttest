import geb.Module

class ShellMenuModule extends Module {
    static content = {
        navigateControl { $('#user-nav-menu-button') }
        disconnectButton { $('#user-nav-disconnect') }
    }

    void disconnect() {
        navigateControl.click()
        disconnectButton.click()
    }
}
