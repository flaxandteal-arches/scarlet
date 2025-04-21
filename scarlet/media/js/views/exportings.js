define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/exportings.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, exportingsReportTemplate) {
    return ko.components.register('views/exportings', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Made",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Exported By", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Exported To"
                    )
                },
                {
                    title: "Received",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Exported To", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Exported By"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Exporting", groups);
        },
        template: exportingsReportTemplate
    });
});
