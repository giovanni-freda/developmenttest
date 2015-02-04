package pages.system

import geb.Page

class UserPasswordPage extends LmcBasePage {

	static url = "#lmc/systems"	
	static content = {

		ChangeUserTitle {$("div #systemusernameView >b")}
		ChangePasswordTitle {$("div #systemusernameView >hr").next()}
		newUserText {$('#txtusername')}
		retypeUserText {$('#txtretypeusername')}
		currentPasswordText{$('#txtcurrentpassword')}
		newPasswordText {$('#txtnewpassword')}
		retypePasswordText {$('#txtretypenewpassword')}
		apply{$('button',it, text:"Apply")}
		reset{$('button',it, text:"Reset")}
    }

    static at = {
        waitFor { $("#systemusernameView").displayed }
        return $("#systemusernameView").displayed
    }

	String getUsernameCaption() {
        ChangeUserTitle.text()
    }

	String getPasswordCaption() {
        ChangePasswordTitle.text()
    }
	
	void setUsername(newUser,retypeNewUser){
		newUserText.value(newUser)
		retypeUserText.value(retypeNewUser)
	}
	void setPassword(currPassword,newPassword,retypeNewPassword){
		currentPasswordText.value(currPassword)
		newPasswordText.value(newPassword)
		retypePasswordText.value(retypeNewPassword)
	}
	
	void changeUsername(newUser,retypeNewUser){
		setUsername(newUser,retypeNewUser)
		apply(0).click()
	}
	
	void changePassword(currPassword,newPassword,retypeNewPassword){
		setPassword(currPassword,newPassword,retypeNewPassword)
		apply(1).click()
	}
	
	void resetUserNameChange(newUser,retypeNewUser){
		setUsername(newUser,retypeNewUser)
		reset(0).click()
	}
	void resetPasswordChange(currPassword,newPassword,retypeNewPassword){
		setPassword(currPassword,newPassword,retypeNewPassword)
		reset(1).click()
	}
}
