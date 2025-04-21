define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/memberships.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, membershipsReportTemplate) {
    return ko.components.register('views/memberships', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Member",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Member", this.resourceId),
                    label: data => data.report_json["Member of Organisation"]["@value"]
                },
                {
                    title: "Member of Organisation",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Member of Organisation", this.resourceId),
                    label: data => data.report_json["Member"]["@value"]
                },
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Membership", groups);
        },
        template: membershipsReportTemplate
    });
});
