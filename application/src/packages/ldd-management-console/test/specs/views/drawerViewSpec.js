define(['../../../src/js/views/drawerView', '../../../src/js/eventAggregator', 'core', 'jquery'], function (DrawerView, EventAggregator, Core, $) {
    "use strict";

    describe('Drawer View', function () {
        var drawerView;

        var mockDrawerController;
        var mockLocation;
        var mockSession;
        var spyHandleRenderDrawer;

        beforeEach(function () {

            mockDrawerController = {
                setBusinessObjectType: sinon.stub()
            };
            mockLocation = {
                navigate: sinon.spy()
            };
            mockSession = {
                isActive: sinon.stub().returns(false)
            };
            Core.Events.enableFor(mockSession);

            jasmine.clock().install();

            spyHandleRenderDrawer = sinon.spy(DrawerView.prototype, 'render');

            drawerView = new DrawerView({
                location: mockLocation,
                session: mockSession,
                controller: mockDrawerController
            });

            drawerView.render();
        });

        afterEach(function () {
            //unwrap spy
            spyHandleRenderDrawer.reset();
            spyHandleRenderDrawer.restore();
            spyHandleRenderDrawer = null;

            drawerView.stopListening();
            drawerView = null;
        });

        function triggerSolutionsChange(drawerView) {
            drawerView.onBusinessObjectSelected(null, [
                {isSelected: true, name: "solutions"}
            ]);
        };

        function triggerSolutionInstanceSelection() {
            drawerView.businessObjectInstanceSelected({name: "testTriggerSolutionInstance", tasks: [
                {name: "testTask1"},
                {name: "testTask2"}
            ]});
        };

        function triggerTaskSelection(taskName) {
            var taskToClick = drawerView.$(".taskLink:contains('" + taskName + "')");
            taskToClick.click();
        };

        function triggerListSelection() {
            var listLink = drawerView.$(".listLink");
            listLink.click();
        };

        describe('when rendering a drawer', function () {
            it('should generate a list control', function () {
                drawerView.render();
                expect(drawerView.businessObjectList).toBeTruthy();
            })
        });

        describe('when selecting a drawer', function () {

            it('should set business object type for drawer', function () {
                drawerView.onBusinessObjectSelected(null, [
                    {isSelected: true}
                ])
                expect(mockDrawerController.setBusinessObjectType.calledOnce).toBeTruthy();
            });

            it('can manually select using selectBusinessObjectType', function () {
                var controlObject = {};
                var itemArray = [];
                var itemList = {};

                var createDrawerList = function (element, items, options) {
                    itemArray = items;
                    itemList = {items: [], findByProperty: sinon.stub().returns(itemArray)};
                    var control = {};
                    control.getCollectionView = sinon.stub().returns(itemList);
                    //control.findByProperty = sinon.stub().returns(itemList.items[0]);
                    control.select = sinon.spy();
                    Core.Events.enableFor(control);
                    controlObject = control;
                    return control;
                };
                drawerView = new DrawerView({
                    location: mockLocation,
                    session: mockSession,
                    controller: mockDrawerController,
                    createDrawerList: createDrawerList
                });
                drawerView.render();
                drawerView.selectBusinessObjectType("solutions");
                expect(controlObject.getCollectionView.calledOnce).toBeTruthy();
            });
        });
    });
});