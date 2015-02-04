LDD Management Console Contributing
==================================

This document provides information for setting up your environment for developing on the LDD Management Console

Setting up for development
-----------------

Install **nodejs**

* Download and install the [package][1] appropriate for your system

Install **bower**

* Use npm, (installed with nodejs) to install bower
 
* `npm install -g bower`

Install **phantomjs**

* Use npm to install phantomjs
 
* `npm install -g phantomjs`

Install the intenal **bear** utility

* `npm install -g git://pswgithub.rds.lexmark.com/ClientFramework/bear`

Insure that you have git installed and that it is on you command line path

* git can be downloaded from [git-scm][2]

Setting up your environment
---------------------------
* Create a new empty directory and cd into it

* from the command line run `bear necessities`

* now run `bear add-package unittest`

Getting the code
------------------------

* cd into [my-directory]/application/src/packages

* from the packages directory clone the repo: `git clone git@github.com:Perceptive-Shared/ldd-management-console.git`

* edit [my-directory]/application/src/config.json to add our module
```
    ...
    "modules": [
        "ldd-management-console:LmcModule"
    ]
```
* edit [my-directory]/application/src/packages/unittest/tests.json to add our unit tests
```
...
[
    "packages/ldd-management-console/test/specs"
]

```

Verifying
-----

Now its time to verify that everything is working correctly

* From a command prompt `cd` into `[my-directory]/application/src/packages/ldd-management-console`

* Run the batch file `nodeRunnerSetup.bat`

* Run the nodejs server with mock backend `node nodeRunner.js`

* You should be able to navigate to [http://localhost:9000/#lmc][3] and see the application

* if prompted to signin use the following credentials:
```
user : admin
password : ImageNow!
```

* Now try running the unit tests from [http://localhost:9000/packages/unittest/][4]


Acceptance Testing
-----
You can run acceptance tests using one of two methods. The first method utilizes the Lexmark Selenium Grid against a node server running on your local workstation. The second method utilizes a local Chrome, Firefox, or Internet Explorer web driver running on your developer workstation, also running against a local node server. The second method will run an abbreviated set of tests and is only meant for fast iteration.

To run acceptance tests using the Lexmark Selenium Grid...

* From a command prompt `cd` into `[my-directory]/application/src/packages/ldd-management-console`

* Run the nodejs server with mock backend `node nodeRunner.js`

* From a second command prompt `cd` into `[my-directory]/application/src/packages/ldd-management-console`

*  Ensure that your Windows firewall is turned off or that you have opened port 9000 so it can be accessed from the Lexmark Selenium Grid

*  Run the Selenium acceptance tests from gradle `gradlew -PbaseUrl=http://<my-ip-address>:9000 acceptance`

To run acceptance tests using a local Chrome, Firefox, and Internet Explorer web driver...

* Download the latest web driver for Google Chrome from [here][5], and the latest Internet Explorer web driver from [here][6] (The Firefox web driver is included in the Selenium jar consumed by our build)

* The Google Chrome and Microsoft Internet Explorer web drivers support the wire protocol. Once you have downloaded them, you need to Start the web drivers and allow them to run in the background.

* For local testing of Firefox, you must have a Firefox version installed on your local workstation that is compatible with Selenium 2.41. The supported Firefox versions can be found in the Selenium 2.41 [change log][7], and they can be downloaded from the Mozilla [releases archive][8].

* From a command prompt `cd` into `[my-directory]/application/src/packages/ldd-management-console`

* Run the nodejs server with mock backend `node nodeRunner.js`

* From a second command prompt `cd` into `[my-directory]/application/src/packages/ldd-management-console`

*  Run either all of the Selenium acceptance tests from gradle or a specific subset 
	* `gradlew -PlocalWebDriver -PbaseUrl=http://<my-ip-address>:9000 acceptance --info`
	* `gradlew -PlocalWebDriver -PbaseUrl=http://<my-ip-address>:9000 chromeLocalTest --info`
	* `gradlew -PlocalWebDriver -PbaseUrl=http://<my-ip-address>:9000 firefoxLocalTest --info`
	* `gradlew -PlocalWebDriver -PbaseUrl=http://<my-ip-address>:9000 internetExplorerLocalTest --info`

* Additionally, you may choose to constrain the size of the browser window under test by specifying the following properties on the gradle command line. (omitting these properties results in a full screen browser window)
	* `-PbrowserWidth=[some integer value]`
	* `-PbrowserHeight=[some integer value]`

Troubleshooting
-----

On some systems having two display drivers with at least one of them being Nvidia, the phantomjs process can hang causing the gradle build to hang at the **unittest** step. In this case, set your Nvidia control panel setting for highest performance. 

When running the local acceptance tests for IE, make sure that you have adhered to the following required configuration information (also available [here][9])...

 * The IEDriverServer exectuable must be downloaded and placed in your PATH.
 * On IE 7 or higher on Windows Vista or Windows 7, you must set the Protected Mode settings for each zone to be the same value. The value can be on or off, as long as it is the same for every zone. To set the Protected Mode settings, choose "Internet Options..." from the Tools menu, and click on the Security tab. For each zone, there will be a check box at the bottom of the tab labeled "Enable Protected Mode".
 * Additionally, "Enhanced Protected Mode" must be disabled for IE 10 and higher. This option is found in the Advanced tab of the Internet Options dialog.
 * The browser zoom level must be set to 100% so that the native mouse events can be set to the correct coordinates.
 * For *IE 11 only*, you will need to set a registry entry on the target computer so that the driver can maintain a connection to the instance of Internet Explorer it creates. For 32-bit Windows installations, the key you must examine in the registry editor is `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BFCACHE`. For 64-bit Windows installations, the key is `HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BFCACHE.` Please note that the FEATURE_BFCACHE subkey may or may not be present, and should be created if it is not present. Important: Inside this key, create a DWORD value named `iexplore.exe` with the value of `0`.

  [1]: http://nodejs.org/download/
  [2]: http://git-scm.com/download
  [3]: http://localhost:9000/#lmc
  [4]: http://localhost:9000/packages/unittest/
  [5]: https://code.google.com/p/selenium/wiki/ChromeDriver
  [6]: http://selenium-release.storage.googleapis.com/index.html?path=2.41/
  [7]: https://code.google.com/p/selenium/source/browse/java/CHANGELOG/#241
  [8]: https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/
  [9]: https://code.google.com/p/selenium/wiki/InternetExplorerDriver#Required_Configuration

