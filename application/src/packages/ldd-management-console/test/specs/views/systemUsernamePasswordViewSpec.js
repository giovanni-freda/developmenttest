define(['../../../src/js/views/systemUsernamePasswordView', 'core'], function (SystemUsernamePasswordView, Core) {
    "use strict";

    describe('SystemUsernamePassword View', function () {
        var systemUsrPwdView;
        var usernameModel;
        var mockSystemController;
        var mockAlertContainer;
        var mockUsernameModel;
        var mockPasswordModel;
        beforeEach(function() {
            mockSystemController = {};
            mockSystemController.updateSystemUserName = sinon.stub();
            mockSystemController.updateSystempassword = sinon.stub();
            mockAlertContainer = {};
            mockAlertContainer.showAlert = sinon.stub();
            systemUsrPwdView = new SystemUsernamePasswordView({systemController: mockSystemController, alertContainer: mockAlertContainer});
        });
        
        describe('when Rendering', function () {
            var returnValue;
            beforeEach(function() {
                returnValue = systemUsrPwdView.render();
            });
            it('should return SystemUsernamePasswordView', function () {
                expect(returnValue).toBe(systemUsrPwdView);
            });

            it('apply button of username change should be disabled', function(){
                systemUsrPwdView.resetUserName();
                var button =systemUsrPwdView.$('#applyUserName');
                var isDisabled = button.attr('disabled');
                expect(isDisabled).toBeTruthy();
            });

            it('apply button of password change should be disabled', function(){
                systemUsrPwdView.resetPassword();
                var button =systemUsrPwdView.$('#applyPassword');
                var isDisabled = button.attr('disabled');
                expect(isDisabled).toBeTruthy();
            }); 
            it('enable UserName Apply button', function(){
                systemUsrPwdView.enableUserNameApply();
                var button =systemUsrPwdView.$('#applyUserName');
                var isDisabled = button.attr('disabled');
                expect(isDisabled).toBeFalsy();
            }); 
            it('enable Password Apply button', function(){
                systemUsrPwdView.enablePasswordApply();
                var button =systemUsrPwdView.$('#applyPassword');
                var isDisabled = button.attr('disabled');
                expect(isDisabled).toBeFalsy();
            }); 
        });
        describe('apply user name change', function () {
            var ret;
            beforeEach(function() {
               ret = systemUsrPwdView.render();
            });
            it('apply user name change validation success', function () {
                ret.$('#txtusername').val('myuser');
                ret.$('#txtretypeusername').val('myuser');
                ret.$('#txtretypeusername' ).trigger('change');
                systemUsrPwdView.applyUserName();
                expect(mockSystemController.updateSystempassword.calledOnce).toBeFalsy();
            });
            it('apply user name change validation failure', function () {
                ret.$('#txtusername').val('myuser');
                ret.$('#txtretypeusername').val('myuser1');
                ret.$('#txtretypeusername' ).trigger('change');
                systemUsrPwdView.applyUserName();
                expect(mockAlertContainer.showAlert.calledOnce).toBeTruthy();
            });
            it('apply user name change success with success callback', function () {
                mockSystemController.updateSystemUserName.callsArg(1);
                ret.$('#txtusername').val('myuser');
                ret.$('#txtretypeusername').val('myuser');
                ret.$('#txtretypeusername' ).trigger('change');
                systemUsrPwdView.applyUserName();
                expect(mockSystemController.updateSystemUserName.calledOnce).toBeTruthy();
            });
             it('apply user name change success with failure Callback', function () {
                mockSystemController.updateSystemUserName.callsArg(2);
                ret.$('#txtusername').val('myuser');
                ret.$('#txtretypeusername').val('myuser');
                ret.$('#txtretypeusername' ).trigger('change');
                systemUsrPwdView.applyUserName();
                expect(mockAlertContainer.showAlert.calledOnce).toBeTruthy();
            });
        });
        describe('apply password change', function () {
             var ret;
            beforeEach(function() {
                ret = systemUsrPwdView.render();
            });
            it('apply password change success', function () {
                ret.$('#txtcurrentpassword').val('myOldpassword');
                ret.$('#txtnewpassword').val('mypassword');
                ret.$('#txtretypenewpassword').val('mypassword');
                ret.$('#txtretypenewpassword' ).trigger('change');
                systemUsrPwdView.applyPassword();
                expect(mockSystemController.updateSystempassword.calledOnce).toBeTruthy();
            });
            it('apply password change validation failure', function () {
                ret.$('#txtnewpassword').val('mypassword');
                ret.$('#txtretypenewpassword').val('mypassword1');
                ret.$('#txtretypenewpassword' ).trigger('change');
                systemUsrPwdView.applyPassword();
                expect(mockAlertContainer.showAlert.calledOnce).toBeTruthy();
            });
            it('apply password change success callback', function () {
                mockSystemController.updateSystempassword.callsArg(1);
                ret.$('#txtcurrentpassword').val('myOldpassword');
                ret.$('#txtnewpassword').val('mypassword');
                ret.$('#txtretypenewpassword').val('mypassword');
                ret.$('#txtretypenewpassword' ).trigger('change');
                systemUsrPwdView.applyPassword();
                expect(mockSystemController.updateSystempassword.calledOnce).toBeTruthy();
            });
            it('apply password change failure callback', function () {
                mockSystemController.updateSystempassword.callsArg(2);
                ret.$('#txtcurrentpassword').val('myOldpassword');
                ret.$('#txtnewpassword').val('mypassword');
                ret.$('#txtretypenewpassword').val('mypassword');
                ret.$('#txtretypenewpassword' ).trigger('change');
                systemUsrPwdView.applyPassword();
                expect(mockAlertContainer.showAlert.calledOnce).toBeTruthy();
            });
        });
    });
});