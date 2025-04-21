import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import royalAppointmentsReportTemplate from 'templates/views/royal-appointments.htm';
export default ko.components.register('views/royal-appointments', {
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
