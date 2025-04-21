define([
    'underscore',
    'knockout',
    'arches',
    'utils/report',
    'templates/views/marriage.htm',
    'views/scenes-default',
    'bindings/datatable',
], function(_, ko, arches, reportUtils, marriageReportTemplate) {
    return ko.components.register('views/marriage', {
        viewModel: function(params) {
            var self = this;
            Object.assign(self, reportUtils);

            self.datesTableConfig = {
                ...self.defaultTableConfig,
            };

            self.spouseTableConfig = {
                ...self.defaultTableConfig,
            };

            self.dataConfig = {
                name: 'marriage',
                ignoreSpouse: params.ignoreSpouse || false,
            }

            self.visible = {
                marriage: ko.observable(true),
            }
            self.spouses = ko.observableArray();
            self.dates = ko.observable();
            self.dates(
                ["Marriage Start Date", "Marriage End Date"].map(
                    date => ({key: date, value: params.data.report_json[date]})
                ).filter(date => date.value).map(date => ({
                    field: date.key,
                    date: date.value[date.key + " Value"]["@value"],
                    type: date.value[date.key + " Type"]["@value"],
                    note: date.value[date.key + " - Additional Notes"]["@value"],
                }))
            );

            Object.assign(self.dataConfig, params.dataConfig || {});
            const relatedPeople = params.data.related_resources.filter(
                resource => resource.name === "Person"
            )[0].resources.reduce((acc, x) => {
                acc[x.resourceinstanceid] = x;
                return acc;
            }, {});
            const spouseTile = params.data.tiles.filter(
                tile => tile.nodegroup_id === params.data.report_json["Spouse"]["@node_id"]
            );
            let spouses = [];
            if (spouseTile.length) {
                spouses = spouseTile[0].data[params.data.report_json["Spouse"]["@node_id"]].map(
                    spouse => ({
                        name: relatedPeople[spouse.resourceId].displayname,
                        resourceid: spouse.resourceId
                    })
                ).filter(spouse => (self.dataConfig.ignoreSpouse !== spouse.resourceid));
            }
            self.spouses(spouses);

        },
        template: marriageReportTemplate
    });
});
