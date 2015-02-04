define(['core', '../../../../src/js/views/solution/solutionInspectorView', '../../../../src/js/views/common/tabbedInspectorView','../../../../src/js/eventAggregator'],
    function(Core, SolutionsInspectorView, TabbedInspectorView, EventAggregator) {
        "use strict";

        describe('Solutions Inspector View', function() {

            describe('initialize', function(){
                var solutionsInspectorView;
                var initializeTabbedInspectorViewSpy;
                var mockedConfigurationView;
                var mockedSecurityView;
                var mockedSummaryView;
                var mockedSummaryNextView;

                beforeEach(function() {
                    initializeTabbedInspectorViewSpy = sinon.spy(TabbedInspectorView.prototype, "initializeTabbedInspectorView");

                    mockedConfigurationView = {};
                    mockedSecurityView = {};
                    mockedSummaryView = {};
                    mockedSummaryNextView = {};

                    //Core.Events.enableFor(mockedConfigurationView);
                    //Core.Events.enableFor(mockedSecurityView);
                    Core.Events.enableFor(mockedSummaryView);
                    Core.Events.enableFor(mockedSummaryNextView);

                    solutionsInspectorView = new SolutionsInspectorView({
                        configurationView: mockedConfigurationView, securityView: mockedSecurityView,
                        summaryView: mockedSummaryView, summaryNextView: mockedSummaryNextView
                    });
                });

                afterEach(function() {
                   initializeTabbedInspectorViewSpy.restore();
                    solutionsInspectorView.stopListening();
                });

                it('should invoke initialize tabbed inspector view', function(){
                    expect(initializeTabbedInspectorViewSpy.calledOnce).toBeTruthy();
                });

                it('should add configuration view to tab list', function() {
                    expect(solutionsInspectorView.childViews[0].view).toBe(mockedConfigurationView);
                });

                it('should add security view to tab list', function() {
                    expect(solutionsInspectorView.childViews[1].view).toBe(mockedSecurityView);
                });

                it('should add summary view to tab list', function() {
                    expect(solutionsInspectorView.childViews[2].view).toBe(mockedSummaryView);
                });

                it('should add summaryNext view to tab list', function() {
                    expect(solutionsInspectorView.childViews[3].view).toBe(mockedSummaryNextView);
                });
            });

            describe('when selecting views', function() {
                var solutionsInspectorView;

                var mockedConfigurationView;
                var mockedSecurityView;
                var mockedSummaryView;
                var mockedSummaryNextView;

                var handleViewSelectedSpy;

                beforeEach(function() {
                    mockedConfigurationView = {};
                    mockedSecurityView = {};
                    mockedSummaryView = {};
                    mockedSummaryNextView = {};

                    Core.Events.enableFor(mockedSummaryView);
                    Core.Events.enableFor(mockedSummaryNextView);

                    solutionsInspectorView = new SolutionsInspectorView({configurationView: mockedConfigurationView, securityView: mockedSecurityView,
                        summaryView: mockedSummaryView, summaryNextView: mockedSummaryNextView});

                    solutionsInspectorView.bindChildViewSwitchEvents();

                    handleViewSelectedSpy = sinon.spy(solutionsInspectorView, "handleViewSelected");

                });

                afterEach(function() {
                    solutionsInspectorView.stopListening();
                    handleViewSelectedSpy.restore();
                });

                it('renderSolutionSummaryNext should invoke handle view selected', function() {
                    solutionsInspectorView.renderSolutionSummaryNext();
                    expect(handleViewSelectedSpy.calledOnce).toBeTruthy();
                    expect(handleViewSelectedSpy.calledWith("solution:summaryNext"));
                });

                it('renderSolutionSummary should invoke handle view selected', function() {
                    solutionsInspectorView.renderSolutionSummary();
                    expect(handleViewSelectedSpy.calledOnce).toBeTruthy();
                    expect(handleViewSelectedSpy.calledWith("solution:summary"));
                });

                it('triggering solution:configuration should set current inspector view to configuration',function() {
                    EventAggregator.trigger('solution:configuration');
                    expect(solutionsInspectorView.currentView).toBe(mockedConfigurationView);
                });

                it('triggering solution:configuration twice should set current inspector view to nothing',function() {
                    EventAggregator.trigger('solution:configuration');
                    EventAggregator.trigger('solution:configuration');
                    expect(solutionsInspectorView.currentView).toBe(null);
                });

                it('triggering solution:security should set current inspector view to security', function() {
                    EventAggregator.trigger('solution:security');
                    expect(solutionsInspectorView.currentView).toBe(mockedSecurityView);
                });

                it('triggering solution:security twice should set current inspector view to nothing',function() {
                    EventAggregator.trigger('solution:security');
                    EventAggregator.trigger('solution:security');
                    expect(solutionsInspectorView.currentView).toBe(null);
                });

                it('triggering solution:summary should set current inspector view to security', function() {
                    EventAggregator.trigger('solution:summary');
                    expect(solutionsInspectorView.currentView).toBe(mockedSummaryView);
                });

                it('triggering solution:summary twice should set current inspector view to nothing',function() {
                    EventAggregator.trigger('solution:summary');
                    EventAggregator.trigger( 'solution:summary');
                    expect(solutionsInspectorView.currentView).toBe(null);
                });

                it('triggering solution:summaryNext should set current inspector view to security', function() {
                    EventAggregator.trigger('solution:summaryNext');
                    expect(solutionsInspectorView.currentView).toBe(mockedSummaryNextView);
                });

                it('triggering solution:summaryNext twice should set current inspector view to nothing',function() {
                    EventAggregator.trigger('solution:summaryNext');
                    EventAggregator.trigger('solution:summaryNext');
                    expect(solutionsInspectorView.currentView).toBe(null);
                });
            });

            describe('render', function(){
                var solutionsInspectorView;
                var renderSpy;
                var mockedConfigurationView;
                var mockedSecurityView;
                var mockedSummaryView;
                var mockedSummaryNextView;

                beforeEach(function() {
                    renderSpy = sinon.spy(TabbedInspectorView.prototype, "render");

                    mockedConfigurationView = {};
                    mockedSecurityView = {};
                    mockedSummaryView = {};
                    mockedSummaryNextView = {};

                    //Core.Events.enableFor(mockedConfigurationView);
                    //Core.Events.enableFor(mockedSecurityView);
                    Core.Events.enableFor(mockedSummaryView);
                    Core.Events.enableFor(mockedSummaryNextView);

                    solutionsInspectorView = new SolutionsInspectorView({
                        configurationView: mockedConfigurationView, securityView: mockedSecurityView,
                        summaryView: mockedSummaryView, summaryNextView: mockedSummaryNextView
                    });
                });

                afterEach(function() {
                    renderSpy.restore();
                    solutionsInspectorView.stopListening();
                });

                it('should invoke tabbed inspector view render', function(){
                    solutionsInspectorView.render();

                    expect(renderSpy.calledOnce).toBeTruthy();
                });
            });

            describe('setSolution', function(){
                var solutionsInspectorView;

                var mockedConfigurationView;
                var mockedSecurityView;
                var mockedSummaryView;
                var mockedSummaryNextView;

                var mockedSolutionModel;

                beforeEach(function() {

                    mockedConfigurationView = {
                        createControls: sinon.spy()
                    };
                    mockedSecurityView = {
                        createControls: sinon.spy()
                    };
                    mockedSummaryView = {};
                    mockedSummaryNextView = {};

                    //Core.Events.enableFor(mockedConfigurationView);
                    //Core.Events.enableFor(mockedSecurityView);
                    Core.Events.enableFor(mockedSummaryView);
                    Core.Events.enableFor(mockedSummaryNextView);

                    solutionsInspectorView = new SolutionsInspectorView({
                        configurationView: mockedConfigurationView, securityView: mockedSecurityView,
                        summaryView: mockedSummaryView, summaryNextView: mockedSummaryNextView
                    });


                    mockedSolutionModel = {};
                    solutionsInspectorView.setSolution(mockedSolutionModel);
                });

                afterEach(function() {

                    solutionsInspectorView.stopListening();
                });

                it('should set solution', function(){
                    expect(solutionsInspectorView.currentSolution).toBe(mockedSolutionModel);
                });

                it('should invoke control creation on configuration view', function() {
                    expect(mockedConfigurationView.createControls.calledOnce).toBeTruthy();
                });

                it('should invoke control creation on security view', function() {
                    expect(mockedSecurityView.createControls.calledOnce).toBeTruthy();
                });
            });
        });
    });