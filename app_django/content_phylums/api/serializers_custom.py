from rest_framework import serializers
from ..models._format import Format
from ..models._phylum_tag import Phylum_Tag
from django.core.files.base import ContentFile
from content_users.models._userDjEx import UserDjEx


def Serialize_Tags(phylum, tag_owner_id, char_tag_list):
    from .serializers_dict import Dicts

    old_owners_tags = Dicts.Junct_Tag(phylum).objects.filter(
        Dicts.Junct_Tag_Q_S(phylum, tag_owner_id))

    tags_list = []
    for item in char_tag_list.split(","):
        tags_list.append(item)
    # print("List:_________", tags_list)

    # Remove Orphaned Tags
    for tag in old_owners_tags:
        TAG_NAME = ""

        if phylum == "user":
            TAG_NAME = tag.user_phylum_tag.name
        elif phylum == "ccpick":
            TAG_NAME = tag.ccpick_phylum_tag.name
        elif phylum == "deck":
            TAG_NAME = tag.deck_phylum_tag.name
        elif phylum == "groupdeck":
            TAG_NAME = tag.groupdeck_phylum_tag.name
        elif phylum == "note":
            TAG_NAME = tag.note_phylum_tag.name
        elif phylum == "format":
            TAG_NAME = tag.format_phylum_tag.name

        if TAG_NAME in tags_list:
            tags_list.remove(TAG_NAME)
            # print("________________KEEP_______", TAG_NAME)
        else:
            tag.delete()

    # Create Adopted Tags
    for tag_name in tags_list:
        # print("________________MAKE_______", tag_name)
        S = Dicts.Phylum(phylum).objects.get(id=tag_owner_id)
        DO = Phylum_Tag.objects.get(name=tag_name)

        if phylum == "user":
            Dicts.Junct_Tag(phylum).objects.create(
                tagged_user=S, user_phylum_tag=DO)
        elif phylum == "ccpick":
            Dicts.Junct_Tag(phylum).objects.create(
                tagged_ccpick=S, ccpick_phylum_tag=DO)
        elif phylum == "deck":
            Dicts.Junct_Tag(phylum).objects.create(
                tagged_deck=S, deck_phylum_tag=DO)
        elif phylum == "groupdeck":
            Dicts.Junct_Tag(phylum).objects.create(
                tagged_groupdeck=S, groupdeck_phylum_tag=DO)
        elif phylum == "note":
            Dicts.Junct_Tag(phylum).objects.create(
                tagged_note=S, note_phylum_tag=DO)
        elif phylum == "format":
            Dicts.Junct_Tag(phylum).objects.create(
                tagged_format=S, format_phylum_tag=DO)


def Serialize_Imgs(phylum, img_owner_id, new_img_list):
    from .serializers_dict import Dicts

    old_img_list = Dicts.Junct_Img(phylum).objects.filter(
        owner=Dicts.Phylum(phylum).objects.get(id=img_owner_id))

    for old_img in old_img_list:
        img_match = False

        for new_img in new_img_list:

            if old_img.name == new_img:
                img_match = True
                print("DISCARD NEW:___________________", new_img)
                del new_img_list[new_img]
                break

        # since new_img_list does not contain old_img name,
        # delete old img
        if not img_match:
            print("DELETE OLD:___________________", old_img.name)
            old_img.delete()

    # Create Remaining Imgs
    for new_img in new_img_list:

        if new_img.endswith(".jpg") or (
                new_img.endswith(".jpeg")) or (
                new_img.endswith(".gif")) or (
                new_img.endswith(".png")):
            print("CREATE NEW:___________________", new_img)
            OWNER = Dicts.Phylum(phylum).objects.get(id=img_owner_id)
            created_img = new_img_list.get(new_img)
            Dicts.Junct_Img(phylum).objects.create(
                owner=OWNER,
                img=created_img)


def Serialize_Snds(phylum, snd_owner_id, new_snd_list):
    from .serializers_dict import Dicts

    old_snd_list = Dicts.Junct_Snd(phylum).objects.filter(
        owner=Dicts.Phylum(phylum).objects.get(id=snd_owner_id))

    for old_snd in old_snd_list:
        snd_match = False

        for new_snd in new_snd_list:

            if old_snd.name == new_snd:
                snd_match = True
                print("DISCARD NEW:___________________", new_snd)
                del new_snd_list[new_snd]
                break

        # since new_snd_list does not contain old_snd name,
        # delete old snd
        if not snd_match:
            print("DELETE OLD:___________________", old_snd.name)
            old_snd.delete()

    # Create Remaining Snds
    for new_snd in new_snd_list:

        if new_snd.endswith(".mp3"):
            print("CREATE NEW:___________________", new_snd)
            OWNER = Dicts.Phylum(phylum).objects.get(id=snd_owner_id)
            created_img = new_snd_list.get(new_snd)
            Dicts.Junct_Snd(phylum).objects.create(
                owner=OWNER,
                snd=created_img)


class Format_Type_SerializerField(serializers.Field):
    def to_representation(self, obj):
        return obj.name

    def to_internal_value(self, format_name):
        return Format.objects.get(name=format_name)


class User_Owner_SerializerField(serializers.Field):
    def to_representation(self, obj):
        # try:
        return obj.id
        # except:
        # return obj.username

    def to_internal_value(self, id):
        from .serializers_dict import Dicts
        return UserDjEx.objects.get(id=id)
