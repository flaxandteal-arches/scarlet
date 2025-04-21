define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/awards.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, awardsReportTemplate) {
    return ko.components.register('views/awards', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Received",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Awarded To", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Award Name"
                    )
                },
                {
                    title: "Made",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Awarded By", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Award Name"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Award", groups);
        },
        template: awardsReportTemplate
    });
});
