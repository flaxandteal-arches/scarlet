'''
ARCHES - a program developed to inventory and manage immovable cultural heritage.
Copyright (C) 2013 J. Paul Getty Trust and World Monuments Fund

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
'''

import os
import sys
import inspect
from collections import UserList
path = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))

if path not in sys.path:
    sys.path.append(path)

# reverting back to the old style of setting the DJANGO_SETTINGS_MODULE env variable
# refer to the following blog post under the heading "Leaking of process environment variables."
# http://blog.dscpl.com.au/2012/10/requests-running-in-wrong-django.html
os.environ['DJANGO_SETTINGS_MODULE'] = "scarlet.settings"

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

from arches.app.models.system_settings import settings
settings.update_from_db()

import arches_orm.arches_django
from arches_orm import add_hooks
from arches_orm.models import Person
from arches_orm.models import Organisation
from arches_orm.adapter import get_adapter
from arches.app.models.models import Node
get_adapter().config["suppress-tile-loading-errors"] = True
add_hooks()

REVERSE_MAPPING_ORG = {
    "da2eb0c1-e7b1-47cb-8f39-700f5fc8a419": {
        "at_address": "involved_occupant_s_"
    },
    "bbd6166a-d895-4deb-90f5-a2107e3a58e1": {
        "apprenticeship": "apprenticeship_involved_guild"
    },
    "3ed4cc47-c967-48e4-92d6-3acceb586467": {
        "education": "education_provider"
    },
    "bd95223f-ccd8-4b87-b582-5975fbe25c04": {
        "employment": "employer"
    },
    "139a6ee5-cc4f-49e1-9618-f982f0ee5198": {
        "membership": "member_of_organisation"
    },
    "ef80a7e9-a85a-45a5-90cc-23d493d0019d": {
        "management": "managed_organisation"
    },
    "a939c5db-9267-47e1-a8fa-db21af722c43": {
        "ownership_as_owner": "owner",
        "ownership_as_owned": "owned"
    },
    "4a4f4c04-35a5-4e8c-82d7-203e8e5dd048": {
        "takeover": "took_over",
        "takeover_by": "taken_over_by"
    },
    "7e3950db-e847-4f90-ac8c-f2e12ddea3dd": {
        "legal_process_as_prosecutor": "prosecutor",
        "legal_process_as_petitioner": "petitioner",
        "legal_process_as_sued_party": "sued",
        "legal_process_as_suer": "suer"
    },
    "32f7e6d9-2911-40ab-8147-db6645f1422e": {
        "inventing": "inventor"
    },
    "eaa03b9b-a67c-4fa0-b474-961af4136375": {
        "patenting": "patented_by"
    },
    "42296fdb-0e83-45c1-b462-ac78c35b4f71": {
        "advertising": "advertised_maker"
    },
    "9ef79519-0b47-42fe-b66c-3879bfa9666b":{
        "producing_as_producer":"producer",
        "producing_as_designer":"produced_objects_by",
        "producing_as_intended_recipient":"produced_objects_for"
    },
    "1af8df78-4306-4954-a2c9-40050dbad8af":{
        "agenting_as_agent":"agent",
        "agenting_as_client":"client"
    },
    "b7a5c070-afe5-4a2b-802b-48b8f85e354b":{
        "selling_as_seller":"sold_by",
        "selling_as_recepient":"sold_to",
        "selling_as_producer":"sold_object_s_by"
    },
    "6cdfce15-09ad-46be-bffa-23c113be1c09":{
        "supplying_as_supplier":"supplied_by",
        "supplying_as_recipient":"supplied_to",
        "supplying_as_producer":"supplied_object_s_produced_by"
    },
    "a44d544f-fcb7-4e84-be6a-fef3a2d97192":{
        "exporting_as_exported_by":"exported_by",
        "exporting_as_exported_to":"exported_to"
    },
    "142e15e7-73f9-11ee-906b-63b45ef4509d":{
        "importing_as_recipient":"imported_by",
        "importing_as_supplier":"imported_from"
    },
    "bea79143-c7cb-442a-8bf7-84dde201ad34":{
        "expedition": "expedition_carried_out_by"
    },
    "9207c09b-023e-42c6-9b30-051ac9279055":{
        "exhibition": "exhibited_work_by"
    },
    "317b11aa-6069-4fc3-a326-c36d0fad4c69":{
        "survey": "survey_carried_out_by"
    },
    "3af5f01d-7d9f-4259-9201-0c882ac70183":{
        "award_as_awarded_to": "awarded_to",
        "award_as_awarded_by": "awarded_by"
    },
    "78dbd0df-288f-4896-9c93-a91719f73381":{
        "business_appointment_maker_appointed": "business_appointment_-_maker_appointed",
        "business_appointment_made_by": "business_appointment_made_by"
    },
    "0ee9c9aa-94b2-476b-bc18-b077c41418cc":{
        "royal_appointment_maker_appointed": "royal_appointment_-_maker_appointed",
        "royal_appointment_made_by": "royal_appointment_made_by"
    },
    "0adece94-7565-402a-b211-68e83ca85dd6": {
        "organisation_documented_in_source":"addressee"
    }
}
FORWARD_MAPPING_ORG = {}
for graph, mappings in REVERSE_MAPPING_ORG.items():
    FORWARD_MAPPING_ORG[graph] = {
        value: key for key, value in mappings.items()
    }
    
