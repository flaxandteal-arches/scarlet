import _ from 'underscore';
import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import reportUtils from 'utils/report';
import relationshipsReportTemplate from 'templates/views/relationships.htm';
export default ko.components.register('views/relationships', {
    viewModel: function(params) {
        const self = this;
        Object.assign(self, reportUtils);
        self.marriages = ko.observableArray();
        // Scientific Dates table configuration
        self.relationshipsTableConfig = {
            ...self.defaultTableConfig,
            paging: true,
            searching: true,
            scrollY: "250px",
            columns: Array(3).fill(null)
        };
        self.dataConfig = {
            relationships: [
                'Parent',
                'Child-in-Law',
                'Sibling'
            ],
        };
        self.resourceId = params.resourceId();
        self.report = params.report();
        let marriages = Object.values(self.report.relatedResourcesLookup()).find(x => x.name == "Marriage");
        if (marriages?.remainingResources()) {
            console.error("THERE ARE UNREQUESTED REMAINING MARRIAGE RESOURCES, NOT ALREADY LOADED: they will not be displayed");
        }
        marriages = marriages?.
            loadedRelatedResources()?.
            map(marriage => {
                return $.ajax({
                    url: generateArchesURL("api_resource_report", {resourceid: marriage.link.split("/").pop()}),
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        format: 'json',
                        uncompacted: true
                    }
                })
                    .then(function(data) {
                        return {
                            instance: data,
                            ignoreSpouse: self.resourceId
                        };
                    })
                    .fail(function(response) {
                        console.log('Getting marriages failed: \n', response);
                    });
            }).filter(marriage => marriage);
        if (marriages) {
            Promise.all(marriages).then(marriages => {
                self.marriages(marriages);
            });
        }
        self.cards = Object.assign({}, params.cards);
        self.edit = params.editTile || self.editTile;
        self.delete = params.deleteTile || self.deleteTile;
        self.add = params.addTile || self.addNewTile;
        self.relationships = ko.observableArray();
        self.visible = {
            relationships: ko.observable(true),
        }
        Object.assign(self.dataConfig, params.dataConfig || {});
        // if params.compiled is set and true, the user has compiled their own data.  Use as is.
        if(params?.compiled){
        } else {
            const relationshipsNode = self.dataConfig.relationships.map(relationship => {
                const node = self.getRawNodeValue(params.data(), relationship.toLowerCase());
                if (node) {
                    node.field = relationship;
                }
                return node;
            }).filter(r => r && r.instance_details);
            if(relationshipsNode?.length){
                self.relationships(relationshipsNode.reduce((acc, x) => {
                    acc.push(...x.instance_details.map(instance => {
                        const actor = self.getNodeValue(instance, 'display_value');
                        const role = x.field;
                        const tileid = self.getTileId(x);
                        return {
                            actor,
                            role,
                            tileid
                        };
                    }));
                    return acc;
                }, []));
            }
        } 
    },
    template: relationshipsReportTemplate
});
