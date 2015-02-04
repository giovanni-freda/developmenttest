define(['underscore'],
    function (_) {
        "use strict";

        var SolutionToolbarDefinition = function(options) {

        };

        _.extend(SolutionToolbarDefinition.prototype, {
            centerButtons:
                [
                    {title: "Install Solution" ,id: "solutionInstallButton", disabled: false, icon: "solutionInstallIcon icon-add" , event: 'solution:install'},
                    {title: "Remove Solution" ,id: "solutionRemoveButton", disabled: false, icon: "solutionRemoveIcon icon-remove", event: 'solution:remove' },
                    {title: "Remove All Solutions" ,id: "solutionRemoveAllButton", disabled: false, icon: "solutionRemoveAllIcon icon-delete", event: 'solution:removeAll' }
                ],

            rightButtons:
                [
                    {title: "Summary" ,id: "solutionSummaryButton", class: "solutionSummaryButton", disabled: true, icon: "solutionSummaryIcon icon-properties_outline" , event: 'solution:summary'},
                    {title: "Configuration" ,id: "solutionConfigurationButton", class: "solutionConfigurationButton", disabled: true, icon: "solutionConfigurationIcon icon-gear" , event: 'solution:configuration'},
                    {title: "Security" ,id: "solutionSecurityButton", class: "solutionSecurityButton", disabled: true, icon: "solutionSecurityIcon icon-link" , event: 'solution:security'}
                ],

            getToolbarDefinition : function() {
                return { centerButtons: this.centerButtons, rightButtons: this.rightButtons};
            }
        });

        return SolutionToolbarDefinition;
    }
);