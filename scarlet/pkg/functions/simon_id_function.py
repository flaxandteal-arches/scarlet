from arches.app.functions.base import BaseFunction
from django.db.models import Max
from django.db.models.expressions import RawSQL
from arches.app.models.resource import Resource
from arches.app.models.tile import Tile
import datetime

# ResourceInstance - arches/arches/app/models/models.py
# an example of post_save() - arches/arches/app/models/tile.py

PERSON_GRAPH_ID = "16fef9f0-10e5-4f4e-bc17-d0125cf54741"

SIMON_ID_NODEGROUP = {
    "16fef9f0-10e5-4f4e-bc17-d0125cf54741": "c4bad66a-f3f7-11ed-bf80-114c466094e0",
    "df15d072-2b97-42eb-adff-a4262a0afd2b": "2123476d-9af6-4bbc-84e1-2f632dfec4fb"
}
SIMON_ID_NUMBER_NODE = {
    "16fef9f0-10e5-4f4e-bc17-d0125cf54741": "c4bad66a-f3f7-11ed-bf80-114c466094e0",
    "df15d072-2b97-42eb-adff-a4262a0afd2b": "2123476d-9af6-4bbc-84e1-2f632dfec4fb"
}

details = {
    "functionid": "4fc50cfb-efa8-4b9f-a95d-12247211f8bd",
    "name": "Simon ID",
    "type": "node",
    "description": "Automatically generates a new Simon ID after checking the database",
    "defaultconfig": {
    },
    "classname": "SimonIDFunction",
    "component": "",
}


# Simon ID should be auto incrementing integer starting at 20,001 and based a boolean checkbox
def get_latest_simon_id():
    latest_simon_id = 20000
    latest_tile = None
    for graph_id, simon_id_number_node in SIMON_ID_NUMBER_NODE.items():
            #     .exclude(resourceinstanceid=license_instance_id).latest('createdtime')
        try:
            # latest_simon_id = Resource.objects \
            #     .filter(graph_id=LICENSE_GRAPH_ID) \
            latest_tile = Tile.objects.filter(nodegroup_id=simon_id_number_node).annotate(
                val=RawSQL("((tiledata->>%s)::numeric)", (simon_id_number_node,))
            ).aggregate(max=Max('val'))
        except Resource.DoesNotExist:
            pass

        if latest_tile and (max_id := latest_tile.get("max")):
            latest_simon_id = max(latest_simon_id, int(max_id))

    return latest_simon_id

    # resource_instance_id = str(latest_license.resourceinstanceid)
    # latest_license_number_tile = Tile.objects.filter(resourceinstance_id=resource_instance_id,
    #                                                  nodegroup_id=EXTERNAL_REF_NODEGROUP,
    #                                                  data__contains={
    #                                                      # Check external reference source for 'Excavation'
    #                                                      EXTERNAL_REF_SOURCE_NODE: '9a383c95-b795-4d76-957a-39f84bcee49e'
    #                                                  }).first()

    # license_number = latest_license_number_tile.data.get(
    #     EXTERNAL_REF_NUMBER_NODE).get('en').get('value').split('/')
    # return {
    #     'year': license_number[1],
    #     'index': int(license_number[2])
    # }


def generate_simon_id(simon_id_nodegroup, simon_id_number_node, license_instance_id, attempts=0):
    if attempts >= 5:
        raise Exception(
            'After 5 attempts, it wasn\'t possible to generate a license number that was unique!')

    def retry():
        nonlocal attempts, license_instance_id
        attempts += 1
        return generate_simon_id(simon_id_nodegroup, simon_id_nodegroup, license_instance_id, attempts)

    simon_id_tile = None
    try:
        simon_id_tile = Tile.objects.filter(resourceinstance_id=license_instance_id,
                                           nodegroup_id=simon_id_nodegroup).first()
    except Exception as e:
        print('Failed checking if Simon ID tile already exists!')
        return retry()

    if simon_id_tile:
        return

    latest_simon_id = None
    try:
        latest_simon_id = get_latest_simon_id()
    except Exception as e:
        print("Failed getting the previously used Simon ID number: ", e)
        return retry()

    # If we are on a new year then we reset back to 1
    simon_id = latest_simon_id + 1

    simon_id_tile = None
    try:
        # Runs a query searching for an external reference tile with the new license ID
        simon_id_tile = Tile.objects.filter(nodegroup_id=simon_id_nodegroup,
                                           data__contains={
                                               simon_id_number_node: simon_id,
                                           }).first()
    except Exception as e:
        print("Failed validating Simon ID: ", e)
        return retry()

    if simon_id_tile:
        return retry()

    print(f"Simon ID is unique: {simon_id}")
    return simon_id


class SimonIDFunction(BaseFunction):
    def post_save(self, tile, request, context):
        resource_instance_id = str(tile.resourceinstance.resourceinstanceid)
        resource = Resource.objects.get(pk=resource_instance_id)
        simon_id_nodegroup = SIMON_ID_NODEGROUP[str(resource.graph_id)]
        simon_id_number_node = SIMON_ID_NUMBER_NODE[str(resource.graph_id)]
        simon_id = generate_simon_id(simon_id_nodegroup, simon_id_number_node, resource_instance_id)

        if not simon_id or not resource:
            return
        
        try:
            simon_id_tile = Tile.objects.get(
                resourceinstance_id=resource_instance_id,
                nodegroup_id=simon_id_nodegroup,
            )
        except Tile.DoesNotExist:
            simon_id_tile = None

        # only assign a simonid if it doesn't exist already
        if not simon_id_tile:
            try:
                # Configure the Simon ID
                simon_id_tile = Tile.objects.get_or_create(
                    resourceinstance_id=resource_instance_id,
                    nodegroup_id=simon_id_nodegroup,
                    data={
                        simon_id_number_node: simon_id,
                    }
                )
                # Configure the Simon ID with the number included
                simon_id_tile =Tile.objects.get_or_create(
                    resourceinstance_id=resource_instance_id,
                    nodegroup_id=simon_id_nodegroup,
                    data={
                        simon_id_number_node: simon_id
                    }
                )
            except Exception as e:
                print("Failed saving Simon ID number: ", e)
                raise e

        return
