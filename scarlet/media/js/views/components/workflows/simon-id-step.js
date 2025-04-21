define([
    'underscore',
    'knockout',
    'knockout-mapping',
    'uuid',
    'arches',
    'templates/views/components/plugins/simon-id-step.htm'
], function(_,ko, koMapping, uuid, arches, simonIdStep) {
    var viewModel = function(params) {
        this.simonId = localStorage.getItem('GENERATED_SIMON_ID');

        // make conditional 2123476d-9af6-4bbc-84e1-2f632dfec4fb
        this.SIMON_ID_NUMBER_NODE = "c4bad66a-f3f7-11ed-bf80-114c466094e0";
        const self = this;
        _.extend(this, params.form);
        self.tile().dirty.subscribe(function(val) {
            self.dirty(val);
        });
        self.pageVm = params.pageVm;
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

        if(self.componentData.parameters.graphid === 'df15d072-2b97-42eb-adff-a4262a0afd2b'){
            this.SIMON_ID_NUMBER_NODE = "2123476d-9af6-4bbc-84e1-2f632dfec4fb";
        }
        this.fetchSimonIdTile().then((simonIdTile) => {
            if (simonIdTile && simonIdTile.data && simonIdTile.data[this.SIMON_ID_NUMBER_NODE]) {
                this.simonId = simonIdTile.data[this.SIMON_ID_NUMBER_NODE];
                self.tile().tileid = simonIdTile.tileid;
            }

            self.simonIdRefNodeId = this.SIMON_ID_NUMBER_NODE;
            self.tile().data[self.simonIdRefNodeId](this.simonId);
        });
        params.form.save = async() => {
            // await self.tile().save(); // Resource ID has now been created and is in self.resourceId()

            params.form.savedData({
                tileData: koMapping.toJSON(self.tile().data),
                tileId: self.tile().tileid,
                resourceInstanceId: self.tile().resourceinstance_id,
                nodegroupId: self.tile().nodegroup_id,
            });
            params.form.complete(true);
            params.form.saving(false);
        };
    };

    return ko.components.register('simon-id-step', {
        viewModel: viewModel,
        template: simonIdStep
    });
});
