define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/inventions.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, inventionsReportTemplate) {
    return ko.components.register('views/inventions', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Invented",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Inventor", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Invented Object Type"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Inventing", groups);
        },
        template: inventionsReportTemplate
    });
});
