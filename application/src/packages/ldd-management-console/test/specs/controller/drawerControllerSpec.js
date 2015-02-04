define(['../../../src/js/drawerController', 'core', '../../../src/js/eventAggregator'], function (DrawerController, Core, EventAggregator) {
    "use strict";

    describe('Drawer Controller', function () {
        var drawerController;
        var mockLocation;
        var mockSession;

        beforeEach(function () {
            mockLocation = {
                navigate: sinon.spy()
            };
            mockSession = {
                isActive: sinon.stub().returns(false)
            };
            Core.Events.enableFor(mockSession);

            drawerController = new DrawerController({
            });
        });

        afterEach(function () {
            EventAggregator.stopListening();
        });

        describe('should create drawerModel on initialization', function () {
            it('drawerModel should not be null', function () {
                expect(drawerController.drawer).not.toBe(null);
            });
        });

        describe('model get', function () {
            it('returns drawer model', function () {
                expect(drawerController.get()).toBe(drawerController.drawer);
            })
        });

        describe('setting business object type', function () {
            var drawerSelectedCallback;
            var taskSelectedCallback;
            beforeEach(function () {
                drawerController.drawer = {setBusinessObjectType: sinon.spy(), setTask: sinon.spy()};
                drawerSelectedCallback = sinon.spy();
                taskSelectedCallback = sinon.spy();
                EventAggregator.on("change:drawerSelected", drawerSelectedCallback);
                EventAggregator.on("change:taskSelected", taskSelectedCallback);
                drawerController.setBusinessObjectType("solutions");
            });

            it('should set business object type on drawer model', function () {
                expect(drawerController.drawer.setBusinessObjectType.calledOnce).toBeTruthy();
            });
            it('should trigger drawer Selected', function () {
                expect(drawerController.drawer.setBusinessObjectType.calledOnce).toBeTruthy();
            });
            it('should set to list', function () {
            });
        });

        describe('setting task', function () {
            it('should set task on drawer Model', function () {
            });
            it('should trigger task selected', function () {
            });
        });
    });
});