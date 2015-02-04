import geb.spock.GebReportingSpec
import spock.lang.Unroll
import spock.lang.Stepwise
import spock.lang.IgnoreRest

@Stepwise
class LmcSolutionConfigSpec extends AutoSignOnSignOffSpec {

    def setup() {
        drawerModule.goSolutions()
        at SolutionsPage
        selectSolution(0);
    }

    def cleanup() {
        drawerModule.goHome()
        at HomePage
    }

    def atFirstSolutionConfiguration() {
        at SolutionsPage
        clickSolutionConfiguration();
        at SolutionConfigPage
    }

    def "can get to solution configuration page"() {
        given:
        at SolutionsPage

        when:
        clickSolutionConfiguration();

        then:
        at SolutionConfigPage
         for (i in 0..(configList.size()-1)) {
            SolutionConfigRow row = getSolutionConfigFromList(i)
            println "***** Name " + row.getElementName() + " Type " + row.getElementType()
        }
    }

    def "can set value type for drop down"() {
        given:
        atFirstSolutionConfiguration()
        def comboBoxRowList = configList.findAll({it -> it.getElementType() == "combo"})

        def comboBoxRow = comboBoxRowList[0];

        println "***** Combo Box Name " + comboBoxRow.getElementName() + " Type " + comboBoxRow.getElementType()

        def comboBoxValues = comboBoxRow.getSelectOptions();

        def unselectedComboBoxOptions = comboBoxRow.getUnselectedOptions();

        when:
        def originalSelectedValue = comboBoxRow.settingValue();

        def valueToSetTo = unselectedComboBoxOptions.first().value();

        comboBoxRow.SetValue(valueToSetTo);

        def comboSelectedValue = comboBoxRow.settingValue();

        unselectedComboBoxOptions = comboBoxRow.getUnselectedOptions();

        then:
        unselectedComboBoxOptions.size() == (comboBoxValues.size() - 1 )

        comboSelectedValue != originalSelectedValue
    }

    def "can set value type for multi-select box"() {
        given:
        atFirstSolutionConfiguration()
        def comboBoxRowList = configList.findAll({it -> it.getElementType() == "combo"})
        def comboBoxRow = comboBoxRowList[1];
        def comboBoxValues = comboBoxRow.getSelectOptions();
        def selectedComboBoxValue = comboBoxRow.getSelectedOption();
        def unselectedComboBoxValues = comboBoxRow.getUnselectedOptions();

        println "***** Combo Box Name " + comboBoxRow.getElementName() + " Type " + comboBoxRow.getElementType()

        when:
        def originalSelectedValue = comboBoxRow.settingValue();
        def valueToSetTo = unselectedComboBoxValues.first().value();

        comboBoxRow.SetValue(valueToSetTo);
        selectedComboBoxValue = comboBoxRow.settingValue();
        unselectedComboBoxValues = comboBoxRow.getUnselectedOptions();

        then:
        unselectedComboBoxValues.size() == (comboBoxValues.size() - 1 )
        selectedComboBoxValue != originalSelectedValue
    }
	
	def "apply button initially disabled"() {
        given:
        atFirstSolutionConfiguration();

        expect:
        isApplyEnabled() == false
    }
	
	def "apply button enabled when a configuration setting change has been made"() {
        given:
        atFirstSolutionConfiguration();
        
        when:
        SolutionConfigRow configRow = getSolutionConfigFromList(0);
        configRow.SetValue("Apply button enabled test");

        then:
        isApplyEnabled()
    }

	def "reset button changes edited solution configuration setting(s) that have not been saved back to previous saved value(s)"() {
		given:
		atFirstSolutionConfiguration();
		
		when:
		SolutionConfigRow configRow = getSolutionConfigFromList(0);
		def valueString = configRow.settingValue();
		configRow.SetValue("Reset button test");
        clickReset()

		then:
		getSolutionConfigFromList(0).settingValue() == valueString;
	}

    def "can edit solution configuration"() {
        given:
        atFirstSolutionConfiguration();

        when:
        SolutionConfigRow configRow = getSolutionConfigFromList(1);
        def valueString = configRow.settingValue();
        configRow.SetValue("Edit solution config test");

        then:
        configRow.settingValue() != valueString;
    }
}