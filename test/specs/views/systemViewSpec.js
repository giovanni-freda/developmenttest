define(['core', '../../../src/js/views/systemView'],
    function(Core, SystemView) {
        "use strict";

        describe('System View', function() {
            var systemView;

            beforeEach(function() {
                systemView = new SystemView();
            });

            describe('render', function(){
                it('should return itself', function(){
                    var ret = systemView.render();
                    expect(ret).toBe(systemView);
                });
            });
        });
    });