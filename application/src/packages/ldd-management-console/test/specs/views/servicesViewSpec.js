define(['core', '../../../src/js/views/servicesView'],
    function(Core, ServicesView) {
        "use strict";

        describe('Services View', function() {
            var servicesView;

            beforeEach(function() {
                servicesView = new ServicesView();
            });

            describe('render', function(){
                it('should return itself', function(){
                    var ret = servicesView.render();
                    expect(ret).toBe(servicesView);
                });
            });
        });
    });