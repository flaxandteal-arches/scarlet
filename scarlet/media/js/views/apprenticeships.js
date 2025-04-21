define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/apprenticeships.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, apprenticeshipsReportTemplate) {
    return ko.components.register('views/apprenticeships', {
        viewModel: function(params) {

            const groups = [
                {
                    title: "As Apprentice",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Apprentice", this.resourceId),
                    label: data => data.report_json["Apprenticeship Involved Guild"]["@value"]
                },
                {
                    title: "As Master",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Master", this.resourceId),
                    label: data => data.report_json["Apprenticeship Involved Guild"]["@value"]
                },
                {
                    title: "As Apprenticeship Involved Guild",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Apprenticeship Involved Guild", this.resourceId),
                    label: data => data.report_json["Apprentice"]["@value"]
                },
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Apprenticeship", groups);
        },
        template: apprenticeshipsReportTemplate
    });
});
