import geb.Module

class ManageSolutionsModule extends Module {
    static content = {
        manageButton{ $('#manageMenu') }
        manageMenu{ $('.menu-item-viewport')}
        removeMenuOption { $(".menu-item-viewport > .menu-item-panel > li > span > .menu-item-content", text: "Remove") }

        test {$(".menu-item-viewport > .menu-item-panel > li > span > .menu-item-content")}
        //test1( test(0))
        //test2( test(1))
    }

    //object test2() { return test}

    void remove() {
        manageButton.click()
        waitFor {removeMenuOption.displayed}
        removeMenuOption.click()
    }
}
