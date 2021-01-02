from rest_framework import serializers
from ..models._userDjEx import UserDjEx
from content_phylums.models._phylum_tag import Phylum_Tag

from ..models.junct_tag_user import Junct_PhylumTag_User


def Serialize_Tags(phylum, tag_owner_id, char_tag_list):

    old_owners_tags = Junct_PhylumTag_User.objects.filter(
        tagged_user=tag_owner_id)

    tags_list = []
    for item in char_tag_list.split(","):
        tags_list.append(item)
    # print("List:_________", tags_list)

    # Remove Orphaned Tags
    for tag in old_owners_tags:
        TAG_NAME = tag.user_phylum_tag.name

        if TAG_NAME in tags_list:
            tags_list.remove(TAG_NAME)
            # print("________________KEEP_______", TAG_NAME)
        else:
            tag.delete()

    # Create Adopted Tags
    for tag_name in tags_list:
        # print("________________MAKE_______", tag_name)
        S = UserDjEx.objects.get(id=tag_owner_id)
        DO = Phylum_Tag.objects.get(name=tag_name)

        Junct_PhylumTag_User.objects.create(
            tagged_user=S, user_phylum_tag=DO)


# class User_Owner_SerializerField(serializers.Field):
#     def to_representation(self, obj):
#         # try:
#         return obj.id
#         # except:
#         # return obj.username

#     def to_internal_value(self, id):
#         return UserDjEx.objects.get(id=id)