REVERSE_MAPPING = {
    "f048673a-903f-4665-a334-18efabbbe981": {
        "marriage": "spouse"
    },
    "da2eb0c1-e7b1-47cb-8f39-700f5fc8a419": {
        "at_address": "involved_occupant_s_"
    },
    "bbd6166a-d895-4deb-90f5-a2107e3a58e1": {
        "apprenticeship_as_apprentice": "apprentice",
        "apprenticeship_as_master": "master"
    },
    "3ed4cc47-c967-48e4-92d6-3acceb586467": {
        "education_as_educated_person": "educated_person",
        "education_as_educator": "educator"
    },
    "bd95223f-ccd8-4b87-b582-5975fbe25c04": {
        "employment_as_employee": "employee",
        "employment_as_employer": "employer"
    },
    "139a6ee5-cc4f-49e1-9618-f982f0ee5198": {
        "membership": "member"
    },
    "ef80a7e9-a85a-45a5-90cc-23d493d0019d": {
        "management": "manager"
    },
    "a939c5db-9267-47e1-a8fa-db21af722c43": {
        "ownership": "owner"
    },
    "4a4f4c04-35a5-4e8c-82d7-203e8e5dd048": {
        "takeover": "taken_over_by"
    },
    "7e3950db-e847-4f90-ac8c-f2e12ddea3dd": {
        "legal_process_as_prosecutor": "prosecutor",
        "legal_process_as_petitioner": "petitioner",
        "legal_process_as_sued_party": "sued",
        "legal_process_as_suer": "suer"
    },
    "32f7e6d9-2911-40ab-8147-db6645f1422e": {
        "inventing": "inventor"
    },
    "eaa03b9b-a67c-4fa0-b474-961af4136375": {
        "patenting": "patented_by"
    },
    "42296fdb-0e83-45c1-b462-ac78c35b4f71": {
        "advertising": "advertised_maker"
    },
    "9ef79519-0b47-42fe-b66c-3879bfa9666b":{
        "producing_as_producer":"producer",
        "producing_as_designer":"produced_objects_by",
        "producing_as_intended_recipient":"produced_objects_for"
    },
    "1af8df78-4306-4954-a2c9-40050dbad8af":{
        "agenting_as_agent":"agent",
        "agenting_as_client":"client"
    },
    "b7a5c070-afe5-4a2b-802b-48b8f85e354b":{
        "selling_as_seller":"sold_by",
        "selling_as_recepient":"sold_to",
        "selling_as_producer":"sold_object_s_by"
    },
    "6cdfce15-09ad-46be-bffa-23c113be1c09":{
        "supplying_as_supplier":"supplied_by",
        "supplying_as_recipient":"supplied_to",
        "supplying_as_producer":"supplied_object_s_produced_by"
    },
    "a44d544f-fcb7-4e84-be6a-fef3a2d97192":{
        "exporting_as_exported_by":"exported_by",
        "exporting_as_exported_to":"exported_to"
    },
    "142e15e7-73f9-11ee-906b-63b45ef4509d":{
        "importing_as_recipient":"imported_by",
        "importing_as_supplier":"imported_from"
    },
    "bea79143-c7cb-442a-8bf7-84dde201ad34":{
        "expedition": "expedition_carried_out_by"
    },
    "317b11aa-6069-4fc3-a326-c36d0fad4c69":{
        "survey": "survey_carried_out_by"
    },
    #Chronometer trial relates to person trough expedition so its not possible to relate it through here
    "9207c09b-023e-42c6-9b30-051ac9279055":{
        "exhibition": "exhibited_work_by"
    },
    "3af5f01d-7d9f-4259-9201-0c882ac70183":{
        "award_as_awarded_to": "awarded_to",
        "award_as_awarded_by": "awarded_by"
    },
    "78dbd0df-288f-4896-9c93-a91719f73381":{
        "business_appointment_maker_appointed": "business_appointment_-_maker_appointed",
        "business_appointment_made_by": "business_appointment_made_by"
    },
    "0ee9c9aa-94b2-476b-bc18-b077c41418cc":{
        "royal_appointment_made_by": "royal_appointment_made_by",
        "royal_appointment_maker_appointed": "royal_appointment_-_maker_appointed"
    },
    "0adece94-7565-402a-b211-68e83ca85dd6": {
        "documented_in":"addressee"
    }
}
FORWARD_MAPPING = {}
for graph, mappings in REVERSE_MAPPING.items():
    FORWARD_MAPPING[graph] = {
        value: key for key, value in mappings.items()
    }

