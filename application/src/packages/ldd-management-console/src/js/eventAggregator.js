define(['core'], function (Core) {
    // create basic javascript object, allow Core.Events.enableFor to extend it with the Backbone
    // provided methods for subscribing to / triggering events.
    // Returning a new instance serves as a singleton (first load does new, rest return that object)
    // test and revisit, DI may be needed for ease of testing
    var eventAggregator = function () {
    };

    Core.Events.enableFor(eventAggregator.prototype)
    return new eventAggregator;
});