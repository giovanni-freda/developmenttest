import geb.Module
import geb.navigator.Navigator

/**
 * Created by gfreda on 10/9/14.
 */
class SolutionRow  extends Module{
    static content = {
        root            { $() }
        cell            { $("div .cell", it)}
        checkbox        { $("div .checkbox-cell")}
        solutionLink    { cell(0) }
        solutionName    { cell(0).text()}
        version         { cell(1).text()}
        installTime     { cell(2).text()}
        updateTime      { cell(3).text()}
    }

    //These enable debugging, due to the translation of the closures by geb
    String SolutionName() {solutionName}
    String Version() {version}
    String InstallTime() {installTime}
    String UpdateTime() {updateTime}
    Navigator SolutionLink() {solutionLink}

    boolean isSelected() {
        attr('aria-selected') == 'true'
    }

    Navigator getRootNavigator() {root};
    boolean isRootDisplayed() {getRootNavigator().displayed}

    void selectSolution() {
        if(!isRootDisplayed()) {
            getRoot().scrollIntoView();
        }

        interact {
            moveToElement root
        }
    }

}
