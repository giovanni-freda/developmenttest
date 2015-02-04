define(['core', '../../../src/js/views/eFormsView'],
    function(Core, EFormsView) {
        "use strict";

        describe('EForms View', function() {
            var eFormsView;

            beforeEach(function() {
                eFormsView = new EFormsView();
            });

            describe('render', function(){
                it('should return itself', function(){
                    var ret = eFormsView.render();
                    expect(ret).toBe(eFormsView);
                });
            });
        });
    });