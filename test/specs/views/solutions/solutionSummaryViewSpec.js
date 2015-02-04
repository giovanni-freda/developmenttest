define(['core', '../../../../src/js/views/solutionsSummaryView', '../../../../src/js/models/solutionSummaryModel', 'jquery'],
    function(Core, SolutionsSummaryView, SolutionSummaryModel, $) {
    "use strict";
    
    describe('Solution Summary View', function() {
        var solutionSummaryView;
        var solutionSummaryModel;
        
        beforeEach(function() {
            solutionSummaryView = new SolutionsSummaryView({});
            solutionSummaryModel = createModel();
        });
        
        describe('render', function(){
            it('should return itself', function(){
                var ret = solutionSummaryView.render(solutionSummaryModel);
                expect(ret).toBe(solutionSummaryView);
                expect(solutionSummaryView.$element.attr('name')).toBe(solutionSummaryModel.name);
                expect(solutionSummaryView.$element.attr('installtime')).toBe(solutionSummaryModel.installtime);
                expect(solutionSummaryView.$element.attr('updatetime')).toBe(solutionSummaryModel.updatetime);
                expect(solutionSummaryView.$element.attr('reports')).toBe(solutionSummaryModel.reports);
                expect(solutionSummaryView.$element.attr('version')).toBe(solutionSummaryModel.version);
                expect(solutionSummaryView.$element.attr('securitysetupfiles')).toBe(solutionSummaryModel.securitysetupfiles);
                expect(solutionSummaryView.$element.attr('eforms')).toBe(solutionSummaryModel.eforms);
             });
        });

        describe('clickNext', function(){
            it('should go to the nextpage', function(){         
                var ret = solutionSummaryView.render(solutionSummaryModel);
                var nextButton = ret.$("#solnsummarynextbtn").trigger("click");
            });
        });

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