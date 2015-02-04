define(['core', '../../../src/js/views/logsView'],
    function(Core, LogsView) {
        "use strict";

        describe('Logs View', function() {
            var logsView;

            beforeEach(function() {
                logsView = new LogsView();
            });

            describe('render', function(){
                it('should return itself', function(){
                    var ret = logsView.render();
                    expect(ret).toBe(logsView);
                });
            });
        });
    });