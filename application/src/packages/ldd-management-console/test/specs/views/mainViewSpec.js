define(['../../../src/js/views/mainView', '../../../src/js/views/drawerView', 'jquery', '../../../src/js/eventAggregator'], function (MainView, DrawerView, $, EventAggregator) {
    "use strict";

    describe('Main View', function () {
        var mainView;

        describe('on resize layout', function() {
            var mockedPaneContainer;
            var mockMainToolbarView;

            beforeEach(function() {

                var mockDrawerView = {
                    $element: $('<div>drawer!</div>')
                };

                mockDrawerView.render = sinon.stub().returns(mockDrawerView.$element);
                mockDrawerView.selectBusinessObjectView = sinon.stub();
                var mockSubView = {
                    $element: $('<div>subView!</div>')
                };

                mockSubView.render = sinon.stub().returns(mockSubView.$element);

                mockedPaneContainer = {};
                mockedPaneContainer.addPane = sinon.spy();
                mockedPaneContainer.invalidate = sinon.spy();

                mockMainToolbarView = {
                    $element: $('<div>drawer!</div>')
                };
                mockMainToolbarView.render = sinon.stub().returns(mockMainToolbarView.$element);
                mockMainToolbarView.onResize = sinon.spy();

                mainView = new MainView({
                    drawerView: mockDrawerView,
                    subView: mockSubView,
                    mainToolbarView: mockMainToolbarView,
                    paneContainerFactory : function() {return mockedPaneContainer;}
                });

            });

            afterEach(function() {
                mainView.stopListening();
            });

            it('should resize main toolbar view', function() {
                mainView.render();
                mainView.resizeLayout();
                expect(mockMainToolbarView.onResize.calledOnce).toBeTruthy();
            });
            it('should resize pane container', function() {
                mainView.render();
                mainView.resizeLayout();
                expect(mockedPaneContainer.invalidate.calledOnce).toBeTruthy();
            });
        });

        describe('when modifying alerts', function(){
            var mockedPaneContainer;
            var mockMainToolbarView;
            var resizeLayoutMock;

            beforeEach(function() {

                var mockDrawerView = {
                    $element: $('<div>drawer!</div>')
                };

                mockDrawerView.render = sinon.stub().returns(mockDrawerView.$element);
                mockDrawerView.selectBusinessObjectView = sinon.stub();
                var mockSubView = {
                    $element: $('<div>subView!</div>')
                };

                mockSubView.render = sinon.stub().returns(mockSubView.$element);

                mockedPaneContainer = {};
                mockedPaneContainer.addPane = sinon.spy();
                mockedPaneContainer.invalidate = sinon.spy();

                mockMainToolbarView = {
                    $element: $('<div>drawer!</div>')
                };
                mockMainToolbarView.render = sinon.stub().returns(mockMainToolbarView.$element);
                mockMainToolbarView.onResize = sinon.spy();
                resizeLayoutMock = sinon.stub(MainView.prototype, "resizeLayout");

                mainView = new MainView({
                    drawerView: mockDrawerView,
                    subView: mockSubView,
                    mainToolbarView: mockMainToolbarView,
                    paneContainerFactory : function() {return mockedPaneContainer;}
                });

            });

            afterEach(function() {
                resizeLayoutMock.restore();
                mainView.stopListening();
            });

            it('should be triggered by alert:close', function() {

                mainView.render();
                EventAggregator.trigger("alert:close");
                expect(mainView.resizeLayout.calledOnce).toBeTruthy();
                resizeLayoutMock.restore();
            });
            it('should be triggered by alert:new', function() {
                mainView.render();
                EventAggregator.trigger("alert:new");
                expect(mainView.resizeLayout.calledOnce).toBeTruthy();
            });
        });

        describe('render', function () {
            beforeEach(function () {
                var mockDrawerView = {
                    $element: $('<div>drawer!</div>')
                };

                mockDrawerView.render = sinon.stub().returns(mockDrawerView.$element);
                mockDrawerView.selectBusinessObjectView = sinon.stub();
                var mockSubView = {
                    $element: $('<div>subView!</div>')
                };

                var mockMainToolbarView = {
                    $element: $('<div>main toolbar view!</div>')
                }
                mockMainToolbarView.render = sinon.stub().returns(mockDrawerView.$element);

                mockSubView.render = sinon.stub().returns(mockSubView.$element);

                mainView = new MainView({
                    drawerView: mockDrawerView,
                    subView: mockSubView,
                    mainToolbarView: mockMainToolbarView
                });
            });

            afterEach(function () {
                mainView.stopListening();
            })

            it('should return itself', function () {
                var returns = mainView.render();
                expect(returns).toBe(mainView);
            });
        });
    });
});