define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/educations.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, educationsReportTemplate) {
    return ko.components.register('views/educations', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Received",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Educated Person", this.resourceId),
                    label: data => data.report_json["Educator"] ? data.report_json["Educator"]["@value"] : null
                },
                {
                    title: "As Educator",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Educator", this.resourceId),
                    label: data => data.report_json["Educated Person"] ? data.report_json["Educated Person"]["@value"] : null
                },
                {
                    title: "As Education Provider",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Education Provider", this.resourceId),
                    label: data => data.report_json["Educated Person"] ? data.report_json["Educated Person"]["@value"] : null
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Education", groups);
        },
        template: educationsReportTemplate
    });
});
