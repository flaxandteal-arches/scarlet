define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/chronometer-trials.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, chronometerTrialsReportTemplate) {
    return ko.components.register('views/chronometer-trials', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Produced Object for",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => (
                        console.error("NOT FILTERING CHRONOMETER TRIALS YET") || true
                    ),
                    label: data => this.labelFirstDefined(
                        data,
                        "Chronometer Trial Name"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Chronometer Trial", groups);
        },
        template: chronometerTrialsReportTemplate
    });
});
