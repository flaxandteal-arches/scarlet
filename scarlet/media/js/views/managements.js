define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/managements.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, managementsReportTemplate) {
    return ko.components.register('views/managements', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Management of Organisation(s)",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Manager", this.resourceId),
                    label: data => data.report_json["Managed Organisation"]["@value"]
                },
                {
                    title: "Management of This Organisation",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Managed Organisation", this.resourceId),
                    label: data => data.report_json["Manager"]["@value"]
                },
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Management", groups);
        },
        template: managementsReportTemplate
    });
});
