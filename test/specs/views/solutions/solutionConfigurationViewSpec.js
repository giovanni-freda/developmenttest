define(['../../../../src/js/views/solutionConfigurationView','../../../../src/js/models/solutionModel','core', 'jquery'], function(SolutionConfigurationView, SolutionModel, Core, $) {
    "use strict";

    describe('SolutionConfigurationView', function() {
        var solutionConfigurationView;
        var solutionModel;
        describe('(Integration)', function() {
            beforeEach(function() {
                solutionConfigurationView = new SolutionConfigurationView();
                solutionModel = createModel();
            });

            afterEach(function() {
                solutionConfigurationView.remove();
                solutionConfigurationView.stopListening();
                delete this.solutionConfigurationView;
            });

            describe('render', function(){
                it('should return itself', function(){
                    solutionConfigurationView.createControls(solutionModel);
                    var ret = solutionConfigurationView.render(solutionModel);
                    expect(ret).toBe(solutionConfigurationView);
                });
            });

            describe('render after completed processing', function(){
                it('should render after control completed processing', function(){
                    solutionConfigurationView.render(solutionModel);
                    solutionConfigurationView.createControls(solutionModel);
                    var x = solutionConfigurationView.$('#configurationApply');
                    expect(x).toBeDefined();
                });
            });

            describe('when a apply is selected', function() {
                it('should call apply solution once', function() {
                    solutionConfigurationView.createControls(solutionModel);
                    var ret = solutionConfigurationView.render(solutionModel);

                    var inputName = solutionConfigurationView.configData.rows[1].lddName;
                    var inputSelector = 'input[name*="' + inputName + '"]';
                    ret.$( inputSelector ).val('mytest');
                    ret.$( inputSelector ).trigger("keyup");
                    ret.$('#configurationApply').click();


                    expect(Object.keys(solutionConfigurationView.changedConfigData).length).toBeGreaterThan(0);
                });
            });

            describe('when a reset is selected', function() {
                it('should call reset solution once', function() {

                    solutionConfigurationView.remove();
                    solutionConfigurationView.stopListening();
                    delete this.solutionConfigurationView;

                    var resetSolutionSpy = sinon.spy(SolutionConfigurationView.prototype, "resetSolution");
                    solutionConfigurationView = new SolutionConfigurationView();
                    solutionConfigurationView.createControls(solutionModel);
                    var ret = solutionConfigurationView.render(solutionModel);

                    ret.$('#configurationReset').click();

                    expect(resetSolutionSpy.calledOnce).toBeTruthy();
                    resetSolutionSpy.restore();
                });
            });

            describe('when a inputfield is modified', function() {
                it('should set dirty flag on field', function() {


                    solutionConfigurationView.createControls(solutionModel);
                    var ret = solutionConfigurationView.render(solutionModel);
                    var inputName = solutionConfigurationView.configData.rows[1].lddName;
                    ret.$('input[name*="' + inputName + '"]' ).val('mytest');
                    ret.$('input[name*="' + inputName + '"]' ).trigger("keyup");

                    expect(solutionConfigurationView.configData.rows[1].dirty).toBeTruthy();
                });

            });
        });

        describe('(Unit)', function() {
            describe('when changes are applied', function() {
                var mockSolutionsController;
                beforeEach(function(){
                    mockSolutionsController = {};
                    mockSolutionsController.saveSolutionConfigSettings = function(solutionModel,changedConfigData,successCallBack) {};
                    solutionModel = createModel();
                    solutionConfigurationView = new SolutionConfigurationView({solutionsController: mockSolutionsController});
                });

                afterEach(function() {
                    solutionConfigurationView.remove();
                    solutionConfigurationView.stopListening();
                    delete this.solutionConfigurationView;
                });


                it('should set dirty for checkbox', function() {
                    solutionConfigurationView.createControls(solutionModel);
                    var ret = solutionConfigurationView.render(solutionModel);
                    var configDataRow = solutionConfigurationView.configData.rows[4];
                    var inputName = configDataRow.lddName;
                   // ret.$('input[name*="' + inputName + '"]' ).val(true);
                    ret.$('input[name*="' + inputName + '"]' ).attr("checked",!(configDataRow.defaultvalue == "true"));
                    ret.$('input[name*="' + inputName + '"]' ).trigger('change');

                    solutionConfigurationView.applySolution()
                    expect(configDataRow.dirty).toBeTruthy();
                });

                it('should not set dirty when its default value', function() {
                    solutionConfigurationView.createControls(solutionModel);
                    var ret = solutionConfigurationView.render(solutionModel);
                    var configDataRow = solutionConfigurationView.configData.rows[4];
                    var inputName = configDataRow.lddName;
                    // ret.$('input[name*="' + inputName + '"]' ).val(true);
                    ret.$('input[name*="' + inputName + '"]' ).attr("checked",configDataRow.defaultvalue );
                    ret.$('input[name*="' + inputName + '"]' ).trigger('change');

                    solutionConfigurationView.applySolution()
                    expect(configDataRow.dirty).toBeFalsy();
                });

                it('should get correct value for select', function() {
                    solutionConfigurationView.createControls(solutionModel);
                    var ret = solutionConfigurationView.render(solutionModel);
                    var configDataRow = solutionConfigurationView.configData.rows[2];
                    var inputName = configDataRow.lddName;
                    // ret.$('input[name*="' + inputName + '"]' ).val(true);
                    ret.$('select[name*="' + inputName + '"]' ).val("VALUE_CC");
                    ret.$('select[name*="' + inputName + '"]' ).trigger('change');

                    solutionConfigurationView.applySolution()
                    expect(configDataRow.dirty).toBeTruthy();
                });

                it('should get correct value for text', function() {
                    solutionConfigurationView.createControls(solutionModel);
                    var ret = solutionConfigurationView.render(solutionModel);
                    var configDataRow = solutionConfigurationView.configData.rows[1];
                    var inputName = configDataRow.lddName;
                    // ret.$('input[name*="' + inputName + '"]' ).val(true);
                    ret.$('input[name*="' + inputName + '"]' ).val("VALUE_CC");
                    ret.$('input[name*="' + inputName + '"]' ).trigger('keyup');

                    solutionConfigurationView.applySolution()
                    expect(configDataRow.dirty).toBeTruthy();
                });

                it('should get correct value for password', function() {
                    solutionConfigurationView.createControls(solutionModel);
                    var ret = solutionConfigurationView.render(solutionModel);
                    var configDataRow = solutionConfigurationView.configData.rows[5];
                    var inputName = configDataRow.lddName;
                    // ret.$('input[name*="' + inputName + '"]' ).val(true);
                    ret.$('input[name*="' + inputName + '"]' ).val("VALUE_CC");
                    ret.$('input[name*="' + inputName + '"]' ).trigger('keyup');

                    solutionConfigurationView.applySolution()
                    expect(configDataRow.dirty).toBeTruthy();
                });
            });

            describe('successCallback', function() {
                var mockSolutionsController;
                beforeEach(function(){
                    mockSolutionsController = {};
                    mockSolutionsController.saveSolutionConfigSettings = function(solutionModel,changedConfigData,successCallBack) {};
                    solutionModel = createModel();
                    solutionModel.fetch = sinon.stub();
                    solutionConfigurationView = new SolutionConfigurationView({solutionsController: mockSolutionsController});
                    solutionConfigurationView.solutionModel = solutionModel;
                    solutionConfigurationView.successCallBack();
                });

                afterEach(function() {
                    solutionConfigurationView.remove();
                    solutionConfigurationView.stopListening();
                    delete this.solutionConfigurationView;
                });

                it('should set control processing completed to true', function() {
                    expect(solutionConfigurationView.controlProcessingCompleted).toBeTruthy();
                });

                it('should reset changed config data', function() {
                    expect(Object.keys(solutionConfigurationView.changedConfigData).length).toBe(0);
                });

                it('should call fetch on solution model', function() {
                    expect(solutionModel.fetch.calledOnce).toBeTruthy();
                });
            });
        })


        function createModel(){
            return new SolutionModel({
                name: "RandomSolution11",
                version: "VERSION INFO1",
                installtime: "INSTALL TIME1",
                updatetime: "UPDATE TIME1",
                devicegroups: [
                    {
                        name: "DEVICE GROUP1 NAME1"
                    },
                    {
                        name: "DEVICE GROUP2 NAME1"
                    },
                    {
                        name: "DEVICE GROUP3 NAME1"
                    },
                    {
                        name: "DEVICE GROUP4 NAME1"
                    },
                    {
                        name: "DEVICE GROUP5 NAME1"
                    },
                    {
                        name: "DEVICE GROUP6 NAME1"
                    }
                ],
                clientgroups: [
                    {
                        name: "CLIENT GROUP NAME1"
                    }
                ],
                eforms: [
                    {
                        author: "SOM1",
                        description: "DESCRIPTION1",
                        expirationdate: "EXPIRATION DATE1",
                        lastmodified: "LAST MODIFIED DATE1"
                    }
                ],
                reports: "REPORT SUMMARY1",
                esfapps: [
                    {
                        name: "ESF APP NAME1",
                        version: "ESF VERSION INFO1"
                    }
                ],
                "configs":[ {
                    "LDDName" :"GS_CONFIGURATION_NAME",
                    "name": "CONFIGURATION NAME1",
                    "defaultvalue":"VALUE1",
                    "descriptor": {
                        "possibleValues": null,
                        "possibleValuesWithDisplayStrings": null,
                        "type": null,
                        "max": 0,
                        "min": 0,
                        "required": false,
                        "patternMatch": null
                    }
                },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_A",
                        "name": "CONFIGURATION NAME A1",
                        "defaultvalue":"VALUEA1",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "inputfield",
                            "max": 0,
                            "min": 0,
                            "required": false,
                            "patternMatch": null
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_B",
                        "name": "CONFIGURATION NAME B1",
                        "defaultvalue":"VALUEB1",
                        "descriptor": {
                            "possibleValues": ["VALUEB1","VALUE_BB","VALUE_BBB"],
                            "possibleValuesWithDisplayStrings": null,
                            "type": "combobox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_C",
                        "name": "CONFIGURATION NAME C1",
                        "defaultvalue":"VALUEC1",
                        "descriptor": {
                            "possibleValues": ["VALUEC1","VALUE_CC","VALUE_CCC"],
                            "possibleValuesWithDisplayStrings": null,
                            "type": "listbox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_D",
                        "name": "CONFIGURATION NAME D1",
                        "defaultvalue":"true",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "checkbox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_E",
                        "name": "CONFIGURATION NAME E1",
                        "defaultvalue":"VALUEE1",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "passwordfield",
                            "max": 0,
                            "min": 0,
                            "required": false,
                            "patternMatch": null
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_F",
                        "name": "CONFIGURATION NAME F1",
                        "defaultvalue":"VALUEF1",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "inputfield",
                            "max": 0,
                            "min": 0,
                            "required": false,
                            "patternMatch": null
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_G",
                        "name": "CONFIGURATION NAME G1",
                        "defaultvalue":"VALUEG1",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "inputfield",
                            "max": 0,
                            "min": 0,
                            "required": false,
                            "patternMatch": null
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_H",
                        "name": "CONFIGURATION NAME H1",
                        "defaultvalue":"VALUEH1",
                        "descriptor": {
                            "possibleValues": ["VALUEH1","VALUE_HH","VALUE_HHH"],
                            "possibleValuesWithDisplayStrings": null,
                            "type": "combobox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_I",
                        "name": "CONFIGURATION NAME I1",
                        "defaultvalue":"VALUEI1",
                        "descriptor": {
                            "possibleValues": ["VALUEI1","VALUE_II","VALUE_III"],
                            "possibleValuesWithDisplayStrings": null,
                            "type": "listbox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_J",
                        "name": "CONFIGURATION NAME J1",
                        "defaultvalue":"true",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "checkbox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_K",
                        "name": "CONFIGURATION NAME K1",
                        "defaultvalue":"VALUEK1",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "passwordfield",
                            "max": 0,
                            "min": 0,
                            "required": false,
                            "patternMatch": null
                        }
                    },


                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_L",
                        "name": "CONFIGURATION NAME L1",
                        "defaultvalue":"VALUEL1",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "inputfield",
                            "max": 0,
                            "min": 0,
                            "required": false,
                            "patternMatch": null
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_M",
                        "name": "CONFIGURATION NAME M1",
                        "defaultvalue":"VALUEM1",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "inputfield",
                            "max": 0,
                            "min": 0,
                            "required": false,
                            "patternMatch": null
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_N",
                        "name": "CONFIGURATION NAME N1",
                        "defaultvalue":"VALUEN1",
                        "descriptor": {
                            "possibleValues": ["VALUEN1","VALUE_NN","VALUE_NNN"],
                            "possibleValuesWithDisplayStrings": null,
                            "type": "combobox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_O",
                        "name": "CONFIGURATION NAME O1",
                        "defaultvalue":"VALUEO1",
                        "descriptor": {
                            "possibleValues": ["VALUEO1","VALUE_OO","VALUE_OOO"],
                            "possibleValuesWithDisplayStrings": null,
                            "type": "listbox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_P",
                        "name": "CONFIGURATION NAME P1",
                        "defaultvalue":"true",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "checkbox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_Q",
                        "name": "CONFIGURATION NAME Q1",
                        "defaultvalue":"VALUEQQ1",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "passwordfield",
                            "max": 0,
                            "min": 0,
                            "required": false,
                            "patternMatch": null
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_R",
                        "name": "CONFIGURATION NAME R1",
                        "defaultvalue":"VALUER1",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "inputfield",
                            "max": 0,
                            "min": 0,
                            "required": false,
                            "patternMatch": null
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_S",
                        "name": "CONFIGURATION NAME S1",
                        "defaultvalue":"VALUES1",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "inputfield",
                            "max": 0,
                            "min": 0,
                            "required": false,
                            "patternMatch": null
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_T",
                        "name": "CONFIGURATION NAME T1",
                        "defaultvalue":"VALUET1",
                        "descriptor": {
                            "possibleValues": ["VALUET1","VALUE_TT","VALUE_TTT"],
                            "possibleValuesWithDisplayStrings": null,
                            "type": "combobox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_U",
                        "name": "CONFIGURATION NAME U1",
                        "defaultvalue":"VALUEU1",
                        "descriptor": {
                            "possibleValues": ["VALUEU1","VALUE_UU","VALUE_UUU"],
                            "possibleValuesWithDisplayStrings": null,
                            "type": "listbox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_V",
                        "name": "CONFIGURATION NAME V1",
                        "defaultvalue":"true",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "checkbox"
                        }
                    },
                    {
                        "LDDName" :"GS_CONFIGURATION_NAME_W",
                        "name": "CONFIGURATION NAME W1",
                        "defaultvalue":"VALUEW1",
                        "descriptor": {
                            "possibleValues": null,
                            "possibleValuesWithDisplayStrings": null,
                            "type": "passwordfield",
                            "max": 0,
                            "min": 0,
                            "required": false,
                            "patternMatch": null
                        }
                    }
                ],
                securitysetupfiles: [
                    {
                        name: "SECURITY SETUP FILE NAME1",
                        config: {
                            ucfconfig: "UCF FILE CONTENT",
                            devicetypes: [
                                {
                                    type: "e-Task 2 1"
                                },
                                {
                                    type: "e-Task 2+ 1"
                                },
                                {
                                    type: "e-Task 3 1"
                                },
                                {
                                    type: "e-Task 4 1"
                                }
                            ]
                        }
                    },
                    {
                        name: "SECURITY SETUP FILE NAME1A",
                        config: {
                            ucfconfig: "UCF FILE CONTENT A",
                            devicetypes: [
                                {
                                    type: "e-Task 2 1A",
                                    deployTo: true
                                },
                                {
                                    type: "e-Task 2+ 1A",
                                    deployTo: true
                                },
                                {
                                    type: "e-Task 3 1A",
                                    deployTo: false
                                },
                                {
                                    type: "e-Task 4 1A",
                                    deployTo: true
                                }
                            ]
                        }
                    },
                    {
                        name: "SECURITY SETUP FILE NAME1B",
                        config: {
                            ucfconfig: "UCF FILE CONTENT B",
                            devicetypes: [
                                {
                                    type: "e-Task 2 1B"
                                },
                                {
                                    type: "e-Task 2+ 1B"
                                },
                                {
                                    type: "e-Task 3 1B"
                                },
                                {
                                    type: "e-Task 4 1B"
                                }
                            ]
                        }
                    },
                    {
                        name: "SECURITY SETUP FILE NAME1C",
                        config: {
                            ucfconfig: "UCF FILE CONTENT C",
                            devicetypes: [
                                {
                                    type: "e-Task 2 1C"
                                },
                                {
                                    type: "e-Task 2+ 1C"
                                },
                                {
                                    type: "e-Task 3 1C"
                                },
                                {
                                    type: "e-Task 4 1C"
                                }
                            ]
                        }
                    }
                ]
            });
        }

    });
});