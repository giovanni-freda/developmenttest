import geb.Module
import geb.navigator.Navigator
import geb.navigator.NonEmptyNavigator

class SolutionConfigRow extends Module {
    static content = {
        ConfigSettingName { $("div").text()}
        //geb only supports css 2 selectors apparently
		ConfigSettingInput { $("input,select")}
    }

    boolean isText() {
        ConfigSettingInput.attr('type') == 'text'
    }

    boolean isPassword() {
        ConfigSettingInput.attr('type') == 'password'
    }

    boolean isCheckbox() {
        ConfigSettingInput.attr('type') == 'checkbox'
    }

    boolean isCombobox() {
        ConfigSettingInput.is('select')
    }


    String getElementType() {
        if ( isText() ) {
            "text"
        } else if ( isPassword() ) {
            "password"
        } else if ( isCheckbox() ) {
            "checkbox"
        } else if ( isCombobox() ) {
            //println " List selected " + getSelectedOption()
            "combo"
        } else {
            "undefined"
        }
    }

    def getSelectOptions() {
        if ( isCombobox() ) {
            println " Number of Options " +  ConfigSettingInput.children().size()
            ConfigSettingInput.children().each( {
            println "***** Child Name " + it.value()
            })
        }
    }

    def getUnselectedOptions() {
        if( isCombobox() ) {
            def inputChildren = ConfigSettingInput.children();
            def webElements = inputChildren.allElements();
            def unSelectedOptions = webElements.findAll({it -> !it.isSelected()});
            def unSelectedOptionsNavigator = new NonEmptyNavigator(browser, unSelectedOptions);
            return unSelectedOptionsNavigator;
        }
    }

    def getSelectedOption() {
        if ( isCombobox() ) {
            println " Number of Options " +  ConfigSettingInput.children('option:selected').size()
            ConfigSettingInput.children().each( {
                println "***** Child Name " + it.value()
            })
            return ConfigSettingInput.value()
        }
    }

    String getElementName() {
        ConfigSettingInput.attr('name');
    }

    String settingName() {ConfigSettingName}
	String settingValue() {
        if ( isCheckbox() ) { 
            if ( ConfigSettingInput.attr('checked') == 'true') {
              "true"
            } else {
              "false"
            }
        } else {
            ConfigSettingInput.value() 
        }
    }
    void SetValue(String value) {
        if ( isCheckbox() ) { 
            ConfigSettingInput.attr('checked', value)
        } else {
            ConfigSettingInput = value
        }
    }
}

