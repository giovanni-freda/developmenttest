//package com.ldd.modules
import geb.Module

class SolutionSettingsMenuModule extends Module {

    static content = {
        settingsButton { $("#settingsMenu") }
        configurationMenuOption { $("span", text: "Configuration")}
        setupFilesMenuOption { $("span", text: "Security Setup Files")}
    }

    def goConfiguration() {
        waitFor { settingsButton.displayed }
        settingsButton.click()
        waitFor { configurationMenuOption.displayed }
        configurationMenuOption.click()
    }

    def goSecuritySetupFiles() {
        waitFor { settingsButton.displayed }
        settingsButton.click()
        try {
            waitFor { setupFilesMenuOption.displayed }
        }
        catch (Exception e){
            waitFor { settingsButton.displayed }
            settingsButton.click()
            waitFor { setupFilesMenuOption.displayed }
        }


        setupFilesMenuOption.click()
    }

}