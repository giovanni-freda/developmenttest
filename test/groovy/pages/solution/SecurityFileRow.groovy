import geb.Module
import geb.navigator.Navigator

class SecurityFileRow extends Module{
    static content = {
        securityFileName    { $("div .list-item-content-container span").text()}
    }

    //These enable debugging, due to the translation of the closures by geb
    String fileName() {securityFileName}

    boolean isSelected() {
        attr('aria-selected') == 'true'
    }
}

