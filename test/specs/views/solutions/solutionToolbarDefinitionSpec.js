define(['../../../../src/js/views/solution/solutionToolbarDefinition', 'core', 'jquery', '../../../../src/js/eventAggregator'], function (SolutionToolbarDefinition, Core, jQuery, EventAggregator) {
    "use strict";

    function findButton(buttonArray, buttonId) {
        var button = undefined;
        $.each(buttonArray, function(index, currentButton) {
            if(currentButton.id ==buttonId)
                button = currentButton;
        });

        return button;
    };

    describe('Solution Toolbar Definition', function () {
        var solutionsToolbarDefinition;

        beforeEach(function () {
             solutionsToolbarDefinition = new SolutionToolbarDefinition();
        });

        afterEach(function () {

        });

        describe('center button list', function() {

            it('should only have three buttons', function() {
                expect(solutionsToolbarDefinition.centerButtons.length).toBe(3);
            });

            it('should have install solution button', function() {
                var button = findButton(solutionsToolbarDefinition.centerButtons, "solutionInstallButton");
                expect(button).toBeTruthy();
                expect(button.title).toBe("Install Solution");
                expect(button.id).toBe("solutionInstallButton");
                expect(button.disabled).toBe(false);
                expect(button.icon).toBe("solutionInstallIcon icon-add");
                expect(button.event).toBe("solution:install");
            });

            it('should have remove solution button', function() {
                var button = findButton(solutionsToolbarDefinition.centerButtons, "solutionRemoveButton");
                expect(button).toBeTruthy();
                expect(button.title).toBe("Remove Solution");
                expect(button.id).toBe("solutionRemoveButton");
                expect(button.disabled).toBe(false);
                expect(button.icon).toBe("solutionRemoveIcon icon-remove");
                expect(button.event).toBe("solution:remove");
            });

            it('should have remove all solutions button', function() {
                var button = findButton(solutionsToolbarDefinition.centerButtons, "solutionRemoveAllButton");
                expect(button).toBeTruthy();
                expect(button.title).toBe("Remove All Solutions");
                expect(button.id).toBe("solutionRemoveAllButton");
                expect(button.disabled).toBe(false);
                expect(button.icon).toBe("solutionRemoveAllIcon icon-delete");
                expect(button.event).toBe("solution:removeAll");
            });
        });

        describe('right button list', function() {

            it('should only have three buttons', function() {
                expect(solutionsToolbarDefinition.rightButtons.length).toBe(3);
            });

            it('should have summary button', function() {
                var button = findButton(solutionsToolbarDefinition.rightButtons, "solutionSummaryButton");
                expect(button).toBeTruthy();
                expect(button.title).toBe("Summary");
                expect(button.class).toBe("solutionSummaryButton");
                expect(button.id).toBe("solutionSummaryButton");
                expect(button.disabled).toBe(true);
                expect(button.icon).toBe("solutionSummaryIcon icon-properties_outline");
                expect(button.event).toBe("solution:summary");
            });

            it('should have configuration button', function() {
                var button = findButton(solutionsToolbarDefinition.rightButtons, "solutionConfigurationButton");
                expect(button).toBeTruthy();
                expect(button.title).toBe("Configuration");
                expect(button.class).toBe("solutionConfigurationButton");
                expect(button.id).toBe("solutionConfigurationButton");
                expect(button.disabled).toBe(true);
                expect(button.icon).toBe("solutionConfigurationIcon icon-gear");
                expect(button.event).toBe("solution:configuration");
            });

            it('should have security button', function() {
                var button = findButton(solutionsToolbarDefinition.rightButtons, "solutionSecurityButton");
                expect(button).toBeTruthy();
                expect(button.title).toBe("Security");
                expect(button.class).toBe("solutionSecurityButton");
                expect(button.id).toBe("solutionSecurityButton");
                expect(button.disabled).toBe(true);
                expect(button.icon).toBe("solutionSecurityIcon icon-link");
                expect(button.event).toBe("solution:security");
            });
        });

        it('should return both sets of button in toolbar definition', function() {
            var toolbarDefinition = solutionsToolbarDefinition.getToolbarDefinition();
            expect(toolbarDefinition.centerButtons).toBeTruthy();
            expect(toolbarDefinition.rightButtons).toBeTruthy();
            expect(toolbarDefinition.centerButtons).toBe(solutionsToolbarDefinition.centerButtons);
            expect(toolbarDefinition.rightButtons).toBe(solutionsToolbarDefinition.rightButtons);
        });
    });
});