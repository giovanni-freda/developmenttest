define(['core', '../../../../src/js/views/solutionsSummaryNextView', '../../../../src/js/models/solutionSummaryModel', '../../../../src/js/views/lddAlertContainer','jquery'],
    function(Core, SolutionsSummaryNextView, SolutionSummaryModel, LddAlertContainer, $) {
    "use strict";
    
    describe('Solution Summary Next View', function() {
        var solutionSummaryNextView;
        var solutionSummaryModel;
        
        beforeEach(function() {
            solutionSummaryNextView = new SolutionsSummaryNextView({});
            solutionSummaryModel = createModel();
        });
        
        describe('render', function(){
            it('should return itself', function(){
                new LddAlertContainer().render();
                var ret = solutionSummaryNextView.render(solutionSummaryModel);
                expect(ret).toBe(solutionSummaryNextView);
                expect(solutionSummaryNextView.$element.attr('devicegroups')).toBe(solutionSummaryModel.devicegroups);
                expect(solutionSummaryNextView.$element.attr('clientgroups')).toBe(solutionSummaryModel.clientgroups);
                expect(solutionSummaryNextView.$element.attr('esfapps')).toBe(solutionSummaryModel.esfapps);                
            });
        });

        describe('onBack', function() {
            it('should trigger onBack', function() {
                var callback = sinon.spy();
                solutionSummaryNextView.on('onBack', callback);
                solutionSummaryNextView.onBack();
                expect(callback.calledOnce).toBeTruthy();
                solutionSummaryNextView.off('onBack', callback);
            })
        })

        function createModel(){
            return new SolutionSummaryModel({
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
                configs: [
                {
                name: "CONFIGURATION NAME1",
                type: "DATA TYPE",
                value: [
                "SET OF VALUES IF APPLICABLE"
                ],
                defaultvalue: "VALUE1"
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