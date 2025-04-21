define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/royal-appointments.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, royalAppointmentsReportTemplate) {
    return ko.components.register('views/royal-appointments', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Received",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Royal Appointment - Maker Appointed", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Royal Appointment - Additional Notes"
                    )
                },
                {
                    title: "Made",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Royal Appointment Made By", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Royal Appointment - Additional Notes"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Royal Appointment", groups);
        },
        template: royalAppointmentsReportTemplate
    });
});
