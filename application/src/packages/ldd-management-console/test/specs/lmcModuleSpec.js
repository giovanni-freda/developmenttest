define(['core', '../../src/js/lmcModule', '../../src/js/eventAggregator' ], function (Core, LmcModule, EventAggregator) {
    'use strict';

    describe('LmcModule', function () {
        var module = null;
        var mockMainView = null;
        var mockSubView = null;
        var mockDrawerController = {};
        var mockDrawerView = null;
        var mockMainToolbarView = null;

        beforeEach(function() {
            mockMainView = {
                $element: {html: sinon.spy()}
            };

            mockDrawerView = {
                $element: {html: sinon.spy()}
            };

            mockSubView = {
                $element: {html: sinon.spy()}
            };

            mockMainToolbarView = {
                $element: {html: sinon.spy()}
            };
        }),

        afterEach(function () {
            EventAggregator.stopListening();
        });

        describe('initalize', function() {
           beforeEach(function() {

               module = new LmcModule({
                   mainView: mockMainView,
                   drawerView: mockDrawerView,
                   subView: mockSubView,
                   drawerController: mockDrawerController,
                   mainToolbarView: mockMainToolbarView
               })

               module.initialize();
           });

           it('should set main view', function() {
               expect(module.mainView).toBe(mockMainView);
           });
           it('should set drawer view', function() {
               expect(module.drawerView).toBe(mockDrawerView);
           });
            it('should set sub view', function() {
                expect(module.subView).toBe(mockSubView);
            });
            it('should set drawer controller', function() {
                expect(module.drawerController).toBe(mockDrawerController);
            });
            it('should set main toolbar view', function() {
                expect(module.mainToolbarView).toBe(mockMainToolbarView);
            });

        });

        describe('path', function () {
            beforeEach(function () {
                mockMainView = {
                    onSolutionsViewSelected: sinon.spy(),
                    $element: { html: sinon.spy()}
                };

                mockSubView = {};

                mockMainView.render = sinon.stub().returns(mockMainView)

                mockMainToolbarView = {
                    $element: {html: sinon.spy()}
                };

                module = new LmcModule({
                    mainView: mockMainView,
                    drawerView: mockDrawerView,
                    subView: mockSubView,
                    drawerController: mockDrawerController,
                    mainToolbarView: mockMainToolbarView
                });

                module.initialize();

            });

            it('should define a path', function () {
                expect(module.path).toBe('lmc');
            });
        });

        describe('routes', function () {
            beforeEach(function () {
                mockMainView = {
                    onSolutionsViewSelected: sinon.spy(),
                    $element: { html: sinon.spy()}
                };

                mockDrawerController.setBusinessObjectType = sinon.spy();

                var mockDrawerView = {
                    selectBusinessObjectType: sinon.stub()
                };

                mockSubView = {};

                mockMainView.render = sinon.stub().returns(mockMainView)

                var options = {
                    mainView: mockMainView,
                    drawerView: mockDrawerView,
                    subView: mockSubView,
                    drawerController : mockDrawerController,
                    mainToolbarView: mockMainToolbarView
                };

                module = new LmcModule(options);
                module.initialize();
            });

            it('home does nothing', function () {
                module.home();
            });

            it('showSolutions should call mainView solutions selected', function () {
                module.showBusinessObjectType("solutions");
                expect(mockDrawerController.setBusinessObjectType.calledOnce).toBeTruthy();
                expect(mockDrawerController.setBusinessObjectType.calledWith("solutions")).toBeTruthy();
            });
        });

        describe('connected', function () {
            beforeEach(function () {
                mockMainView = {
                    onSolutionsViewSelected: sinon.spy(),
                    $element: { html: sinon.spy()}
                };

                mockMainView.render = sinon.stub().returns(mockMainView);
                mockSubView = {};
                var options = {
                    mainView: mockMainView,
                    drawerView: mockDrawerView,
                    subView: mockSubView,
                    drawerController : mockDrawerController,
                    mainToolbarView: mockMainToolbarView
                };

                module = new LmcModule(options);
                module.initialize();

            });
            it("should set the element content", function () {
                module.connected();
                expect(module.$element.length).toBe(1);
            });
        });

        describe('icon', function () {
            beforeEach(function () {
                mockMainView = {
                    onSolutionsViewSelected: sinon.spy(),
                    $element: { html: sinon.spy()}
                };

                mockMainView.render = sinon.stub().returns(mockMainView);
                var options = {
                    mainView: mockMainView,
                    drawerView: mockDrawerView,
                    subView: mockSubView,
                    drawerController : mockDrawerController,
                    mainToolbarView: mockMainToolbarView
                };

                module = new LmcModule(options);
                module.initialize();

            });
            it('should define 4 icon sizes', function () {
                expect(module.icon.image16).not.toBeNull();
                expect(module.icon.image24).not.toBeNull();
                expect(module.icon.image32).not.toBeNull();
                expect(module.icon.image48).not.toBeNull();
            });

            it('should set the text', function () {
                expect(module.icon.text).toBe('LDD Management Console');
            });
        });
    });
});
