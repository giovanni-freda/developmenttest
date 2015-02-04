define(['core', '../../../src/js/views/softwareClientGroupsView'],
    function(Core, SoftwareClientGroupsView) {
        "use strict";

        describe('Software Client Groups View', function() {
            var softwareClientGroupsView;

            beforeEach(function() {
                softwareClientGroupsView = new SoftwareClientGroupsView();
            });

            describe('render', function(){
                it('should return itself', function(){
                    var ret = softwareClientGroupsView.render();
                    expect(ret).toBe(softwareClientGroupsView);
                });
            });
        });
    });