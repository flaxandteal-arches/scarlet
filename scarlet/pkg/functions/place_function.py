import uuid
import json
from arches.app.functions.base import BaseFunction
from arches.app.models import models
from arches.app.models import resource
from arches.app.models.tile import Tile
from arches.app.models.resource import Resource
from arches.app.datatypes.datatypes import DataTypeFactory


details = {
    'name': 'Person-Place',
    'type': 'node',
    'description': 'Pulls places into person',
    'defaultconfig': {
    },
    'classname': 'PlaceFunction',
    'component': '',
    'functionid':'fab429fe-fda1-44d2-8252-58966ebb24a5'
}

at_address_node_id = "4a14ef09-231d-4600-b732-1b9ab007f5b4"
occupied_address_node_id = "5ae2ee5e-ea7d-11ed-bf80-114c466094e0"
associated_place_node_id = "e14940b2-beba-11ee-9362-0242ac140003"
place_graph_id = "8ed71388-3bdd-4e05-b9ec-19c341604480"
at_address_graph_id = "da2eb0c1-e7b1-47cb-8f39-700f5fc8a419"
geocoded_place_node_id = "e6f58bba-ea7b-11ed-bf80-114c466094e0"

class PlaceFunction(BaseFunction): 

    def post_save(self, tile, request, context=None):
        if tile.data is not None:
            if at_address_node_id in list(tile.data.keys()):
                resource_instance_id = str(tile.resourceinstance.resourceinstanceid)
                resource = Resource.objects.get(pk=resource_instance_id)
                related_resources = resource.get_related_resources(user=True)
                places = {str(rel["resourceinstanceid"]): rel for rel in related_resources["related_resources"] if str(rel["graph_id"]) == place_graph_id}
                at_addresses = {str(rel["resourceinstanceid"]): rel for rel in related_resources["related_resources"] if str(rel["graph_id"]) == at_address_graph_id}
                address_places = set()
                for at_address_id, at_address in at_addresses.items():
                    address_relationships = sum([
                        tile["data"][occupied_address_node_id] for tile in at_address["tiles"]
                        if tile["data"] and occupied_address_node_id in tile["data"]
                    ], [])
                    addresses = [
                        rel["resourceId"] for rel in address_relationships
                        if "resourceId" in rel
                    ]
                    for address in addresses:
                        for tile in Tile.objects.filter(
                            resourceinstance_id=address,
                            nodegroup_id=geocoded_place_node_id
                        ).all():
                            if (tiledata := tile.data.get(geocoded_place_node_id)):
                                for datum in tiledata:
                                    if "resourceId" in datum:
                                        address_places.add(datum["resourceId"])
                place_tile, created = Tile.objects.get_or_create(
                    resourceinstance_id=resource_instance_id,
                    nodegroup_id=associated_place_node_id,
                    defaults={"data": {}}
                )
                old_places = set()
                updated_places = []
                if place_tile.data and (tiledata := place_tile.data.get(associated_place_node_id)):
                    for datum in tiledata:
                        if "resourceId" in datum:
                            old_places.add(str(datum["resourceId"]))
                            if datum["resourceId"] in address_places:
                                updated_places.append(datum)
                for place in (address_places - old_places):
                    updated_places.append({
                        "resourceId": place,
                        "ontologyclass": "http://www.toolsofknowledge.org/SIMEOn#Place",
                    })
                place_tile.data[associated_place_node_id] = updated_places
                place_tile.save()
