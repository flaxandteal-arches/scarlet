define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/sellings.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, sellingsReportTemplate) {
    return ko.components.register('views/sellings', {
        viewModel: function(params) {
            // Question: currently we take the first matching group,
            // but should we actually have things appearing in multiple in certain settings?
            const groups = [
                {
                    title: "As Seller",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Sold By", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Sold To"
                    )
                },
                {
                    title: "As Recipient",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Sold To", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Sold By"
                    )
                },
                {
                    title: "As Producer",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Sold Object(s) By", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Sold By"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Selling", groups);
        },
        template: sellingsReportTemplate
    });
});
