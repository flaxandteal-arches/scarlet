import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import surveysReportTemplate from 'templates/views/surveys.htm';
export default ko.components.register('views/surveys', {
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
