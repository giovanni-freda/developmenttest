define(['../../../src/js/views/licenseView'], function (LicenseView) {
    "use strict";

    describe('License View', function () {
        var licenseView;

        describe('when Rendering', function () {

           beforeEach(function () {
                var systemController = {};
                systemController.getLicenseInfo = sinon.spy();
                systemController.getLicenseGridColumns = sinon.spy();
                systemController.convertToGridRowDefinition = sinon.spy();
                licenseView = new LicenseView({systemController:systemController});
            });

            it('should return license view', function () {
                var returnValue = licenseView.render();
                expect(returnValue).toBe(licenseView);
                //expect(returnValue.data).not.toBe(null);
            }); 

            it('should return license view data', function () {
                var returnValue = licenseView.render();               
                expect(returnValue.data).not.toBe(null);
            });          
        });
    });
});