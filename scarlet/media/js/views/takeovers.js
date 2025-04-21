define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/takeovers.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, takeoversReportTemplate) {
    return ko.components.register('views/takeovers', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Took Over",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Taken Over By", this.resourceId),
                    label: data => data.report_json["Took Over"]["@value"]
                },
                {
                    title: "Takeover(s) of This Organisation",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Took Over", this.resourceId),
                    label: data => data.report_json["Taken Over By"]["@value"]
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Takeover", groups);
        },
        template: takeoversReportTemplate
    });
});