def person_related_to(sender, resource_instance_to, resource_instance_from, relationship, tile, nodeid, reason, **kwargs):
    if reason == "relationship saved":
        add_not_remove = True
    elif reason == "relationship deleted":
        add_not_remove = False
    else:
        return
    if resource_instance_from and nodeid and nodeid in resource_instance_from._._node_objects():
        node = resource_instance_from._._node_objects()[nodeid]
        if(resource_instance_from is not None and hasattr(resource_instance_to._, 'graphid')):
            if (forward_alias := FORWARD_MAPPING.get(resource_instance_from._.graphid, {}).get(node.alias, None)):
                person_to_values = getattr(resource_instance_to, forward_alias)
                missing = True
                if person_to_values:
                    if not isinstance(person_to_values, UserList):
                        values = [person_to_values]
                    else:
                        values = person_to_values

                    for person_to_value in values:
                        if not isinstance(person_to_value, UserList):
                            person_to_value = [person_to_value]
                        for event in person_to_value:
                            if event.id == resource_instance_from._.resourceinstanceid:
                                missing = False
                                if not add_not_remove:
                                    event.remove()
                if missing and add_not_remove:
                    person_to_values.append(resource_instance_from)
                    resource_instance_to.save()
        

def person_related_from(sender, resource_instance_to, resource_instance_from, relationship, tile, nodeid, reason, **kwargs):
    if reason == "relationship saved":
        add_not_remove = True
    elif reason == "relationship deleted":
        add_not_remove = False
    else:
        return
    if resource_instance_from and nodeid and nodeid in resource_instance_from._._node_objects():
        node = resource_instance_from._._node_objects()[nodeid]
        if(resource_instance_to is not None and hasattr(resource_instance_to._, 'graphid')):
            if (reverse_alias := REVERSE_MAPPING.get(resource_instance_to._.graphid, {}).get(node.alias, None)):
                resource_instance_to_values = getattr(resource_instance_to, reverse_alias)
                missing = True
                if resource_instance_to_values:
                    if not isinstance(resource_instance_to_values, UserList):
                        values = [resource_instance_to_values]
                    else:
                        values = resource_instance_to_values

                    for person_to_value in values:
                        if not isinstance(person_to_value, UserList):
                            person_to_value = [person_to_value]
                        for individual in person_to_value:
                            if individual.id == resource_instance_from._.resourceinstanceid:
                                missing = False
                                if not add_not_remove:
                                    individual.remove()
                    if missing and add_not_remove:
                        resource_instance_to_values.append(resource_instance_from)
                        resource_instance_to.save()
                else:
                    setattr(resource_instance_to, reverse_alias, [resource_instance_from])
                    resource_instance_to.save()


