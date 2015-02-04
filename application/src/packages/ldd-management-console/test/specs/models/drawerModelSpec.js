define(['../../../src/js/models/drawerModel', '../../../src/js/eventAggregator'], function (DrawerModel, EventAggregator) {
    "use strict";


    //Test fixture, this makes that pretty heading,
    //ex:
    //describe('Fixture Name', function() {describe('Test1', function())});
    describe('Drawer Model', function () {
        var drawer;

        beforeEach(function () {
            drawer = new DrawerModel();

        });

        afterEach(function () {
            drawer.stopListening();
            EventAggregator.stopListening();
        });

        describe('when creating a drawer', function () {
            it('should have null business object type', function () {
                expect(drawer.currentBusinessObjectType).toBeUndefined();
                expect(drawer.hasBusinessObjectTypeSelected()).toBeFalsy();
            });

            it('should have null business object instance', function () {
                expect(drawer.currentBusinessObjectInstance).toBeUndefined();
                expect(drawer.hasBusinessObjectInstanceSelected()).toBeFalsy();
            });

            it('should have null current task', function () {
                expect(drawer.currentTask).toBeUndefined();
                expect(drawer.hasTaskSelected()).toBeFalsy();
            });
        });

        describe('should mediate drawerModel events', function () {
            var drawerChanged

            beforeEach(function () {
                var callback = function () {
                    drawerChanged = true;
                };
                EventAggregator.on('change:drawer', callback);
            });

            it('change:businessObjectType selected should set currentBusinessObjectType', function () {
                EventAggregator.trigger('change:businessObjectType', "solutions");
                expect(drawer.currentBusinessObjectType).toBe("solutions");
                expect(drawer.hasBusinessObjectTypeSelected()).toBeTruthy();
            });

            it('change:businessObjectInstance selected should set currentBusinessObjectInstance', function () {
                var currentBusinessObjectInstance = {};
                EventAggregator.trigger('change:businessObjectInstance', currentBusinessObjectInstance);
                expect(drawer.currentBusinessObjectInstance).toBe(currentBusinessObjectInstance);
                expect(drawer.hasBusinessObjectInstanceSelected()).toBeTruthy();
            });

            it('change:businessObjectInstance selected should set currentTask to summary', function () {
                EventAggregator.trigger('change:businessObjectInstance', "solutions");
                expect(drawer.currentTask).toBe("summary");
            });

            it('change:currentTask selected should set currentTask', function () {
                var currentTask = "list";
                EventAggregator.trigger('change:currentTask', currentTask);
                expect(drawer.currentTask).toBe(currentTask);
                expect(drawer.hasTaskSelected()).toBeTruthy();
            });
        });
    });
});