define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/surveys.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, surveysReportTemplate) {
    return ko.components.register('views/surveys', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Carried Out By",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Survey Carried Out By", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Survey Name"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Survey", groups);
        },
        template: surveysReportTemplate
    });
});
