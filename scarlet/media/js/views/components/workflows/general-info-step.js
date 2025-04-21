define([
    'underscore',
    'knockout',
    'knockout-mapping',
    'uuid',
    'arches',
    'templates/views/components/plugins/simon-id-step.htm'
], function(_,ko, koMapping, uuid, arches, generalInfoStep) {
    var viewModel = function(params) {
        this.SIMON_ID_NUMBER_NODE = "c4bad66a-f3f7-11ed-bf80-114c466094e0";
        this.STEPS_LABEL = 'workflow-steps';
        this.WORKFLOW_COMPONENT_ABSTRACTS_LABEL = 'workflow-component-abstracts';

        this.simonId = localStorage.getItem('GENERATED_SIMON_ID');
        const self = this;
        _.extend(this, params.form);
        self.tile().dirty.subscribe(function(val) {
            self.dirty(val);
        });
        self.pageVm = params.pageVm;
        self.actResourceId = params.form.savedData()?.actResourceId;
        self.licenseNameTileId = params.form.savedData()?.licenseNameTileId;
        self.applicationId = '';
    
        self.simonIdRefNodeId = this.SIMON_ID_NUMBER_NODE;

        this.fetchTileData = async(resourceId, nodeId) => {
            const tilesResponse = await window.fetch(
                arches.urls.resource_tiles.replace('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', resourceId) +
                (nodeId ? `?nodeid=${nodeId}` : '')
            );
            const data = await tilesResponse.json();
            return data.tiles;
        };

        this.fetchSimonIdTile = async() => {
            const tiles = await this.fetchTileData(this.resourceId(), this.SIMON_ID_NUMBER_NODE);

            const matchingTiles = tiles.filter(tile => tile.nodegroup === this.SIMON_ID_NUMBER_NODE);

            if (matchingTiles.length) {
                return matchingTiles[0];
            }
        };

        this.storeSimonIdTile = (tile) => {
            const workflowSteps = JSON.parse(localStorage.getItem(this.STEPS_LABEL));
            if (!workflowSteps) {
                return;
            }
            const simonIdStepId = JSON.parse(workflowSteps['add-simon_id'].componentIdLookup)[
                'simon-id-step'
            ];

            const workflowComponentAbstracts = JSON.parse(
                localStorage.getItem(this.WORKFLOW_COMPONENT_ABSTRACTS_LABEL)
            );
            workflowComponentAbstracts[simonIdStepId] = {
                value: JSON.stringify({
                    tileData: koMapping.toJSON(tile.data),
                    resourceInstanceId: tile.resourceinstance,
                    tileId: tile.tileid,
                    nodegroupId: tile.nodegroup
                })
            };

            localStorage.setItem(
                this.WORKFLOW_COMPONENT_ABSTRACTS_LABEL,
                JSON.stringify(workflowComponentAbstracts)
            );
        };

        this.processSimonIdTile = async() => {
            const simonIdTile = await this.fetchSimonIdTile();
            if (!simonIdTile) return;

            //this.storeSimonIdTile(simonIdTile);

            // let simonId =
            //   simonId.data[this.EXTERNAL_REF_NUMBER_NODE];
        };

        params.form.save = async() => {
            await self.tile().save(); // Resource ID has now been created and is in self.resourceId()
            params.form.savedData({
                tileData: koMapping.toJSON(self.tile().data),
                tileId: self.tile().tileid,
                resourceInstanceId: self.tile().resourceinstance_id,
                nodegroupId: self.tile().nodegroup_id,
                actResourceId: self.actResourceId,
            });
            params.form.complete(true);
            params.form.saving(false);
            if(self.componentData.parameters.graphid === 'df15d072-2b97-42eb-adff-a4262a0afd2b'){
                this.SIMON_ID_NUMBER_NODE = "2123476d-9af6-4bbc-84e1-2f632dfec4fb";
            } 
            let generateSimonId = localStorage.getItem('GENERATE_SIMON_ID');
            if(generateSimonId === 'true'){
                await this.processSimonIdTile();
            } else{
                await makeSimonIdZero(self.resourceId());
            }

            if(self.componentData.parameters.graphid === '16fef9f0-10e5-4f4e-bc17-d0125cf54741'){
                const nodes = [
                    '04659e41-fa10-11ed-bf80-114c466094e0',
                    '9f79e557-f3fa-11ed-bf80-114c466094e0',
                    '9e0b24d4-fa0f-11ed-bf80-114c466094e0',
                    '6defb924-fa12-11ed-bf80-114c466094e0',
                    'a8d6aca3-fa11-11ed-bf80-114c466094e0',
                    '2155672a-fa13-11ed-bf80-114c466094e0',
                    '0f186cf8-f3f9-11ed-bf80-114c466094e0',
                    'dcc2016a-fa10-11ed-bf80-114c466094e0',
                    'd59128c5-fa0e-11ed-bf80-114c466094e0'
                ];
                nodes.forEach(async(node) => {
                    await saveField(node, self.resourceId());
                });
                                
            }
        };

        const makeSimonIdZero = async(actResourceId) => {
            const simonIdTile = await this.fetchSimonIdTile();
            simonIdTile['data'] = {
                [this.SIMON_ID_NUMBER_NODE]: 0
            };
            simonIdTile['resourceinstance_id'] = actResourceId;
            simonIdTile['nodegroup_id'] = this.SIMON_ID_NUMBER_NODE;

            delete simonIdTile['nodegroup'];
            delete simonIdTile['resourceinstance'];
      
            await window.fetch(
                arches.urls.api_tiles(simonIdTile['tileid']),
                {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(simonIdTile),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        };
    
        const saveField = async(nodeId, actResourceId) => {
            const licenseActivityTileTemplate = {
                tileid: '',
                data: {
                },
                nodegroup_id: nodeId,
                parenttile_id: null,
                resourceinstance_id: actResourceId,
                sortorder: 0
            };
      
            let id = uuid.generate();
      
            const licenseTile = await window.fetch(
                arches.urls.api_tiles(id),
                {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(licenseActivityTileTemplate),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
      
            if (licenseTile?.ok) {
                return licenseTile;
            }
        };
    };

    return ko.components.register('general-info-step', {
        viewModel: viewModel,
        template: generalInfoStep
    });
});
