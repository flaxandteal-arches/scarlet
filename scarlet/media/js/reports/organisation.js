import $ from 'jquery';
import _ from 'underscore';
import ko from 'knockout';
import arches from 'arches';
import resourceUtils from 'utils/resource';
import reportUtils from 'utils/report';
import organisationReportTemplate from 'templates/views/reports/organisation.htm';
import reportSpecification from './REPORT-SPECIFICATION.json';
export default ko.components.register('organisation-report', {
    viewModel: function(params) {
        var self = this;
        params.configKeys = ['tabs', 'activeTabIndex'];
        this.configForm = params.configForm || false;
        this.configType = params.configType || 'header';
        Object.assign(self, reportUtils);
        self.sections = [
            {id: 'basic-info', title: 'Basic Information'},
            {id: 'addresses', title: 'Addresses'},
            {id: 'work-events', title: 'Work Events'},
            {id: 'productive-activity', title: 'Productive Activity'},
            {id: 'research-and-recognition', title: 'Research and Recognition'},
            {id: 'appointments', title: 'Appointments'},
            {id: 'legal-and-financial', title: 'Legal and Financial'},
            {id: 'sources', title: 'Sources'},
        ];
        self.reportMetadata = ko.observable(params.report?.report_json);
        params.report.reportSpecification = reportSpecification;
        self.report = ko.observable(params.report);
        self.resource = ko.observable(self.reportMetadata()?.resource);
        self.resourceId = ko.observable(self.reportMetadata()?.resourceinstanceid);
        self.displayname = ko.observable(ko.unwrap(self.reportMetadata)?.displayname);
        self.activeSection = ko.observable('basic-info');
        self.names = ko.observableArray();
        self.formation = ko.observableArray();
        self.dissolution = ko.observableArray();
        self.researchNote = ko.observable(
            self.getNodeValue(self.resource(), 'research note', '@display_value')
        );
        // console.log(self.resource());
        // console.log(self.getNodeValue(self.resource(), 'research note', '@display_value'));
        self.reportSpecification = ko.observable(reportSpecification);
        self.contactPointsTable = {
            ...self.defaultTableConfig,
            columns: Array(3).fill(null)
        };
        self.nameTableConfig = {
            ...self.defaultTableConfig,
            columns: Array(3).fill(null)
        };
        self.formationTableConfig = {
            ...self.defaultTableConfig,
            columns: Array(2).fill(null)
        };
        self.dissolutionTableConfig = {
            ...self.defaultTableConfig,
            columns: Array(2).fill(null)
        };
        self.visible = {
            contactPoints: ko.observable(true),
            names: ko.observable(true),
            formation: ko.observable(true),
            dissolution: ko.observable(true)
        };
        self.sourceData = ko.observable({
            sections:
                [
                    {
                        title: 'References',
                        data: [{
                            key: 'source reference work',
                            value: self.getRawNodeValue(self.resource(), 'source'),
                            type: 'resource'
                        }]
                    }
                ]
        });
        self.nameDataConfig = {
            name: undefined,
        };
        self.documentationDataConfig = {
            subjectOf: undefined
        };
        self.locationDataConfig = {
            nationalGrid: undefined,
            locationDescription: undefined,
            administrativeAreas: undefined,
            geometry: undefined
        };
        self.addressesDataConfig = {
            citation: 'bibliographic source citation'
        };
        self.resourceDataConfig = {
            files: 'digital file(s)',
            archive: undefined,
            actors: undefined
        };
        self.nameCards = {};
        self.addressesCards = {};
        self.locationCards = {};
        self.documentationCards = {};
        self.existenceCards = {};
        self.resourcesCards = {};
        self.communicationCards = {};
        self.eventCards = {};
        self.contactCards = {};
        self.imagesCards = {};
        self.relationshipsCards = {};
        self.summary = params.summary;
        self.cards = {};
        if(params.report.cards){
            const cards = params.report.cards;
            self.cards = self.createCardDictionary(cards);
            self.nameCards = {
                name: self.cards?.['name of organisation'],
                externalCrossReferences: self.cards?.['external cross references'],
                systemReferenceNumbers: self.cards?.['system reference numbers'],
            };
            self.addressesCards = {
                addresses: self.cards?.['addresses'],
                citation: self.cards?.['bibliographic source citation']
            };
            self.documentationCards = {
                digitalReference: self.cards?.['digital reference for organisation'],
            };
            self.communicationCards = {
                contactPoints: self.cards?.['contact information for organisation'],
            };
            self.imagesCards = {
                images: self.cards?.['images']
            };
            self.relationshipsCards = {
                relationships: self.cards?.['relationships']
            };
            self.locationCards = {
                cards: self.cards,
                location: {
                    card: null,
                    subCards: {
                        addresses: 'addresses'
                    }
                }
            };
            self.contactCards = {
                contact: self.cards?.['contact details']
            };
            self.resourcesCards = {
                activities: self.cards?.['associated activities'],
                consultations: self.cards?.['associated consultations'],
                files: self.cards?.['associated digital file(s)'],
                assets: self.cards?.['associated monuments, areas and artefacts']
            };
        }
        const nameNode = [
            "Simon ID",
            "Organisation Name",
            "Alternative Organisation Name",
            "Organisation Type",
            "Organisation - VIAF Identifier",
            "Organisation - Wikidata Identifier",
            "Organisation - Worked For",
            "Associated Organisation"
        ].map(
            (field => {
                let node = self.getRawNodeValue(self.resource(), field);
                if (node) {
                    node.name = field;
                }
                return node;
            })
        ).filter(node => node); 
        const formationNode = [{
            title: "Formation",
            nestedFields: [
                "Founder Member(s)",
                "Constituent Organisation(s)",
                "Formation Date Value",
                "Formation Date Type",
                "Formation Date - Additional Notes ",
                "Formation Date Confidence Type",
                "Formation Date Confidence Probability Value",
                "Formation Date Confidence Note",
            ],
        }].map(
            (field => {
                let node = self.getRawNodeValue(self.resource(), field.title);
                if (node) {
                    node.name = field.title;
                    node.nestedFields = field.nestedFields;
                }
                return node;
            })
        ).filter(node => node); 
        const dissolutionNode = [{
            title: "Dissolution",
            nestedFields: [
                "Dissolution Date Value",
                "Dissolution Date Type",
                "Dissolution Date - Additional Notes",
                "Dissolution Date Confidence Type",
                "Dissolution Date Confidence Probability Value",
                "Dissolution Date Confidence Note",
                "Dissolution - Associated Legal Process",
            ],
        }].map(
            (field => {
                let node = self.getRawNodeValue(self.resource(), field.title);
                if (node) {
                    node.name = field.title;
                    node.nestedFields = field.nestedFields;
                }
                return node;
            })
        ).filter(node => node); 
        const flattenObject = function(name, objectToBeFlattened) {
            const flattened = {};
            if (objectToBeFlattened) {
                Object.assign(flattened, objectToBeFlattened);
            }
            const addNode = function(node) {
                Object.entries(node)
                    .filter(item => (!item[0].startsWith("@") && typeof item[1] == "object" && item[1]["@node_id"]))
                    .forEach(subnode => {
                        flattened[subnode[0]] = subnode[1];
                        addNode(subnode[1]);
                    });
            };
            Object.values(flattened).forEach(addNode);
            // console.log('this the flattened');
            // console.log(flattened);
            const ordered = Object.entries(flattened)
                .map((item) => {
                    // console.log('item 0');
                    // console.log(item[0]);
                    // console.log(self.reportSpecification().indexOf(item[1]["@node_id"]));
                    return {
                        key: item[0],
                        value: (item[1]["@display_value"] !== "NON_DATA_COLLECTING_NODE") ? item[1]["@display_value"] : "",
                        _order: self.reportSpecification().indexOf(item[1]["@node_id"])
                    };
                })
                .filter(item => item._order >= 0)
                .sort((i1, i2) => (i1._order - i2._order));
            // console.log('this the ordered');
            // console.log(ordered);
            return {
                name: name,
                visible: ko.observable(false),
                fields: ordered
            };
        };
        const flattenNestedObject = function(objectToBeFlattened) {
            let arrayOfObj = [];
            objectToBeFlattened.forEach(node => {
                let name = self.getNodeValue(node, '@display_value');
                let nameUseType = self.getNodeValue(node, 'name');
                const tileId = self.getTileId(node);
                const flatObject = flattenObject(nameUseType, node);
                if(flatObject.fields.length > 0){
                    flatObject.fields.forEach(flattenedValue => {
                        if(node.nestedFields.includes(flattenedValue.key)){
                            name = flattenedValue.value;
                            nameUseType = flattenedValue.key;
                            arrayOfObj.push({ name, nameUseType, tileId });
                        }
                    });
                }
            });
            return arrayOfObj;
        };
        // console.log(self.resource());
        
        if(Array.isArray(nameNode)){
            //loop through namenode instead of map
            self.names(nameNode.map(node => {
                let name = self.getNodeValue(node, '@display_value');
                let nameUseType = self.getNodeValue(node, 'name');
                const tileId = self.getTileId(node);
                const flatObject = flattenObject(nameUseType, node);
                // console.log(flatObject);
                // console.log(node);
                // console.log(nameUseType);
                if(flatObject.fields.length > 0){
                    name = flatObject.fields[0].value;
                    nameUseType = flatObject.fields[0].key;
                }
                return { name, nameUseType, tileId };
            }));
        }
        if(Array.isArray(formationNode)){
            const flattenedObject = flattenNestedObject(formationNode);
            self.formation(flattenedObject);
        }
        if(Array.isArray(dissolutionNode)){
            const flattenedObject = flattenNestedObject(dissolutionNode);
            self.dissolution(flattenedObject);
        }
        self.lifeData = ko.observable({
            sections:
                [
                    {
                        title: 'Birth',
                        data: [{
                            key: 'Date',
                            value: self.getNodeValue(self.resource(), 'birth', 'birth time span', 'date of birth'),
                            type: 'kv',
                            card: self.cards?.birth
                        },{
                            key: 'Mother',
                            value: self.getRawNodeValue(self.resource(), 'birth', 'mother'),
                            type: 'resource',
                            card: self.cards?.birth
                        },{
                            key: 'Father',
                            value: self.getRawNodeValue(self.resource(), 'birth', 'father'),
                            type: 'resource',
                            card: self.cards?.birth
                        },{
                            key: 'Place',
                            value: self.getNodeValue(self.resource(), 'birth', 'place of birth', 'birthplace', 'birth place'),
                            type: 'kv',
                            card: self.cards?.birth
                        }]
                    },
                    {
                        title: 'Death',
                        data: [{
                            key: 'Date',
                            value: self.getNodeValue(self.resource(), 'death', 'death time span', 'date of death'),
                            type: 'kv',
                            card: self.cards?.birth
                        },{
                            key: 'Place',
                            value: self.getNodeValue(self.resource(), 'death', 'place of death', 'deathplace', 'death place'),
                            type: 'kv',
                            card: self.cards?.birth
                        }]
                    }
                ]
        });
    },
    template: organisationReportTemplate
});
