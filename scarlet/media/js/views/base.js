define([
    'underscore',
    'knockout',
    'jquery',
    'arches',
    'utils/report',
    'bindings/datatable',
    'datatables.net-rowgroup-dt',
], function(_, ko, $, arches, reportUtils) {
    const BasePersonReport = function(params, groups) {
        Object.assign(this, reportUtils);
        const self = this;

        if (!this.tableConfig) {
            this.tableConfig = {
                ...this.defaultTableConfig,
                paging: false,
                searching: true,
                scrollY: "250px",
                columns: [
                    {"visible": false},
                    {"orderData": 0},
                    null,
                    null
                ]
            };
        }
        this.resourceId = params.resourceId;
        this.report = params.report;
        this.reportSpecification = self.report().reportSpecification;
        this.showUnordered = ko.observable(false);

        this.flattenObject = function(group, name, link, ...objectsToBeFlattened) {
            const flattened = {};
            const addNode = function(node) {
                Object.entries(node)
                    .filter(item => (!item[0].startsWith("@") && item[1] && typeof item[1] == "object" && item[1]["@node_id"]))
                    ?.forEach(subnode => {
                        flattened[subnode[0]] = subnode[1];
                        addNode(subnode[1]);
                    });
            };
            objectsToBeFlattened.forEach(addNode);

            // If we have no ordered items in this table, assume that the
            // UUIDs are missing, and include all.
            if (!Object.values(flattened).find(
                item => (self.reportSpecification.indexOf(item["@node_id"]) >= 0)
            )) {
                self.showUnordered(true);
            }

            const ordered = Object.entries(flattened)
                .map(item => ({
                    key: item[0],
                    link: null,
                    value: (item[1]["@display_value"] !== "NON_DATA_COLLECTING_NODE") ? 
                        (item[1]["@display_value"] ? item[1]["@display_value"] : item[1]["@value"]) : "",
                    _order: self.reportSpecification.indexOf(item[1]["@node_id"])
                }))
                .filter(item => self.showUnordered() || item._order >= 0)
                .sort((i1, i2) => (i1._order - i2._order));
            return {
                name: name,
                group: group,
                link: link,
                visible: ko.observable(false),
                fields: ordered
            };
        };

        this.fetchRelated = function(relatedModel, groups) {
            Promise.all(self.retrieveRelated(relatedModel)).
                then(dataRows => self.compileDataRows(dataRows, groups));
        };
        this.fetchNested = function(nestedFields, groups) {
            const dataRows = nestedFields.map(field => {
                const content = self.report().report_json.resource[field];
                return content ? {
                    field: field, // only exists in nested context
                    report_json: content // mimics structure of a resource
                } : undefined;
            });
            this.compileDataRows(dataRows, groups);
        };
        this.compileDataRows = function(dataRows, groups) {
            const resources = dataRows.map(data => {
                if (!data) {
                    return undefined;
                }

                //TODO maybe worth showing this display name instead of labels to avoid the label being null/causing error?
                return groups.filter(group => group.match(data)).map(group => {
                    const link = group.link ? group.link(data) :
                        data.asRelated ? data.asRelated.link : null;
                    return [group, group.label(data), link, data.report_json];
                }).flat();
            }).
                map(resource => !!resource && self.flattenObject(...resource)).
                filter(resource => resource);
            groups.forEach(group => group.related(
                resources
                    .filter(resource => resource.group === group)
                    .sort((a, b) => a.name?.localeCompare(b.name))
            ));
        };

        this.retrieveRelated = function(relatedModel) {
            let related = Object.values(self.report().relatedResourcesLookup()).find(x => x.name == relatedModel);
            if (related?.remainingResources()) {
                console.error("THERE ARE UNREQUESTED REMAINING RELATED RESOURCES, NOT ALREADY LOADED: they will not be displayed");
            }

            if (!related) {
                console.error(relatedModel, 'relationship missing');
                return [];
            }

            return related.
                loadedRelatedResources().
                map(resource => {
                    return $.ajax({
                        url: arches.urls.api_resource_report(resource.link.split("/").pop()),
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            format: 'json',
                            uncompacted: true
                        }
                    }).
                        then(function(data) {
                            data.asRelated = resource;
                            return data;
                        }).
                        fail(function(response) {
                            console.log('Getting resource failed: \n', response);
                        });
                });
        };

        this.labelFirstDefined = function(data, ...labels) {
            const label = labels.find(label => data.report_json[label]);
            if (label) {
                return `${label}: ${data.report_json[label]["@value"]}`;
            }
            if (data.displaydescription) {
                return `${data.displayname}, ${data.displaydescription}`;
            } else {
                return data.displayname;
            }
        };

        this.dataToNodeValue = function(data, reportKey) {
            if (reportKey in data.report_json) {
                const tile = data.tiles.find(tile => tile.tileid === data.report_json[reportKey]["@tile_id"]);
                if (tile) {
                    return tile.data[tile.nodegroup_id];
                }
            }
            return undefined;
        };

        this.dataValueIsResource = function(data, reportKey, resourceId) {
            const value = this.dataToNodeValue(data, reportKey);
            if (value && (typeof value) == "object" && value.length === 1 && (typeof value[0]) == "object") {
                return value[0].resourceId === (ko.isObservable(resourceId) ? resourceId() : resourceId);
            }
        };

        this.groupedRows = ko.observableArray();
        this.groupsToGroupedRows = function(groups) {
            const _groupedRows = groups.reduce((acc, group) => {
                const related = group.related();
                if (!related) {
                    // Do not show groups that do not have any entries.
                    return acc;
                }
                related.forEach(item => {
                    item.fields.forEach(entry => {
                        if (item.name && group.title != item.name) {
                            entry._group = `${group.title}: ${item.name}`;
                        } else {
                            entry._group = group.title;
                        }
                    });
                    if (item.fields.length) {
                        acc.push(...item.fields);
                    }
                });
                return acc;
            }, []);
            self.groupedRows(_groupedRows);
        };

        this.cards = Object.assign({}, params.cards);
        this.edit = params.editTile || self.editTile;
        this.delete = params.deleteTile || self.deleteTile;
        this.add = params.addTile || self.addNewTile;
        this.groups = groups;
    };

    return BasePersonReport;
});
