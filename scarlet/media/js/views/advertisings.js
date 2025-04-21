define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/advertisings.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, advertisingsReportTemplate) {
    return ko.components.register('views/advertisings', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Advertising",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Advertised Maker", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Produced Advertisement",
                        "Advertised Specific Object(s)",
                        "Advertised Objects of Type(s)",
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Advertising", groups);
        },
        template: advertisingsReportTemplate
    });
});
