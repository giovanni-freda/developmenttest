define(['core', '../../src/js/eventAggregator'], function (Core, EventAggregator) {
    'use strict';

    //Test fixture, this makes that pretty heading,
    //ex:
    //describe('Fixture Name', function() {describe('Test1', function())});
    describe('Event Aggregator', function () {

        describe('when triggering an event', function () {
            var handler;
            var aggregator;

            beforeEach(function () {
                aggregator = EventAggregator;

                aggregator.on("test", function () {
                    handler = true;
                });

                aggregator.trigger("test");
            });

            it('should fire registered handlers', function () {
                expect(handler).toBeTruthy();
            });
        });

        describe('when unbinding an event', function () {
            var handler;
            var aggregator;

            beforeEach(function () {
                aggregator = EventAggregator;
                var callback = function () {
                    handler = true;
                };

                aggregator.on("test", callback);
                aggregator.off("test", callback);

                aggregator.trigger("test");
            });

            it('should not fire de-registered handlers', function () {
                expect(handler).toBeUndefined();
            });
        });

    });

});
