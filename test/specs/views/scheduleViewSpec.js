define(['core', '../../../src/js/views/scheduleView'],
    function(Core, ScheduleView) {
        "use strict";

        describe('Schedule View', function() {
            var scheduleView;

            beforeEach(function() {
                scheduleView = new ScheduleView();
            });

            describe('render', function(){
                it('should return itself', function(){
                    var ret = scheduleView.render();
                    expect(ret).toBe(scheduleView);
                });
            });
        });
    });