define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/patentings.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, patentingsReportTemplate) {
    return ko.components.register('views/patentings', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Patented",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Patented By", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Patent Number"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Patenting", groups);
        },
        template: patentingsReportTemplate
    });
});
