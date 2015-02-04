define(['../../../src/js/views/lddAlertContainer', 'jquery', '../../../src/js/eventAggregator'], function (LddAlertContainer, $, EventAggregator) {
    "use strict";

    describe('LDD Alert Container', function () {
        var alertContainer;

        describe('when Rendering alert container', function () {

            beforeEach(function () {
                alertContainer = new LddAlertContainer({});
            });

            it('should return alert container', function () {
                var returnValue = alertContainer.render();
                expect(returnValue).toBe(alertContainer);
            });

            it('should show alert message', function () {
                var returnObject = alertContainer.showAlert({message: 'Hi', type: 'info'});
                expect(returnObject.message).toMatch('Hi');
                expect(returnObject.type).toMatch('info');
            });
        });

        describe('when closing an alert', function() {
            beforeEach(function() {
                alertContainer = new LddAlertContainer({});
            });

            it('should trigger alert:close', function(){
                var callback = sinon.spy();
                EventAggregator.on("alert:close", callback);
                var returnObject = alertContainer.showAlert({message: 'Hi', type: 'info'});
                returnObject.close();
                EventAggregator.off("alert:close");
                expect(callback.calledOnce).toBeTruthy();
            })

            it('should call original callback if given', function() {
                var callback = sinon.spy();
                var returnObject = alertContainer.showAlert({message: 'Hi', type: 'info', onClose: callback});
                returnObject.close();
                expect(callback.calledOnce).toBeTruthy();
            });
        });

        describe('when showing an alert', function() {
            beforeEach(function() {
                alertContainer = new LddAlertContainer({});
            });

            it('should trigger alert:new', function(){
                var callback = sinon.spy();
                EventAggregator.on("alert:new", callback);
                var returnObject = alertContainer.showAlert({message: 'Hi', type: 'info'});
                EventAggregator.off("alert:new");
                expect(callback.calledOnce).toBeTruthy();
            })
        });
    });
});

