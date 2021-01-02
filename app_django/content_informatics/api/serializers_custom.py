from rest_framework import serializers
from django.core.files.base import ContentFile
from content_users.models._userDjEx import UserDjEx


def Serialize_Imgs(informatics, img_owner_id, new_img_list):
    from .serializers_dict import Dicts

    old_img_list = Dicts.Junct_Img(informatics).objects.filter(
        owner=Dicts.Informatics(informatics).objects.get(id=img_owner_id))

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
            OWNER = Dicts.Informatics(informatics).objects.get(id=img_owner_id)
            created_img = new_img_list.get(new_img)
            Dicts.Junct_Img(informatics).objects.create(
                owner=OWNER,
                img=created_img)


class User_Owner_SerializerField(serializers.Field):
    def to_representation(self, obj):
        return obj.username

    def to_internal_value(self, id):
        return UserDjEx.objects.get(id=id)


# class User_Owner_SerializerField(serializers.Field):
#     def to_representation(self, obj):
#         # try:
#         return obj.id
#         # except:
#         # return obj.username

#     def to_internal_value(self, id):
#         from .serializers_dict import Dicts
#         return UserDjEx.objects.get(id=id)
