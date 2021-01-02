# from django.db import models
# from django.db.models.signals import post_save
# from content_phylums.models._phylum_tag import Phylum_Tag
# from django.conf import settings
# User = settings.AUTH_USER_MODEL


# class UserDjEx(models.Model):
#     user = models.OneToOneField(User,
#                                 related_name='user_ext',
#                                 on_delete=models.CASCADE)

#     description = models.TextField(max_length=500,
#                                    blank=True,
#                                    null=True)

#     icon = models.ImageField(
#         upload_to=lambda instance:
#             'media/user/{0}/icon_user'.format(instance.owner),
#         height_field='url_height',
#         width_field='url_width',
#         blank=True,
#         null=True)

#     subscribers = models.ManyToManyField(User,
#                                          related_name='your_subscriptions',
#                                          blank=True,
#                                          symmetrical=False,
#                                          through='Junct_Sub_User')

#     posRatings = models.ManyToManyField(User,
#                                         related_name='your_ratings',
#                                         blank=True,
#                                         symmetrical=False,
#                                         through='Junct_Rate_User')

#     phylum_tags = models.ManyToManyField(Phylum_Tag,
#                                          related_name='your_phylum_tags',
#                                          blank=True,
#                                          symmetrical=False,
#                                          through='Junct_PhylumTag_User')

#     """
#     project_obj = Profile.objects.first()
#     project_obj.followers.all() -> All users following this profile
#     user.your_following.all() -> All user profiles I follow
#     """

#     def __str__(self):
#         return '%s' % (self.user)

# # Signal: everytime the sender(User) class is signaled(post_save), run the function(user_did_save)
# # the arg instance is the sender class (ie: User), so the newly created UserDjEx.user will be models.OneToOneField() to the instance(User)


# def user_did_save(sender, instance, created, *args, **kwargs):
#     if created:
#         UserDjEx.objects.get_or_create(user=instance)


# post_save.connect(user_did_save, sender=User)

# # likes = models.ManyToManyField(
# #     User, related_name='tweet_user', blank=True, through=TweetLike)
# # image = models.FileField(upload_to='images/', blank=True, null=True)
