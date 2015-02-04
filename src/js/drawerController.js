define(['underscore', 'core', 'logger', './models/drawerModel', './eventAggregator'], function (_, Core, Logger, DrawerModel, EventAggregator) {
    'use strict';

    var DrawerController = function () {
        _.bindAll(this);
        this.drawer = new DrawerModel();
    };

    _.extend(DrawerController.prototype, {
        get: function () {
            return this.drawer;
        },

        setBusinessObjectType: function (businessObjectTypeName) {
            this.drawer.setBusinessObjectType(businessObjectTypeName);
            EventAggregator.trigger("change:drawerSelected", this.drawer.currentBusinessObjectType);
            this.setTask("list");
        },

        setTask: function (task) {
            this.drawer.setTask(task);
            EventAggregator.trigger("change:taskSelected", this.drawer.currentTask);
        }
    });

    Core.Events.enableFor(DrawerController.prototype);

    return DrawerController;
});
