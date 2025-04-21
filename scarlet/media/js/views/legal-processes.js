define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/legal-processes.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, legalProcessesReportTemplate) {
    return ko.components.register('views/legal-processes', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "As Defendant",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Defendant", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Legal Process Name"
                    )
                },
                {
                    title: "As Prosecutor",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Prosecutor", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Defendant"
                    )
                },
                {
                    title: "As Petitioner",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Petitioner", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Legal Process Name"
                    )
                },
                {
                    title: "As Sued Party",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Sued", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Legal Process Name"
                    )
                },
                {
                    title: "As Suer",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Suer", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Defendant"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Legal Process", groups);
        },
        template: legalProcessesReportTemplate
    });
});
