define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/importings.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, importingsReportTemplate) {
    return ko.components.register('views/importings', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "As Recipient",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Imported By", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Imported From"
                    )
                },
                {
                    title: "As Supplier",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Imported From", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Imported By"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Importing", groups);
        },
        template: importingsReportTemplate
    });
});
