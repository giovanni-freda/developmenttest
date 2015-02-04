define(['core', '../../../src/js/views/deviceGroupsView'],
    function(Core, DeviceGroupsView) {
        "use strict";

        describe('Device Groups View', function() {
            var deviceGroupsView;

            beforeEach(function() {
                deviceGroupsView = new DeviceGroupsView();
            });

            describe('render', function(){
                it('should return itself', function(){
                    var ret = deviceGroupsView.render();
                    expect(ret).toBe(deviceGroupsView);
                });
            });
        });
    });