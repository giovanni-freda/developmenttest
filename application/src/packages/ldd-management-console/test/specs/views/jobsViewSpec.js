define(['core', '../../../src/js/views/jobsView'],
    function(Core, JobsView) {
        "use strict";

        describe('Jobs View', function() {
            var jobsView;

            beforeEach(function() {
                jobsView = new JobsView();
            });

            describe('render', function(){
                it('should return itself', function(){
                    var ret = jobsView.render();
                    expect(ret).toBe(jobsView);
                });
            });
        });
    });