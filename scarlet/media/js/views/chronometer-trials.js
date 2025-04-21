import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base.js';
import chronometerTrialsReportTemplate from 'templates/views/chronometer-trials.htm';
export default ko.components.register('views/chronometer-trials', {
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
