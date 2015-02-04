define(['core', '../../../src/js/views/devicesView'],
    function(Core, DevicesView) {
        "use strict";

        describe('Devices View', function() {
            var devicesView;

            beforeEach(function() {
                devicesView = new DevicesView();
            });

            describe('render', function(){
                it('should return itself', function(){
                    var ret = devicesView.render();
                    expect(ret).toBe(devicesView);
                });
            });
        });
    });