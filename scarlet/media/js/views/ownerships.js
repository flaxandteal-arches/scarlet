define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/ownerships.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, ownershipsReportTemplate) {
    return ko.components.register('views/ownerships', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Ownership",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Owner", this.resourceId),
                    label: data => data.report_json["Owned"]["@value"]
                },
                {
                    title: "Ownership of This Organisation",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Owned", this.resourceId),
                    label: data => data.report_json["Owner"]["@value"]
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Ownership", groups);
        },
        template: ownershipsReportTemplate
    });
});
