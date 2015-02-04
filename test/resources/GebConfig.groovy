/*
	This is the Geb configuration file.
	
	See: http://www.gebish.org/manual/current/configuration.html
*/




import org.openqa.selenium.Dimension
import org.openqa.selenium.Point
import org.openqa.selenium.WebDriver
import org.openqa.selenium.remote.DesiredCapabilities
import org.openqa.selenium.remote.RemoteWebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.ie.InternetExplorerDriver

waiting {
    timeout = 20
}

WebDriver applyBrowserWidthAndHeight(WebDriver driver) {

    println "browser width : " + (System.properties["geb.browser.width"]?: 'MAXIMIZED')
    println "browser height : " + (System.properties["geb.browser.height"]?: 'MAXIMIZED')

    if (System.properties["geb.browser.width"] && System.properties["geb.browser.height"]) {
        driver.manage().window().setPosition(new Point(5,5))
        driver.manage().window().setSize(new Dimension(System.properties["geb.browser.width"].toInteger()+5, System.properties["geb.browser.height"].toInteger()+5))
    }
    else {
        driver.manage().window().maximize()
    }

    return driver
}

environments {


    // run via “./gradlew chromeLocalTest”
    chromeLocal {
        driver = {
            applyBrowserWidthAndHeight(new RemoteWebDriver(new URL("http://localhost:9515"), DesiredCapabilities.chrome()))
        }
    }

    // run via “./gradlew firefoxLocalTest”
    firefoxLocal {
        driver = {
            applyBrowserWidthAndHeight(new FirefoxDriver())
        }
    }

    // run via “./gradlew internetExplorerLocalTest”
    internetExplorerLocal {
        driver = {
            applyBrowserWidthAndHeight(new RemoteWebDriver(new URL("http://localhost:5555"), DesiredCapabilities.internetExplorer()))
        }
    }

    chrome {
        driver = {
            applyBrowserWidthAndHeight(new RemoteWebDriver(new URL("http://selenium01.cpdit.lexmark.ds:5555/wd/hub"), DesiredCapabilities.chrome()))
        }
    }

    // run via “./gradlew firefoxTest”
    firefox {
        driver = {
            def caps = DesiredCapabilities.firefox()
            caps.version = '33.0.1'
            applyBrowserWidthAndHeight(new RemoteWebDriver(new URL("http://selenium01.cpdit.lexmark.ds:5555/wd/hub"), caps))
        }
    }

    // run via “./gradlew internetExplorerTest”
    internetExplorer {
        driver = {
            applyBrowserWidthAndHeight(new RemoteWebDriver(new URL("http://selenium01.cpdit.lexmark.ds:5555/wd/hub"), DesiredCapabilities.internetExplorer()))
        }
    }

    // run via “./gradlew safariTest”
    safari {
        driver = {
            applyBrowserWidthAndHeight(new RemoteWebDriver(new URL("http://selenium01.cpdit.lexmark.ds:5555/wd/hub"), DesiredCapabilities.safari()))
        }
    }
}