def  organisation_related_to(sender, resource_instance_to, resource_instance_from, relationship, tile, nodeid, reason, **kwargs):
    if reason == "relationship saved":
        add_not_remove = True
    elif reason == "relationship deleted":
        add_not_remove = False
    else:
        return
    if resource_instance_from and nodeid and nodeid in resource_instance_from._._node_objects():
        node = resource_instance_from._._node_objects()[nodeid]
        if(resource_instance_from is not None and hasattr(resource_instance_to._, 'graphid')):
            if (forward_alias := FORWARD_MAPPING_ORG.get(resource_instance_from._.graphid, {}).get(node.alias, None)):
                organisation_to_values = getattr(resource_instance_to, forward_alias)
                missing = True
                if organisation_to_values:
                    if not isinstance(organisation_to_values, UserList):
                        values = [organisation_to_values]
                    else:
                        values = organisation_to_values

                    for person_to_value in values:
                        if not isinstance(person_to_value, UserList):
                            person_to_value = [person_to_value]
                        for event in person_to_value:
                            if event.id == resource_instance_from._.resourceinstanceid:
                                missing = False
                                if not add_not_remove:
                                    event.remove()
                if missing and add_not_remove:
                    organisation_to_values.append(resource_instance_from)
                    resource_instance_to.save()
        

def organisation_related_from(sender, resource_instance_to, resource_instance_from, relationship, tile, nodeid, reason, **kwargs):
    if reason == "relationship saved":
        add_not_remove = True
    elif reason == "relationship deleted":
        add_not_remove = False
    else:
        return
    if resource_instance_from and nodeid and nodeid in resource_instance_from._._node_objects():
        node = resource_instance_from._._node_objects()[nodeid]
        if(resource_instance_to is not None and hasattr(resource_instance_to._, 'graphid')):
            if (reverse_alias := REVERSE_MAPPING_ORG.get(resource_instance_to._.graphid, {}).get(node.alias, None)):
                resource_instance_to_values = getattr(resource_instance_to, reverse_alias)
                missing = True
                if resource_instance_to_values:
                    if not isinstance(resource_instance_to_values, UserList):
                        values = [resource_instance_to_values]
                    else:
                        values = resource_instance_to_values

                    for person_to_value in values:
                        if not isinstance(person_to_value, UserList):
                            person_to_value = [person_to_value]
                        for individual in person_to_value:
                            if individual.id == resource_instance_from._.resourceinstanceid:
                                missing = False
                                if not add_not_remove:
                                    individual.remove()
                    if missing and add_not_remove:
                        resource_instance_to_values.append(resource_instance_from)
                        resource_instance_to.save()
                else:
                    setattr(resource_instance_to, reverse_alias, [resource_instance_from])
                    resource_instance_to.save()

# If it is a delete, how should we make sure that we have the nodeid?
Person.post_related_from.connect(person_related_from)
Person.post_related_to.connect(person_related_to)

Organisation.post_related_from.connect(organisation_related_from)
Organisation.post_related_to.connect(organisation_related_to)

from django.dispatch import receiver
from django.db.models.signals import post_delete, post_save
from arches.app.models.models import ResourceXResource, ResourceInstance, GraphModel
