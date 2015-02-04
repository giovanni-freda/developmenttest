define(['core', '../../../src/js/views/homeView'],
    function(Core, HomeView) {
        "use strict";

        describe('Home View', function() {
            var homeView;

            beforeEach(function() {
                homeView = new HomeView();
            });

            describe('render', function(){
                it('should return itself', function(){
                    var ret = homeView.render();
                    expect(ret).toBe(homeView);
                });
            });
        });
    });