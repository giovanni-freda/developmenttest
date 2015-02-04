//Basic requirejs class design 
define(['underscore', 'core', '../eventAggregator', '../businessObjectsDefinition'], function (_, Core, EventAggregator) {
    "use strict"; //please always enforce strict mode http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/

    //basic constructor init instance
    function DrawerModel() {
        Core.Events.enableFor(this);

        this.currentBusinessObjectType = undefined;
        this.currentBusinessObjectInstance = undefined;
        this.currentTask = undefined;

        this.listenTo(EventAggregator, "change:businessObjectType", this.setBusinessObjectType);
        this.listenTo(EventAggregator, "change:businessObjectInstance", this.setBusinessObjectInstance);
        this.listenTo(EventAggregator, "change:currentTask", this.setTask);
    }

    DrawerModel.prototype.BusinessObject

    DrawerModel.prototype.setBusinessObjectType = function (businessObjectType) {
        this.currentBusinessObjectType = businessObjectType;
    }

    DrawerModel.prototype.setBusinessObjectInstance = function (businessObjectInstance) {
        this.currentBusinessObjectInstance = businessObjectInstance;
        EventAggregator.trigger('change:currentTask', "summary");
    }

    DrawerModel.prototype.setTask = function (task) {
        this.currentTask = task;
    }

    DrawerModel.prototype.hasBusinessObjectTypeSelected = function () {
        return this.currentBusinessObjectType != undefined;
    }

    DrawerModel.prototype.hasBusinessObjectInstanceSelected = function () {
        return this.currentBusinessObjectInstance != undefined;
    }

    DrawerModel.prototype.hasTaskSelected = function () {
        return this.currentTask != undefined;
    }

    _.extend(DrawerModel.prototype, Core.Events);
    return DrawerModel;
});

