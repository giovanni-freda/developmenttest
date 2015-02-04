define(['core', '../../../src/js/views/reportsView'],
    function(Core, ReportsView) {
        "use strict";

        describe('Reports View', function() {
            var reportsView;

            beforeEach(function() {
                reportsView = new ReportsView();
            });

            describe('render', function(){
                it('should return itself', function(){
                    var ret = reportsView.render();
                    expect(ret).toBe(reportsView);
                });
            });
        });
    });