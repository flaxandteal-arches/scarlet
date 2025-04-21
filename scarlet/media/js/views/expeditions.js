define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/expeditions.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, expeditionsReportTemplate) {
    return ko.components.register('views/expeditions', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Carried Out By",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Expedition Carried Out By", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Expedition Name"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Expedition", groups);
        },
        template: expeditionsReportTemplate
    });
});
