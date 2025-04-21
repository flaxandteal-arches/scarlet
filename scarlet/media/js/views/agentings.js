define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/agentings.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, agentingsReportTemplate) {
    return ko.components.register('views/agentings', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "As Agent",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Agent", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Client"
                    )
                },
                {
                    title: "As Client",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Client", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Agent"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Agenting", groups);
        },
        template: agentingsReportTemplate
    });
});
