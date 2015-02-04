define(['core', '../../../../src/js/views/solutionSecuritySetupView', '../../../../src/js/models/solutionModel', 'jquery', '../../../../src/js/views/lddAlertContainer'],
    function(Core, SolutionSecuritySetupView, SolutionModel, $, LddAlertContainer) {
    "use strict";
    
    describe('Solution Security Setup View', function() {
        var solutionSSView;
        var solutionModel;
        var mockSolutionsController;
        var mockAlertContainer;
        
        beforeEach(function() {
            mockSolutionsController = {};
            mockSolutionsController.saveSolutionUCFFile = sinon.stub();
            mockAlertContainer = {};
            mockAlertContainer.showAlert = sinon.stub();
            
            solutionSSView = new SolutionSecuritySetupView({solutionsController: mockSolutionsController, alertContainer: mockAlertContainer});
            solutionModel = createModel();
            
        });
        
        describe('render', function(){
            it('should return itself', function(){
                solutionSSView.createControls(solutionModel);
                var ret = solutionSSView.render();
                expect(ret).toBe(solutionSSView);
            });
        });

        describe('when a file is selected', function(){
        
            var spy;
            
            var collection;
            var items;
            
            //var checklistItems;
            var applyButton;
            var cancelButton;
            
            beforeEach(function() {
                spy = sinon.spy(solutionSSView, "changeFile");
                solutionSSView.render(solutionModel);
                collection = solutionSSView.secFileList.getCollectionView();
                items = collection.getItems();
                applyButton = solutionSSView.$('#securitySetupApply');
                cancelButton = solutionSSView.$('#securitySetupCancel');
            });
            
            it('apply button should be disabled', function(){
                var button =solutionSSView.$('#securitySetupApply');
                var isDisabled = button.attr('disabled');
                expect(isDisabled).toBeTruthy();
            });

            it('should call changeFile once', function(){

                var item = items[1];
                
                solutionSSView.secFileList.select(item);
                
                expect(solutionSSView.changeFile.calledOnce).toBe(true);
            });


            it('should display the contents of the file in the securitySetupFileContents div', function(){

                for(var i=0; i < items.length; i++){
                    var item = items[i];
                    solutionSSView.secFileList.select(item);
                    expect(solutionModel.attributes.securitysetupfiles[i].config).toBe(solutionSSView.$('#ssfcArea').val());
                }
            });

            it('should display the checklist of fw levels',function(){

                solutionSSView.render(solutionModel);

                for(var i=0; i < items.length; i++){
                    var item = items[i];
                    var deviceTypes = solutionModel.attributes.securitysetupfiles[i].devicetypes;

                    solutionSSView.secFileList.select(item);
                    
                    var checklistItems = solutionSSView.targetList.getCollectionView().getItems();

                    expect(deviceTypes.length).toBe(checklistItems.length);

                    for(var j=0; j < checklistItems.length; j++){
                        expect(checklistItems[j].sourceItem.type).toBe(deviceTypes[j].type);
                        var isSelected = checklistItems[j].isSelected;
                        
                        if(deviceTypes[j].deployto == true){
                            expect(isSelected).toBeTruthy();
                        }
                        else{
                            expect(isSelected).toBeFalsy();
                        }
                    }
                }
            });
            describe('when a fw type is toggled', function(){
                var checklistItems;
                var originalCheckState;
                beforeEach(function(){
                    checklistItems = solutionSSView.targetList.getCollectionView().getItems();
                    
                    originalCheckState = checklistItems[0].isSelected;
                    
                    if(checklistItems[0].isSelected) solutionSSView.targetList.deselect(checklistItems[0]);
                    else solutionSSView.targetList.select(checklistItems[0]);
                    
                });
                it('should enable the apply and cancel buttons', function(){

                    var isDisabled = applyButton.attr('disabled');
                    expect(isDisabled).toBeFalsy();
                    isDisabled = cancelButton.attr('disabled');
                    expect(isDisabled).toBeFalsy();
                });
                
                describe('when apply button is clicked', function(){
                    it('should call solutionsController.saveSolutionUCFFile once', function(){
                        applyButton.click();
                        expect(mockSolutionsController.saveSolutionUCFFile.calledOnce).toBeTruthy();
                    });
                    it('cancel and apply buttons should be disabled', function(){
                        cancelButton.click();
                        var isDisabled = applyButton.attr('disabled');
                        expect(isDisabled).toBeTruthy();
                        isDisabled = cancelButton.attr('disabled');
                        expect(isDisabled).toBeTruthy();
                    });
                    it('on success it should display a "success" alert and an alert regarding Policy Update', function(){
                        mockSolutionsController.saveSolutionUCFFile.callsArg(2);
                        applyButton.click();
                        expect(mockAlertContainer.showAlert.calledTwice).toBeTruthy();
                    });
                    it('on failure is should display a "failure" alert', function(){
                        mockSolutionsController.saveSolutionUCFFile.callsArg(3);
                        applyButton.click();
                        expect(mockAlertContainer.showAlert.calledOnce).toBeTruthy();
                    });
                });
                
                describe('when cancel button is clicked', function(){
                    it('should reset check boxes to original state', function(){
                        cancelButton.click();
                        expect(originalCheckState == checklistItems[0].isSelected).toBeTruthy();
                    });
                    it('cancel and apply buttons should be disabled', function(){
                        cancelButton.click();
                        var isDisabled = applyButton.attr('disabled');
                        expect(isDisabled).toBeTruthy();
                        isDisabled = cancelButton.attr('disabled');
                        expect(isDisabled).toBeTruthy();
                    });
                });
            });
            describe('when file contents are changed', function(){
                var originalFileContents;
                var updatedFileContents;
                beforeEach(function(){

                    originalFileContents = solutionSSView.$('#ssfcArea').val();
                    updatedFileContents = "TEST CONTENT";
                    solutionSSView.$('#ssfcArea').val(updatedFileContents);
                    solutionSSView.$('#ssfcArea').trigger("input");
                    expect(solutionSSView.$('#ssfcArea').val() == updatedFileContents).toBeTruthy();
                    expect(solutionSSView.$('#ssfcArea').val() == originalFileContents).toBeFalsy();
                    
                });
                
                it('should enable the apply and cancel buttons', function(){

                    var isDisabled = applyButton.attr('disabled');
                    expect(isDisabled).toBeFalsy();
                    isDisabled = cancelButton.attr('disabled');
                    expect(isDisabled).toBeFalsy();
                });
                
                describe('when apply button is clicked', function(){
                    it('should call solutionsController.saveSolutionUCFFile once', function(){
                        applyButton.click();
                        expect(mockSolutionsController.saveSolutionUCFFile.calledOnce).toBeTruthy();
                    });
                    it('cancel and apply buttons should be disabled', function(){
                        cancelButton.click();
                        var isDisabled = applyButton.attr('disabled');
                        expect(isDisabled).toBeTruthy();
                        isDisabled = cancelButton.attr('disabled');
                        expect(isDisabled).toBeTruthy();
                    });
                    it('on success it should display a "success" alert and an alert regarding Policy Update', function(){
                        mockSolutionsController.saveSolutionUCFFile.callsArg(2);
                        applyButton.click();
                        expect(mockAlertContainer.showAlert.calledTwice).toBeTruthy();
                    });
                    it('on failure is should display a "failure" alert', function(){
                        mockSolutionsController.saveSolutionUCFFile.callsArg(3);
                        applyButton.click();
                        expect(mockAlertContainer.showAlert.calledOnce).toBeTruthy();
                    });
                });
                
                describe('when cancel button is clicked', function(){
                    it('file contents should return to original string', function(){
                        cancelButton.click();
                        expect(originalFileContents == solutionSSView.$('#ssfcArea').val()).toBeTruthy();
                    });
                    it('cancel and apply buttons should be disabled', function(){
                        cancelButton.click();
                        var isDisabled = applyButton.attr('disabled');
                        expect(isDisabled).toBeTruthy();
                        isDisabled = cancelButton.attr('disabled');
                        expect(isDisabled).toBeTruthy();
                    });
                });
            });
        });

        function createModel(){
            return new SolutionModel({
name: "RandomSolution14",
version: "VERSION INFO4",
installtime: "INSTALL TIME4",
updatetime: "UPDATE TIME4",
devicegroups: [
{
name: "DEVICE GROUP1 NAME4"
},
{
name: "DEVICE GROUP2 NAME4"
},
{
name: "DEVICE GROUP3 NAME4"
},
{
name: "DEVICE GROUP4 NAME4"
},
{
name: "DEVICE GROUP5 NAME4"
},
{
name: "DEVICE GROUP6 NAME4"
}
],
clientgroups: [
{
name: "CLIENT GROUP NAME4"
}
],
eforms: [
{
author: "SOM4",
description: "DESCRIPTION4",
expirationdate: "EXPIRATION DATE4",
lastmodified: "LAST MODIFIED DATE4"
}
],
reports: "REPORT SUMMARY4",
esfapps: [
{
name: "ESF APP NAME4",
version: "ESF VERSION INFO4"
}
],
configs: [
{
name: "CONFIGURATION NAME4",
type: "DATA TYPE",
value: [
"SET OF VALUES IF APPLICABLE"
],
defaultvalue: "VALUE4"
},
{
name: "CONFIGURATION NAME A4",
type: "inputfield",
value: [
"SET OF VALUES IF APPLICABLE"
],
defaultvalue: "VALUEA4"
},
{
name: "CONFIGURATION NAME B4",
type: "combobox",
value: [
"VALUEB4",
"VALUE_BB",
"VALUE_BBB"
],
defaultvalue: "VALUEB4"
}
],
securitysetupfiles: [
{
name: "SECURITY SETUP FILE NAME4",
config: "UCF FILE CONTENT",
devicetypes: [
{
type: "e-Task 2 4",
deployto: true
},
{
type: "e-Task 2+ 4",
deployto: false
},
{
type: "e-Task 3 4",
deployto: true
},
{
type: "e-Task 4 4",
deployto: false
}
]
},
{
name: "SECURITY SETUP FILE NAME4A",
config: "UCF FILE CONTENT A",
devicetypes: [
{
type: "e-Task 2 4A",
deployto: false
},
{
type: "e-Task 2+ 4A",
deployto: true
},
{
type: "e-Task 3 4A",
deployto: false
},
{
type: "e-Task 4 4A",
deployto: true
}
]
},
{
name: "SECURITY SETUP FILE NAME4B",
config: "UCF FILE CONTENT B",
devicetypes: [
{
type: "e-Task 2 4B",
deployto: true
},
{
type: "e-Task 2+ 4B",
deployto: false
},
{
type: "e-Task 3 4B",
deployto: true
},
{
type: "e-Task 4 4B",
deployto: false
}
]
},
{
name: "SECURITY SETUP FILE NAME4C",
config: "UCF FILE CONTENT C",
devicetypes: [
{
type: "e-Task 2 4C",
deployto: false
},
{
type: "e-Task 2+ 4C",
deployto: true
},
{
type: "e-Task 3 4C",
deployto: false
},
{
type: "e-Task 4 4C",
deployto: true
}
]
}
]
});
        }
    });
});