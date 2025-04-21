import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import BasePersonReport from './base';
import lifeEventsReportTemplate from 'templates/views/life-events.htm';
export default ko.components.register('views/life-events', {
    viewModel: function(params) {
        self.resource = params.data;
        self.resourceId = params.resourceId;
    
        this.tableConfig = {
            ...this.defaultTableConfig,
            paging: false,
            searching: true,
            scrollY: "80vh",
            autoWidth: false,
            columns: [
                {"visible": false, "width": "0%"},
                {"visible": false, "width": "0%"},
                {"orderData": 0, "width": "30%"},
                {"width": "70%"},
            ],
            rowGroup: {
                dataSrc: 1
            }
        };
        const fields = {
            "Birth": ["Birth"],
            "Baptism": ["Baptism"],
            "Naturalisation": ["Naturalisation"],
            "Occupied Workhouse": ["Occupied Workhouse"],
            "Retirement": ["Retirement"],
            "Death": ["Death"],
            "Burial": ["Burial"]
        };
        const groups = Object.entries(fields).map(item => ({
            title: item[0],
            visible: ko.observable(true),
            related: ko.observableArray([]),
            match: data => item[1].includes(data.field),
            label: () => item[0]
        }));
        BasePersonReport.apply(this, [params, groups]);
        this.fetchNested(Object.keys(fields), groups);
        this.groupsToGroupedRows(groups);
    },
    template: lifeEventsReportTemplate
});
