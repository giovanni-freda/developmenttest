define(['../../../../src/js/views/solutionsView', 'core', 'jquery', '../../../../src/js/eventAggregator'], function (SolutionsView, Core, jQuery, EventAggregator) {
    "use strict";

    describe('Solutions View', function () {
        var solutionsView;
        var mockLocation;
        var mockSession;
        var mockSolutionsController;
        var mockSolutionsSummaryView;
        var mockSolutionsSummaryNextView;
        var mockSolutionsSecuritySetupView;
        var mockSolutionsConfigurationView;
        var mockGrid;
        var mockCreateGrid;
        var mockAlertContainer;
        var mockInspectorView;
        var stubSolution = {name: 'test'};
        var stubModel = {attributes: stubSolution};
        var centerButtons = [
            {title: "Install Solution" ,id: "solutionInstallButton", disabled: false, icon: "solutionInstallIcon icon-add" , event: 'solution:install'}
        ];

        var rightButtons =
        [
            {title: "Summary" ,id: "solutionSummaryButton", class: "solutionSummaryButton", disabled: true, icon: "solutionSummaryIcon icon-properties_outline" , event: 'solution:summary'}
        ];

        var mockToolbarDefinition = {
            getToolbarDefinition: sinon.stub().returns({ centerButtons: centerButtons, rightButtons: rightButtons})
        };
        beforeEach(function () {
            mockSolutionsController = {};

            mockSolutionsController.loadSolutions = sinon.spy();
            mockSolutionsController.getSolutionRows = sinon.spy();
            mockSolutionsController.getSolutionGridColumns = sinon.spy();
            mockSolutionsController.getDrawerModel = sinon.spy();
            mockSolutionsController.requestNotificationOnRemove = sinon.spy();
            mockSolutionsController.getSolutionSummaryModel = sinon.stub().returns({name: 'test', attributes: {name: 'test'}});
            mockSolutionsController.requestNotificationOnRemove = sinon.spy();

            mockSolutionsController.solutionCollection = {
                items: [stubSolution],
                at: function(index) {return mockSolutionsController.solutionCollection.items[index];}
            };

            mockLocation = {
                navigate: sinon.spy()
            };

            mockSession = {
                isActive: sinon.stub().returns(false)
            };

            mockSolutionsSummaryView = {
                $element: $('<div>solution summary!</div>')
            };

            mockSolutionsSummaryNextView = {
                $element: $('<div>solution summary1!</div>')
            };

            mockSolutionsSecuritySetupView = {
                $element: $('<div>solution security setup!</div>')
            };

            mockSolutionsConfigurationView = {
                $element: $('<div>solution configuration!</div>')
            };

            mockInspectorView = {
                setSolution: sinon.spy()
            };

            Core.Events.enableFor(mockSolutionsController);
            Core.Events.enableFor(mockSession);
            Core.Events.enableFor(mockSolutionsSummaryView);

            mockSolutionsSummaryView.render = sinon.stub().returns(mockSolutionsSummaryView.$element);
            mockSolutionsSummaryNextView.render = sinon.stub().returns(mockSolutionsSummaryNextView.$element);
            mockSolutionsSecuritySetupView.render = sinon.stub().returns(mockSolutionsSecuritySetupView.$element);
            mockSolutionsSecuritySetupView.createControls = sinon.spy();
            mockSolutionsConfigurationView.render = sinon.stub().returns(mockSolutionsConfigurationView.$element);
            mockSolutionsConfigurationView.createControls = sinon.spy();


            mockGrid = {
                onLoaded: function (callback) {
                    callback();
                },
                invalidate: sinon.spy(),
                resizeColumnToFit: sinon.spy() };

            Core.Events.enableFor(mockGrid);
            mockCreateGrid = function (element, columns, rows, options) {
                return mockGrid;
            };

            mockAlertContainer = {};
            mockAlertContainer.showAlert = sinon.spy();

            solutionsView = new SolutionsView({
                session: mockSession,
                location: mockLocation,
                solutionsController: mockSolutionsController,
                solutionsSummaryView: mockSolutionsSummaryView,
                solutionsSummaryNextView: mockSolutionsSummaryNextView,
                solutionSecuritySetupView: mockSolutionsSecuritySetupView,
                solutionConfigurationView: mockSolutionsConfigurationView,
                createGrid: mockCreateGrid,
                alertContainer: mockAlertContainer,
                solutionsInspectorView: mockInspectorView,
                toolbarDefinition : mockToolbarDefinition
            });
        });

        afterEach(function () {
            solutionsView.stopListening();
        });

        describe('initialize', function () {

            it('should set services', function () {
                expect(solutionsView.session).toBe(mockSession);
                expect(solutionsView.location).toBe(mockLocation);
                expect(solutionsView.solutionsController).toBe(mockSolutionsController);

                /*expect(solutionsView.solutionsSummaryView).toBe(mockSolutionsSummaryView);
                expect(solutionsView.solutionsSummaryNextView).toBe(mockSolutionsSummaryNextView);
                expect(solutionsView.solutionSecuritySetupView).toBe(mockSolutionsSecuritySetupView);
                expect(solutionsView.solutionConfigurationView).toBe(mockSolutionsConfigurationView);*/
            });

            it('should load data on begin if session is not active', function () {
                mockSession.trigger('begin');
                expect(mockSolutionsController.loadSolutions.calledOnce).toBeTruthy();
            });

        });

        describe('removeAll', function () {

            it('success', function() {
                var triggerRowSelectionChangedSpy = sinon.spy(solutionsView, "triggerRowSelectionChanged");

                solutionsView.removeAllSuccess(stubModel);

                expect(Object.keys(solutionsView.selectedRows).length).toBe(0);
                expect(mockAlertContainer.showAlert.calledOnce).toBeTruthy();
                expect(triggerRowSelectionChangedSpy.calledOnce).toBeTruthy();

                triggerRowSelectionChangedSpy.restore();
            });

            it('failure', function() {
                var triggerRowSelectionChangedSpy = sinon.spy(solutionsView, "triggerRowSelectionChanged");

                solutionsView.removeAllError(stubModel);


                expect(mockAlertContainer.showAlert.calledOnce).toBeTruthy();
                expect(triggerRowSelectionChangedSpy.callCount).toBe(0);


                triggerRowSelectionChangedSpy.restore();
            });
        });

        describe('when a solution is removed from the collection', function() {
            it('should invoke renderSolutionList with no options', function() {
                solutionsView.renderSolutionList = sinon.stub();
                solutionsView.onSolutionRemove()
                expect(solutionsView.renderSolutionList.calledOnce).toBeTruthy();
            });

            it('should invoke renderSolutionList with options but no bulk predicate', function() {
                solutionsView.renderSolutionList = sinon.stub();
                solutionsView.onSolutionRemove({})
                expect(solutionsView.renderSolutionList.calledOnce).toBeTruthy();
            });

            it('should invoke renderSolutionList with options and bulk false', function() {
                solutionsView.renderSolutionList = sinon.stub();
                solutionsView.onSolutionRemove({bulk: false});
                expect(solutionsView.renderSolutionList.calledOnce).toBeTruthy();
            });

            it('should not invoke renderSolutionList with options and bulk true', function() {
                solutionsView.renderSolutionList = sinon.stub();
                solutionsView.onSolutionRemove({bulk: true});
                expect(solutionsView.renderSolutionList.calledOnce).toBeFalsy();
            });
        });

        describe('handle list selected', function() {
            it('should set currentSolution to null', function() {
                solutionsView.handleListSelected('');
                expect(solutionsView.currentSolution).toBe(null);
            } );
        });

        describe('solution selected', function() {
            it('should set solution', function() {
                var result = solutionsView.solutionSelected('name');
                
                expect(mockSolutionsController.getSolutionSummaryModel.calledOnce).toBeTruthy();
            } );
        });
        
        describe('render solution list', function() {
            it('should render grid', function() {
                mockSolutionsController.getSolutionRows = sinon.stub().returns([{name:'test', attributes:{name:'test'}}]);
                mockSolutionsController.getSolutionGridColumns = sinon.stub().returns([{name: "Solution Name", propertyName:'name'}]);
                solutionsView.renderSolutionList();
                expect(solutionsView.solutionsGrid).toBeTruthy();
            } );

            it('should by default invoke grid control creation', function () {
                solutionsView.stopListening();
                solutionsView = new SolutionsView({
                    session: mockSession,
                    location: mockLocation,
                    solutionsController: mockSolutionsController,
                    solutionsSummaryView: mockSolutionsSummaryView,
                    solutionsSummaryNextView: mockSolutionsSummaryNextView,
                    solutionSecuritySetupView: mockSolutionsSecuritySetupView,
                    solutionConfigurationView: mockSolutionsConfigurationView
                });
                solutionsView.render();
                expect(solutionsView.solutionsGrid).toBeTruthy();
            })
        });

        describe('on solution set', function () {
            it('should call render when load data is successful', function () {
                var testSolution = {name: 'test', attributes: {name: "test"}};
                solutionsView.onSolutionFetched(testSolution);
                expect(solutionsView.currentSolution).toBe(testSolution);
            });
        });

        describe('solution selected', function () {
            it('should set solution', function () {

                var result = solutionsView.solutionSelected('name');

                expect(mockSolutionsController.getSolutionSummaryModel.calledOnce).toBeTruthy();
            });
        });

        describe('row selection changed', function () {
            it('should handle setting row selection', function () {
                solutionsView.rowSelectionChanged(null, [
                    {index: 0, isSelected: true, sourceItem: stubSolution}
                ]);

                var selectedRows = Object.keys(solutionsView.selectedRows) ;
                expect(selectedRows.length).toBe(1);
                expect(solutionsView.selectedRows[0].name).toBe('test');
            });

            it('should handle selecting multiple rows', function() {
                solutionsView.rowSelectionChanged(null, [
                    {index: 0, isSelected: true, sourceItem: {name: 'test'}},
                    {index: 1, isSelected: true, sourceItem: {name: 'test2'}},
                    {index: 2, isSelected: true, sourceItem: {name: 'test3'}}
                ]);

                var selectedRows = Object.keys(solutionsView.selectedRows) ;
                expect(selectedRows.length).toBe(3);
                expect(solutionsView.selectedRows[0].name).toBe('test');
                expect(solutionsView.selectedRows[1].name).toBe('test2');
                expect(solutionsView.selectedRows[2].name).toBe('test3');
            });

            it('should handle removing row selection', function () {
                solutionsView.rowSelectionChanged(null, [
                    {index: 0, isSelected: true, sourceItem: {name: 'test'}},
                    {index: 1, isSelected: true, sourceItem: {name: 'test2'}}
                ]);

                solutionsView.rowSelectionChanged(null, [
                    {index: 0, isSelected: false, sourceItem: {name: 'test'}},
                    {index: 1, isSelected: true, sourceItem: {name: 'test2'}}
                ]);

                var selectedRows = Object.keys(solutionsView.selectedRows) ;
                expect(selectedRows.length).toBe(1);
                expect(solutionsView.selectedRows[1].name).toBe('test2');
            });
        });

        describe('removing all solutions', function() {
            var solutionList = [
                {name: 'test', attributes: {name: 'test'}},
                {name: 'test2', attributes: {name: 'test2'}}
            ];

            beforeEach(function () {
                mockSolutionsController.getSolutionRows = sinon.stub().returns();
                mockSolutionsController.getSolutionGridColumns = sinon.stub().returns([
                    {name: "Solution Name", propertyName: 'name'}
                ]);

                mockSolutionsController.deleteSolution = sinon.spy();
                mockSolutionsController.deleteAllSolutions = sinon.spy();
                solutionsView.render();

                solutionsView.handleActionSelected = sinon.spy(solutionsView, "handleActionSelected");
            });

            it("handle action selected remove should invoke deleteSolution", function() {
                solutionsView.handleActionSelected("removeAll");
                expect(mockSolutionsController.deleteAllSolutions.calledOnce).toBeTruthy();
            });
        });

        describe('removing a solution ', function () {
            beforeEach(function () {
                mockSolutionsController.getSolutionRows = sinon.stub().returns([
                    {name: 'test', attributes: {name: 'test'}}
                ]);
                mockSolutionsController.getSolutionGridColumns = sinon.stub().returns([
                    {name: "Solution Name", propertyName: 'name'}
                ]);

                mockSolutionsController.deleteSolution = sinon.spy();
                solutionsView.render();
                solutionsView.rowSelectionChanged(null, [
                    {index: 0, isSelected: true, sourceItem: {attributes: {name: 'test'}}}
                ]);

                solutionsView.handleActionSelected = sinon.spy(solutionsView, "handleActionSelected");
            });

            it("handle action selected remove should invoke deleteSolution", function() {
                solutionsView.handleActionSelected("remove");
                expect(mockSolutionsController.deleteSolution.calledOnce).toBeTruthy();
            });

            it("should so alert for success", function() {
                mockSolutionsController.deleteSolution = function(model, options) {
                    options.success(model)
                };

                solutionsView.handleActionSelected("remove");
                expect(mockAlertContainer.showAlert.calledOnce).toBeTruthy();
            });

            it("should so alert for failure", function() {
                mockSolutionsController.deleteSolution = function(model, options) {
                    options.error(model)
                };

                solutionsView.handleActionSelected("remove");
                expect(mockAlertContainer.showAlert.calledOnce).toBeTruthy();
            });
        });

        describe('after getting a fresh solution model', function() {
            it('should set currentSolution', function() {
                solutionsView.onSolutionFetched({attributes: {name: "test"}});
            });
            it('should set the url', function() {
                solutionsView.onSolutionFetched({attributes: {name: "test"}});
            });
        });

        describe('listening for toolbar events', function() {
            var handleActionSelectedSpy;

            beforeEach(function() {
                handleActionSelectedSpy = sinon.spy(solutionsView, "handleActionSelected");
            });

            afterEach(function() {
                handleActionSelectedSpy.restore();
            });

            it('should invoke action selected for solution:install', function() {
                EventAggregator.trigger("solution:install");
                expect(handleActionSelectedSpy.calledOnce).toBeTruthy();
            });

            it('should invoke action selected for solution:remove', function() {
                EventAggregator.trigger("solution:remove");
                expect(handleActionSelectedSpy.calledOnce).toBeTruthy();
            });

            it('should invoke action selected for solution:removeAll', function() {
                mockGrid.onLoaded = sinon.stub();
                mockSolutionsController.deleteAllSolutions = sinon.spy();
                EventAggregator.trigger("solution:removeAll");
                expect(handleActionSelectedSpy.calledOnce).toBeTruthy();
            });
        });

        describe('getInspectorView', function() {
            it('should return inspectorView', function() {
                expect(solutionsView.getInspectorView()).toBe(mockInspectorView);
            });
        });
    });
});