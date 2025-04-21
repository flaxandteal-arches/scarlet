define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/employments.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, employmentsReportTemplate) {
    return ko.components.register('views/employments', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "As Employee",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Employee", this.resourceId),
                    label: data => data.report_json["Employer"]["@value"]
                },
                {
                    title: "As Employer",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Employer", this.resourceId),
                    label: data => data.report_json["Employee"]["@value"]
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Employment", groups);
        },
        template: employmentsReportTemplate
    });
});
