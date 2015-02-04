define(['core', '../../../../src/js/views/common/tabbedInspectorView', 'jquery'],
    function(Core, TabbedInspectorView) {
        "use strict";

        describe('Tabbed Inspector View', function() {

            describe('initialize', function(){
                var tabbedInspectorView;
                var mockedChildViews;
                var mockedView;

                beforeEach(function() {
                    mockedChildViews = [];
                    mockedView = {eventTrigger: "test:test"};

                    mockedChildViews.push(mockedView);
                    tabbedInspectorView = new TabbedInspectorView();
                    tabbedInspectorView.initializeTabbedInspectorView({childViews: mockedChildViews});
                });

                afterEach(function() {
                    tabbedInspectorView.stopListening();
                });

                it('should add view to list', function() {
                    expect(tabbedInspectorView.childViews).toBe(mockedChildViews);
                });

            });

            describe('trying to initialize with invalid view list', function() {
                var tabbedInspectorView;
                var mockedChildViews;
                var firstMockedView;
                var secondMockedView;

                beforeEach(function() {
                    mockedChildViews = [];
                    firstMockedView = {eventTrigger: "test:test"};
                    secondMockedView = {eventTrigger: "test:test"};

                    mockedChildViews.push(firstMockedView);
                    mockedChildViews.push(secondMockedView);
                    tabbedInspectorView = new TabbedInspectorView();
                });

                afterEach(function() {
                    tabbedInspectorView.stopListening();
                });

                it('should throw error when multiple views have the same trigger', function() {
                    expect(function() {tabbedInspectorView.initializeTabbedInspectorView({childViews: mockedChildViews})}).toThrow("Cannot have two views with the same eventTrigger");
                })

                it('should throw error when no views are given', function() {
                    expect(function() {tabbedInspectorView.initializeTabbedInspectorView({})}).toThrow("No child views given to tabbed inspector view");
                })
            })

            describe('handleViewSelected', function(){
                var tabbedInspectorView;
                var mockedChildViews;
                var mockedView;
                var mockedViewEventTriggerName = "test:mockedView";
                var mockedOpenInspectorCallback;
                var mockedCloseInspectorCallback;
                beforeEach(function() {

                    mockedChildViews = [];
                    mockedView = {eventTrigger: "test:test"};

                    mockedOpenInspectorCallback = sinon.spy();
                    mockedCloseInspectorCallback = sinon.spy();

                    mockedChildViews.push({view: mockedView, eventTrigger: mockedViewEventTriggerName});
                    tabbedInspectorView = new TabbedInspectorView();
                    tabbedInspectorView.initializeTabbedInspectorView({childViews: mockedChildViews});
                    tabbedInspectorView.on("inspector:open", mockedOpenInspectorCallback);
                    tabbedInspectorView.on("inspector:close", mockedCloseInspectorCallback);

                });

                afterEach(function() {
                    tabbedInspectorView.stopListening();
                    tabbedInspectorView.off("inspector:open");
                    tabbedInspectorView.off("inspector:close");
                });

                it('triggering view selection event should set current view', function() {
                    tabbedInspectorView.handleViewSelected(mockedViewEventTriggerName);
                    expect(tabbedInspectorView.currentView).toBe(mockedView);
                    expect(mockedOpenInspectorCallback.calledOnce).toBeTruthy();
                });

                it('triggering view selection event twice should clear the current view', function() {
                    tabbedInspectorView.handleViewSelected(mockedViewEventTriggerName);
                    expect(tabbedInspectorView.currentView).toBe(mockedView);
                    tabbedInspectorView.handleViewSelected(mockedViewEventTriggerName);
                    expect(tabbedInspectorView.currentView).toBe(null);
                    expect(mockedOpenInspectorCallback.calledOnce).toBeTruthy();
                    expect(mockedCloseInspectorCallback.calledOnce).toBeTruthy();
                });

                it('trigger view selection event with invalid view name, should throw error', function() {
                    var invalidEventTrigger = "invalidEventTrigger"
                    expect(function() { tabbedInspectorView.handleViewSelected(invalidEventTrigger); }).toThrow("No view found with event trigger: " + invalidEventTrigger);
                });


            });

            describe('getChildView', function() {
                var tabbedInspectorView;
                var mockedChildViews;
                var mockedView;
                var mockedViewEventTriggerName = "test:mockedView";

                beforeEach(function() {
                    mockedChildViews = [];
                    mockedView = {eventTrigger: "test:test"};

                    mockedChildViews.push({view: mockedView, eventTrigger: mockedViewEventTriggerName});
                    tabbedInspectorView = new TabbedInspectorView();
                    tabbedInspectorView.initializeTabbedInspectorView({childViews: mockedChildViews});
                });

                afterEach(function() {
                    tabbedInspectorView.stopListening();
                });

                it('should return correct view based on name', function() {
                    var result = tabbedInspectorView.getChildView(mockedViewEventTriggerName)[0].view;
                    expect(result).toBe(mockedView);
                });

                it('should throw exception if no view has requested name', function() {
                    var result = tabbedInspectorView.getChildView("badName").length;
                    expect(result).toBe(0);
                });
            });

            describe('isChildViewDefinition', function() {
                var tabbedInspectorView;
                var mockedChildViews;
                var mockedView;

                beforeEach(function() {
                    mockedChildViews = [];
                    mockedView = {eventTrigger: "test:test"};

                    mockedChildViews.push(mockedView);
                    tabbedInspectorView = new TabbedInspectorView();
                    tabbedInspectorView.initializeTabbedInspectorView({childViews: mockedChildViews});
                });

                afterEach(function() {
                    tabbedInspectorView.stopListening();
                });

                it('should return true when name matches', function() {

                });
                it('should return false when name does not match', function() {

                });
            });

            describe('bindChildViewSwitchEvents', function() {
                var tabbedInspectorView;
                var mockedChildViews;
                var mockedView;

                beforeEach(function() {
                    mockedChildViews = [];
                    mockedView = {eventTrigger: "test:test"};

                    mockedChildViews.push(mockedView);
                    tabbedInspectorView = new TabbedInspectorView();
                    tabbedInspectorView.initializeTabbedInspectorView({childViews: mockedChildViews});
                });

                afterEach(function() {
                    tabbedInspectorView.stopListening();
                });

                it('should return true when name matches', function() {

                });
            });

            describe('bindSwitchEvent', function() {
                var tabbedInspectorView;
                var mockedChildViews;
                var mockedView;

                beforeEach(function() {
                    mockedChildViews = [];
                    mockedView = {eventTrigger: "test:test"};

                    mockedChildViews.push(mockedView);
                    tabbedInspectorView = new TabbedInspectorView();
                    tabbedInspectorView.initializeTabbedInspectorView({childViews: mockedChildViews});
                });

                afterEach(function() {
                    tabbedInspectorView.stopListening();
                });

                it('should return true when name matches', function() {

                });
            });

            describe('render', function() {
                var tabbedInspectorView;
                var mockedChildViews;
                var mockedView;
                var mockedViewDefinition;

                beforeEach(function() {
                    mockedChildViews = [];
                    mockedView = {
                        $element: {appendTo: sinon.spy()}
                    };
                    mockedView.render = sinon.stub().returns(mockedView);

                    mockedViewDefinition = {
                        eventTrigger: "test:test",
                        view: mockedView
                    };


                    mockedChildViews.push(mockedViewDefinition);
                    tabbedInspectorView = new TabbedInspectorView();
                    tabbedInspectorView.initializeTabbedInspectorView({childViews: mockedChildViews});
                });

                afterEach(function() {
                    tabbedInspectorView.stopListening();
                });

                it('should call current views render', function() {
                    tabbedInspectorView.handleViewSelected("test:test");
                    tabbedInspectorView.render({});
                    expect(mockedView.render.calledOnce).toBeTruthy();
                    expect(mockedView.$element.appendTo.calledOnce).toBeTruthy();
                });
            });

            describe('triggerInspectorOpen', function() {
                var tabbedInspectorView;
                var mockedChildViews;
                var mockedView;
                var secondMockedView;
                var mockedViewDefinition;
                var secondMockedViewDefinition;
                var inspectorOpenTriggerSpy;

                beforeEach(function() {
                    mockedChildViews = [];
                    mockedView = {
                        $element: {appendTo: sinon.spy()}
                    };
                    mockedView.render = sinon.stub().returns(mockedView);

                    mockedViewDefinition = {
                        className: "mockedView",
                        eventTrigger: "test:test",
                        view: mockedView
                    };

                    secondMockedView = {
                        $element: {appendTo: sinon.spy()}
                    };
                    secondMockedView.render = sinon.stub().returns(secondMockedView);

                    secondMockedViewDefinition = {
                        className: "secondMockedView",
                        eventTrigger: "test:test2",
                        view: secondMockedView
                    };

                    mockedChildViews.push(mockedViewDefinition);
                    mockedChildViews.push(secondMockedViewDefinition);
                    tabbedInspectorView = new TabbedInspectorView();
                    tabbedInspectorView.initializeTabbedInspectorView({childViews: mockedChildViews});

                    inspectorOpenTriggerSpy = sinon.spy();
                    tabbedInspectorView.on("inspector:open", inspectorOpenTriggerSpy);
                });

                afterEach(function() {
                    tabbedInspectorView.stopListening();
                });

                it('should trigger inspector open on first selection, should change on second selection', function() {
                    tabbedInspectorView.handleViewSelected("test:test");
                    tabbedInspectorView.handleViewSelected("test:test2");
                    //parent should invoke render when inspector is opened, but on the second, its just a view change so that should have a render call
                    expect(mockedView.render.callCount).toBe(0);
                    expect(secondMockedView.render.calledOnce).toBeTruthy();
                    expect(inspectorOpenTriggerSpy.calledOnce).toBeTruthy();

                });
            });

            describe('onBecomingActive', function() {
                var tabbedInspectorView;
                var mockedChildViews;
                var mockedView;
                var secondMockedView;
                var mockedViewDefinition;
                var secondMockedViewDefinition;
                beforeEach(function(){
                    mockedChildViews = [];
                    mockedView = {
                        $element: {appendTo: sinon.spy()}
                    };
                    mockedView.render = sinon.stub().returns(mockedView);

                    mockedViewDefinition = {
                        className: "mockedView",
                        eventTrigger: "test:test",
                        view: mockedView
                    };

                    secondMockedView = {
                        $element: {appendTo: sinon.spy()}
                    };
                    secondMockedView.render = sinon.stub().returns(secondMockedView);

                    secondMockedViewDefinition = {
                        className: "secondMockedView",
                        eventTrigger: "test:test2",
                        view: secondMockedView
                    };

                    mockedChildViews.push(mockedViewDefinition);
                    mockedChildViews.push(secondMockedViewDefinition);
                    tabbedInspectorView = new TabbedInspectorView();
                    tabbedInspectorView.initializeTabbedInspectorView({childViews: mockedChildViews});
                });

                afterEach(function() {
                    tabbedInspectorView.stopListening();
                });

                it('should clear data', function() {
                    var bindChildSpy = sinon.spy(tabbedInspectorView, "bindChildViewSwitchEvents");
                    tabbedInspectorView.onBecomingActive();
                    expect(tabbedInspectorView.currentView).toBe(undefined);
                    expect(tabbedInspectorView.isVisible).toBe(false);
                    expect(bindChildSpy.calledOnce).toBeTruthy();
                    bindChildSpy.restore();

                })
            });
        });
    });