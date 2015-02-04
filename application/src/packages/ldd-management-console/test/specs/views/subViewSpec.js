define(['../../../src/js/views/subView', '../../../src/js/businessObjectsDefinition', 'core', '../../../src/js/eventAggregator', 'jquery'], function (SubView, BusinessObjectsDefinition, Core, EventAggregator, $) {
    "use strict";

    describe('Sub View', function () {
        var subView;
        var mockChildViews;

        afterEach(function () {
            subView.stopListening();
            subView = null;
            EventAggregator.stopListening();
        });

        describe('when generating child view list', function () {
            it('should return child views', function () {
                var mockSolutionsView = {};
                var childViewList = {solutionsView: mockSolutionsView, licenseView: {}, ldapView: {}};
                subView = new SubView({childViews: childViewList});
                expect(subView.getChildViews(childViewList)).toBeTruthy();
            });
        });

        describe('when Rendering child views', function () {
            beforeEach(function () {
                var mockSolutionsView = {
                    $element: $('<div>solutions!</div>')
                };

                var mockDrawerView = {
                    $element: $('<div>drawer!</div>')
                };

                mockDrawerView.render = sinon.stub().returns(mockDrawerView.$element);

                mockSolutionsView.render = sinon.stub().returns(mockSolutionsView.$element);
                mockSolutionsView.handleListSelected = sinon.stub();
                mockSolutionsView.handleTaskSelected = sinon.stub();

                var mockDeviceGroupsView = {
                    $element: $('<div>devicegroups!</div>')

                };
                mockDeviceGroupsView.render = sinon.stub().returns(mockSolutionsView.$element);

                mockChildViews = {};
                mockChildViews[BusinessObjectsDefinition.Solutions.toLowerCase()] = mockSolutionsView;
                mockChildViews[BusinessObjectsDefinition.DeviceGroups.toLowerCase()] = mockDeviceGroupsView;

                var mockedPane = {setVisibility: sinon.spy()};
                var mockedPaneContainer = {};
                mockedPaneContainer.addPane = function() {return mockedPane;};

                var paneContainerFactory = function() {return mockedPaneContainer;};

                subView = new SubView({
                    childViews: mockChildViews,
                    drawerView: mockDrawerView,
                    paneContainerFactory: paneContainerFactory
                });
            });

            it('should fire childview render when task is selected', function () {
                subView.render();
                subView.drawerSelected(BusinessObjectsDefinition.Solutions.toLowerCase());
                subView.taskSelected("list");
                expect(subView.currentChildView).toBeTruthy();
                expect(subView.currentChildView.render.calledOnce).toBeTruthy();
            });
        });

        describe('when selecting a Business Object Type', function () {
            var mockView;
            var inspectorViewSpy;
            var mockToolbarDefinition;
            var mockInspectorView;

            beforeEach(function () {

                mockToolbarDefinition = {
                    getToolbarDefinition: sinon.spy()
                };

                mockInspectorView = {
                    bindChildViewSwitchEvents: sinon.spy(),
                    onBecomingActive: sinon.spy
                };

                Core.Events.enableFor(mockInspectorView);

                mockView = {$element: '<h1>test view</h1>'};
                mockView.render = sinon.stub().returns(mockView.$element)
                mockView.handleListSelected = sinon.stub().returns(null);
                mockView.handleTaskSelected = sinon.stub();
                mockView.toolbarDefinition = mockToolbarDefinition;
                mockView.getInspectorView = function() {return mockInspectorView;};
                mockChildViews = {};
                mockChildViews["solutions"] = mockView;
                var mockDrawerView = {
                    $element: $('<div>drawer!</div>')
                };

                mockDrawerView.render = sinon.stub().returns(mockDrawerView.$element);

                var mockedPane = {setVisibility: sinon.spy()};
                var mockedPaneContainer = {};
                mockedPaneContainer.addPane = function() {return mockedPane;};

                var paneContainerFactory = function() {return mockedPaneContainer;};

                subView = new SubView({
                    childViews: mockChildViews,
                    drawerView: mockDrawerView,
                    paneContainerFactory: paneContainerFactory
                });

                subView.render();

                inspectorViewSpy = sinon.spy(subView, "setInspectorView");

                EventAggregator.trigger('change:drawerSelected', "solutions");
                EventAggregator.trigger('change:taskSelected', "list");

            });



            it('should set the correct child view', function () {
                expect(subView.childViews).toBe(mockChildViews);
                expect(subView.currentChildView).toBe(mockView);
            });

            it('should invoke child views handle list selected', function () {
                expect(mockView.handleListSelected.calledOnce).toBeTruthy();
            });

            it('should invoke render', function () {
                expect(mockView.render.calledOnce).toBeTruthy();
            });

            it('should get toolbar definition', function() {
                expect(mockView.toolbarDefinition).toBeTruthy();
            });

            it('should invoke setInspectorView', function() {
                expect(inspectorViewSpy.calledOnce).toBeTruthy();
            })
        });

        describe('when selecting a Business Object task', function () {
            var mockView;
            beforeEach(function () {
                mockView = {$element: '<h1>test view</h1>'};
                mockView.render = sinon.stub().returns(mockView.$element)
                mockView.handleListSelected = sinon.stub().returns(null);
                mockView.handleTaskSelected = sinon.stub().returns(null);
                mockChildViews = {};
                mockChildViews["solutions"] = mockView;
                var mockDrawerView = {
                    $element: $('<div>drawer!</div>')
                };

                mockDrawerView.render = sinon.stub().returns(mockDrawerView.$element);
                var mockedPane = {setVisibility: sinon.spy()};
                var mockedPaneContainer = {};
                mockedPaneContainer.addPane = function() {return mockedPane;};

                var paneContainerFactory = function() {return mockedPaneContainer;};


                subView = new SubView({
                    childViews: mockChildViews,
                    drawerView: mockDrawerView,
                    paneContainerFactory: paneContainerFactory
                });
                subView.render();
                EventAggregator.trigger('change:drawerSelected', "solutions");
                EventAggregator.trigger('change:taskSelected', "summary");
            });

            it('should invoke child views handleTaskSelected', function () {
                expect(mockView.handleTaskSelected.calledOnce).toBeTruthy();
            });
        });

        describe('when toggling Drawer View ', function() {
            it('should invoke visibility', function() {
                var mockedPane = {setVisibility: sinon.spy()};
                var mockedPaneContainer = {};
                mockedPaneContainer.addPane = function() {return mockedPane;};

                var mockView = {$element: '<h1>test view</h1>'};
                mockView.render = sinon.stub().returns(mockView.$element)
                mockView.handleListSelected = sinon.stub().returns(null);
                mockView.handleTaskSelected = sinon.stub().returns(null);
                mockChildViews = {};
                mockChildViews["solutions"] = mockView;

                var mockDrawerView = {
                    $element: $('<div>drawer!</div>')
                };

                mockDrawerView.render = sinon.stub().returns(mockDrawerView.$element);

                var paneContainerFactory = function() {return mockedPaneContainer;};
                subView = new SubView({
                    childViews: mockChildViews,
                    drawerView: mockDrawerView,
                    paneContainerFactory: paneContainerFactory
                });
                subView.render();
                subView.toggleDrawerPane();
                expect(mockedPane.setVisibility.calledOnce).toBeTruthy();
            });
        });

        describe('should have paneContainer Factory', function() {
            it('factory returns not-null', function() {
                var mockView = {$element: '<h1>test view</h1>'};
                mockView.render = sinon.stub().returns(mockView.$element)
                mockView.handleListSelected = sinon.stub().returns(null);
                mockView.handleTaskSelected = sinon.stub().returns(null);
                mockChildViews = {};
                mockChildViews["solutions"] = mockView;

                var mockDrawerView = {
                    $element: $('<div>drawer!</div>')
                };

                mockDrawerView.render = sinon.stub().returns(mockDrawerView.$element);
                subView = new SubView({
                    childViews: mockChildViews,
                    drawerView: mockDrawerView
                });


                expect(subView.defaultPaneContainerFactory(subView.$element)).toBeTruthy();
            })
        });

        describe('setInspectorView', function () {
            beforeEach(function() {
                var mockView = {$element: '<h1>test view</h1>'};
                mockView.render = sinon.stub().returns(mockView.$element)
                mockView.handleListSelected = sinon.stub().returns(null);
                mockView.handleTaskSelected = sinon.stub().returns(null);
                mockChildViews = {};
                mockChildViews["solutions"] = mockView;

                var mockDrawerView = {
                    $element: $('<div>drawer!</div>')
                };

                mockDrawerView.render = sinon.stub().returns(mockDrawerView.$element);
                subView = new SubView({
                    childViews: mockChildViews,
                    drawerView: mockDrawerView
                });
            });

            it('should set and listen to inspector view', function() {
                var mockInspectorView = {};
                mockInspectorView.bindChildViewSwitchEvents = sinon.spy();
                mockInspectorView.onBecomingActive =  sinon.spy();

                Core.Events.enableFor(mockInspectorView);

                subView.render();
                subView.setInspectorView(mockInspectorView);

                expect(subView.inspectorView).toBe(mockInspectorView);
                expect(mockInspectorView.onBecomingActive.calledOnce).toBeTruthy();

            });
            it('should stop listening to existing inspector view', function() {
                var mockInspectorView = {};
                mockInspectorView.bindChildViewSwitchEvents = sinon.spy();
                mockInspectorView.onBecomingActive =  sinon.spy();

                Core.Events.enableFor(mockInspectorView);

                subView.render();
                subView.setInspectorView(mockInspectorView);

                expect(subView.inspectorView).toBe(mockInspectorView);
                expect(mockInspectorView.onBecomingActive.calledOnce).toBeTruthy();

                subView.setInspectorView(null);
                expect(subView.inspectorView).toBe(null);
            });


        })

        describe('setInspectorPaneVisiblity', function() {
            var mockView
            var mockToolbarDefinition;
            var mockInspectorView;

            beforeEach(function(){
                mockToolbarDefinition = {
                    getToolbarDefinition: sinon.spy()
                };

                mockInspectorView = {
                    bindChildViewSwitchEvents: sinon.spy(),
                    onBecomingActive: sinon.spy
                };

                Core.Events.enableFor(mockInspectorView);

                mockView = {$element: '<h1>test view</h1>'};
                mockView.render = sinon.stub().returns(mockView.$element)
                mockView.handleListSelected = sinon.stub().returns(null);
                mockView.handleTaskSelected = sinon.stub();
                mockView.toolbarDefinition = mockToolbarDefinition;
                mockView.getInspectorView = function() {return mockInspectorView;};
                mockChildViews = {};
                mockChildViews["solutions"] = mockView;
                var mockDrawerView = {
                    $element: $('<div>drawer!</div>')
                };

                mockDrawerView.render = sinon.stub().returns(mockDrawerView.$element);

                var mockedPane = {setVisibility: sinon.spy()};
                var mockedPaneContainer = {};
                mockedPaneContainer.addPane = function() {return mockedPane;};

                var paneContainerFactory = function() {return mockedPaneContainer;};

                subView = new SubView({
                    childViews: mockChildViews,
                    drawerView: mockDrawerView,
                    paneContainerFactory: paneContainerFactory
                });

                subView.inspectorView = mockInspectorView;

                subView.inspectorPane = {
                    setVisibility: sinon.spy()
                };

                subView.renderInspectorView = sinon.spy(subView, "renderInspectorView");
            });

            describe('when visible', function() {
                beforeEach(function(){
                    subView.setInspectorPaneVisiblity(true);
                });
                it('should call setVisibility on pane', function() {
                    expect(subView.inspectorPane.setVisibility.calledOnce).toBeTruthy();
                    expect(subView.inspectorPane.setVisibility.calledWith(true)).toBeTruthy();
                });
                it('should call render for inspectorView', function() {
                    expect(subView.renderInspectorView.calledOnce).toBeTruthy();
                });
            });

            describe('when not visible', function() {
                beforeEach(function(){
                    subView.setInspectorPaneVisiblity(false);
                });
                it('should call setVisibility on pane', function() {
                    expect(subView.inspectorPane.setVisibility.calledOnce).toBeTruthy();
                    expect(subView.inspectorPane.setVisibility.calledWith(false)).toBeTruthy();
                });
                it('should call render for inspectorView', function() {
                    expect(subView.renderInspectorView.calledOnce).toBeFalsy();
                });
            });
        });

        describe('renderInspectorView', function() {
            var mockView
            var mockToolbarDefinition;
            var mockInspectorView;

            beforeEach(function(){
                mockToolbarDefinition = {
                    getToolbarDefinition: sinon.spy()
                };

                mockInspectorView = {
                    $element: $('<h1>test view</h1>'),
                    bindChildViewSwitchEvents: sinon.spy(),
                    isVisible: true,
                    onBecomingActive: sinon.spy
                };

                mockInspectorView.render = sinon.stub().returns(mockInspectorView);

                Core.Events.enableFor(mockInspectorView);

                mockView = {$element: '<h1>test view</h1>'};
                mockView.render = sinon.stub().returns(mockView.$element)
                mockView.handleListSelected = sinon.stub().returns(null);
                mockView.handleTaskSelected = sinon.stub();
                mockView.toolbarDefinition = mockToolbarDefinition;
                mockView.getInspectorView = function() {return mockInspectorView;};
                mockChildViews = {};
                mockChildViews["solutions"] = mockView;
                var mockDrawerView = {
                    $element: $('<div>drawer!</div>')
                };

                mockDrawerView.render = sinon.stub().returns(mockDrawerView.$element);

                var mockedPane = {setVisibility: sinon.spy()};
                var mockedPaneContainer = {};
                mockedPaneContainer.addPane = function() {return mockedPane;};

                var paneContainerFactory = function() {return mockedPaneContainer;};

                subView = new SubView({
                    childViews: mockChildViews,
                    drawerView: mockDrawerView,
                    paneContainerFactory: paneContainerFactory
                });

                subView.render();

                EventAggregator.trigger('change:drawerSelected', "solutions");
                EventAggregator.trigger('change:taskSelected', "list");

            });

            it('should detach children', function() {
                 expect(subView.$element.find(".inspector-content").children().length).toBe(1);
            });

        });

    });
});