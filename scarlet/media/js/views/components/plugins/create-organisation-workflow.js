import ko from 'knockout';
import $ from 'jquery';
import arches from 'arches';
import Workflow from 'viewmodels/workflow';
import quickResourceCreateWorkflowTemplate from 'templates/views/components/plugins/create-organisation-workflow.htm';
export default ko.components.register('create-organisation-workflow', {
    viewModel: function(params) {
        this.componentName = 'create-organisation-workflow';
        this.quitUrl = "/search";
        this.stepConfig = [
            {
                title: 'Initialize organisation',
                name: 'init-organisation',  /* unique to workflow */
                required: true,
                workflowstepclass: 'create-project-project-name-step',
                informationboxdata: {
                    heading: 'Initialize organisation here',
                    text: 'Begin by providing the surname of the organisation you are adding to the database.',
                },
                layoutSections: [
                    {
                        componentConfigs: [
                            {
                                componentName: 'general-info-step',
                                uniqueInstanceName: 'organisation-name', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '726a1d22-ea78-11ed-bf80-114c466094e0',
                                },
                            },
                        ], 
                    },
                ]
            },
            {
                title: 'Add general information',
                name: 'add-info-for-organisation',  /* unique to workflow */
                required: false,
                workflowstepclass: 'create-project-project-name-step',
                informationboxdata: {
                    heading: 'General information',
                    text: 'Provide the general information for the organisation',
                },
                layoutSections: [
                    {
                        componentConfigs: [
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-alternative-name', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '7fe3ac48-ea78-11ed-bf80-114c466094e0',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-org-type', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'a78c303a-ea78-11ed-bf80-114c466094e0',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-viaf-identifier', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '8e029b2c-ea78-11ed-bf80-114c466094e0',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-wikidata-identifier', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '99e650c8-ea78-11ed-bf80-114c466094e0',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-formation', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '10abeb3c-ea79-11ed-bf80-114c466094e0',
                                },
                            },
                            //TODO insert Formation Date here
                            // {
                            //     componentName: 'default-card',
                            //     uniqueInstanceName: 'resource-formation-date', /* unique to step */
                            //     tilesManaged: 'one',
                            //     parameters: {
                            //         resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                            //         graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                            //         nodegroupid: '1f4ab351-ea79-11ed-bf80-114c466094e0',
                            //         hiddenNodes: [
                            //             '1f4ab34f-ea79-11ed-bf80-114c466094e0',
                            //         ],
                            //     },
                            // },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-dissolution', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '662fb6ba-ea79-11ed-bf80-114c466094e0',
                                },
                            },
                            //TODO Add dissolution date
                            // {
                            //     componentName: 'default-card',
                            //     uniqueInstanceName: 'resource-dissolution-date', /* unique to step */
                            //     tilesManaged: 'one',
                            //     parameters: {
                            //         resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                            //         graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                            //         nodegroupid: '7b9bd358-ea79-11ed-bf80-114c466094e0',
                            //         // hiddenNodes: [
                            //         //     '7b9bd34f-ea79-11ed-bf80-114c466094e0',
                            //         // ],
                            //     },
                            // },
                        ]
                    },
                ]
            },
            {
                title: 'Add Simon Id',
                name: 'add-simon_id',  /* unique to workflow */
                required: false,
                layoutSections: [
                    {
                        componentConfigs: [
                            { 
                                componentName: 'simon-id-step',
                                uniqueInstanceName: 'simon-id-step',
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '2123476d-9af6-4bbc-84e1-2f632dfec4fb',
                                    prefilledNodes: [
                                        [
                                            '2123476d-9af6-4bbc-84e1-2f632dfec4fb'
                                        ]
                                    ]
                                }
                            }
                        ], 
                    },
                ],
            },
            {
                title: 'Relationships',
                name: 'add-info-for-organisation',  /* unique to workflow */
                required: false,
                workflowstepclass: 'create-project-project-name-step',
                informationboxdata: {
                    heading: 'Relationships',
                    text: 'Provide the relationships for the organisation',
                },
                layoutSections: [
                    {
                        componentConfigs: [
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-worked-for', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'f32f5314-ea78-11ed-bf80-114c466094e0',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-associated-organisations', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '669590c4-ea7a-11ed-bf80-114c466094e0',
                                },
                            },
                        ]
                    },
                ]
            },
            {
                title: 'Addresses',
                name: 'add-addresses-for-organisation',  /* unique to workflow */
                required: false,
                workflowstepclass: 'create-project-project-name-step',
                informationboxdata: {
                    heading: 'Addresses',
                    text: 'Provide the addresses for the organisation',
                },
                layoutSections: [
                    {
                        componentConfigs: [
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-at-address', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'b04441ca-c7f8-451e-b680-b9682c560de8',
                                },
                            },
                        ]
                    },
                ]
            },
            {
                title: 'Work Events',
                name: 'add-work-events-for-organisation',  /* unique to workflow */
                required: false,
                workflowstepclass: 'create-project-project-name-step',
                informationboxdata: {
                    heading: 'Work Events',
                    text: 'Provide the work events for the organisation',
                },
                layoutSections: [
                    {
                        componentConfigs: [
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-associated-apprenticeships', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'c4a7302e-242c-40d6-8733-b84bf71f0292',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-associated-education', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'ea1673d8-bf28-41f5-86d1-342bb95223c2',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-associated-employment', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'e31e5b32-b157-4184-9453-10cb2b30e78d',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-associated-memberships', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '1b5fd3ba-91d7-4fb9-b460-0df09fe8565d',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-associated-management', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'e305c54e-5c0e-411f-ad7f-02982d14be38',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-associated-ownership', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'ca4daf7d-4291-46ec-9a2a-8c82b1ae3e50',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-associated-ownership-as-owned', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'b2a0bace-9e71-45a9-8988-ee7d8a94be8a',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-associated-takeovers', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'b700b9fe-1ca2-49a3-96dc-02bd20bdd803',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-associated-takeovers-by', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'f20c4ada-edff-4b47-840f-e6ae5b04f5ad',
                                },
                            },
                        // {
                        //     componentName: 'default-card',
                        //     uniqueInstanceName: 'resource-working-start-date-value', /* unique to step */
                        //     tilesManaged: 'multiple',
                        //     parameters: {
                        //         resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                        //         graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                        //         nodegroupid: '9f79e55f-f3fa-11ed-bf80-114c466094e0',
                        //     },
                        // },
                        ]
                    }
                ]
            },
            {
                title: 'Productive Activity',
                name: 'add-productive-activity-for-organisation',  /* unique to workflow */
                required: false,
                workflowstepclass: 'create-project-project-name-step',
                informationboxdata: {
                    heading: 'Productive Activity',
                    text: 'Provide the productive activity for the organisation',
                },
                layoutSections: [
                    {
                        componentConfigs: [
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-inventing', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '162351b0-0d24-42e7-afb2-97ba7a2c238b',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-patenting', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '135d089d-d6ee-4315-8076-3863493281be',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-advertising', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '1224b379-ec15-4e58-b36b-464b511b6689',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-producing', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'bf786ba8-c899-4f6d-8caa-083912a459a0',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-producing-as-designer', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '02b3eee3-89e3-4bb6-9ead-47719d1191f6',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-producing-as-intended-recipient', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '46cf83e4-7d3a-4d61-9f6d-26702a13da20',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-agenting', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '2e1517fb-5129-4159-bcd3-c56852c45632',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-agenting-as-client', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '44f466e8-96a4-4457-b8d4-c1d2733a1aa2',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-selling', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '138f9ca0-5f7b-4070-b531-ee9098efd4d8',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-selling-recipient', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '8542a58a-a72a-4844-b893-5de9b5a2ed92',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-selling-producer', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '240c78ba-b38b-4cb8-8061-a8124880068d',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-supplying', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '5950ff27-2fbe-47a7-93ad-31ff94871797',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-supplying-recipient', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '12af47dc-3987-4936-b709-1af30f238291',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-supplying-producer', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '36471be0-1bb5-42d4-84e2-53a3ece4a23a',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-exporting', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '964e4476-d76d-42aa-9af0-fa50715f2cd1',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-exporting-expored-to', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'ac35120b-cbb0-402c-a50b-e63235265967',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-importing', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '87470b55-e8d9-45e6-a0e1-5eebb66df2d1',
                                },
                            }, 
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-importing-as-supplier', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '1918a3a3-f6dd-4309-93be-80b17617a51a',
                                },
                            },
                        ]
                    }
                ]
            },
            {
                title: 'Research And Recognition',
                name: 'add-research-and-recognition-for-organisation',  /* unique to workflow */
                required: false,
                workflowstepclass: 'create-project-project-name-step',
                informationboxdata: {
                    heading: 'Research And Recognition',
                    text: 'Provide the research and recognition events for the organisation',
                },
                layoutSections: [
                    {
                        componentConfigs: [
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-expedition', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'db48c5de-22fc-45ad-8ed1-f162654728f4',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-survey', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '3b4ab21d-0bbf-4315-bb43-54ecb3bb4a23',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-chronometer-trials', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '3ca68bc5-fd8d-4780-b920-3389a3a53fe9',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-work-exhibited', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'a07ec2ee-c86f-487c-8142-afd8ef5fbd15',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-awards', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'ef87f186-385a-42ba-8a31-1d2e237404f4',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-awards-awarded-by', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '17a4cae3-761f-4b57-b5fd-738376a3694e',
                                },
                            },
                        ]
                    }
                ]
            },
            {
                title: 'Appointments',
                name: 'add-appointments-for-organisation',  /* unique to workflow */
                required: false,
                workflowstepclass: 'create-project-project-name-step',
                informationboxdata: {
                    heading: 'Appointments',
                    text: 'Provide the appointments for the organisation',
                },
                layoutSections: [
                    {
                        componentConfigs: [
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-business-appointments', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'b1b5a3d1-eefb-4fd7-a346-964fa188374d',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-business-appointments-made-by', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'b0bb23b8-79ee-4f12-8f03-bfc4840b86fe',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-royal-appointments', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: 'a2d3e07c-71df-4042-869e-4431d74b57c7',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-royal-appointments-made-by', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '40adf94d-c7c1-47a4-82d1-3b80bb4506f0',
                                },
                            },
                        ]
                    }
                ]
            },
            {
                title: 'Legal and Sources',
                name: 'add-legal-sources-for-organisation',  /* unique to workflow */
                required: false,
                workflowstepclass: 'create-project-project-name-step',
                informationboxdata: {
                    heading: 'Legal and Sources',
                    text: 'Provide the legal and source events for the organisation',
                },
                layoutSections: [
                    {
                        componentConfigs: [
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-legal-process', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '0397da7d-78f1-4ee7-8e4b-e841beffb79f',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-legal-process-as-prosecutor', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '2996af2c-8891-4d6d-bff9-7ba95fde000b',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-legal-process-as-petitioner', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '8707232d-8919-4950-a99a-92ae94e9c2a2',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-legal-process-sued-party', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '1e334302-25cf-4c59-aed2-173e0e670ee7',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-legal-process-suer', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '543e84c9-d907-43da-b209-46c015a23c9c',
                                },
                            },
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'resource-source', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    resourceid: "['init-organisation']['organisation-name'][0]['resourceid']['resourceInstanceId']",
                                    graphid: 'df15d072-2b97-42eb-adff-a4262a0afd2b',
                                    nodegroupid: '830b564e-ea7a-11ed-bf80-114c466094e0',
                                },
                            },
                        ]
                    }
                ]
            },
            {
                title: 'Finish',
                name: 'add-resource-complete',  /* unique to workflow */
                description: 'Finish the resource creation.',
                layoutSections: [
                    {
                        componentConfigs: [
                            { 
                                componentName: 'final-step',
                                uniqueInstanceName: 'create-resource-final',
                                tilesManaged: 'none',
                                parameters: {
                                    resourceid: "['init-organisation']['resource-name'][0]['resourceInstanceId']",
                                },
                            },
                        ], 
                    },
                ],
            }
        ];
        Workflow.apply(this, [params]);
    },
    template: quickResourceCreateWorkflowTemplate,
});
