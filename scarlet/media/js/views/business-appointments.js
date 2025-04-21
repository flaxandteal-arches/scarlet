define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    './base.js',
    'templates/views/business-appointments.htm',
    'bindings/datatable',
], function(_, ko, $, arches, BasePersonReport, businessAppointmentsReportTemplate) {
    return ko.components.register('views/business-appointments', {
        viewModel: function(params) {
            const groups = [
                {
                    title: "Received",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Business Appointment - Maker Appointed", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Business Appointment - Additional Notes"
                    )
                },
                {
                    title: "Made",
                    visible: ko.observable(true),
                    related: ko.observableArray([]),
                    match: data => this.dataValueIsResource(data, "Business Appointment Made By", this.resourceId),
                    label: data => this.labelFirstDefined(
                        data,
                        "Business Appointment - Additional Notes"
                    )
                }
            ];

            BasePersonReport.apply(this, [params, groups]);
            this.fetchRelated("Business Appointment", groups);
        },
        template: businessAppointmentsReportTemplate
    });
});
