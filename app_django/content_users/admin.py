from django.conf import settings
from django.contrib import admin
from .models.junct_tag_user import Junct_PhylumTag_User
from .models.junct_sub_user import Junct_Sub_User
from .models.junct_rate_user import Junct_Rate_User
from .models._userApk import UserApk
from .models._userExe import UserExe
from .models._userStat import UserStat
from .models._userWeb import UserWeb
from .models._userDjEx import UserDjEx


class Junct_UserRatingsInline(admin.TabularInline):
    model = Junct_Rate_User
    extra = 1
    fk_name = "ratingUser_User"
    search_fields = ['ratingUser_User']


admin.site.register(Junct_Rate_User)


class Junct_UserSubscriptionsInline(admin.TabularInline):
    model = Junct_Sub_User
    extra = 1
    fk_name = "subbingUser_User"
    search_fields = ['subbingUser_User']


admin.site.register(Junct_Sub_User)


class Junct_UserTagsInline(admin.TabularInline):
    model = Junct_PhylumTag_User
    extra = 1
    fk_name = "tagged_user"
    search_fields = ['tagged_user']


admin.site.register(Junct_PhylumTag_User)


class UserStats_Inline(admin.StackedInline):
    model = UserStat
    extra = 1
    fk_name = "user"
    search_fields = ['user']


@admin.register(UserDjEx)
class UserAdmin(admin.ModelAdmin):
    inlines = [Junct_UserRatingsInline,
               Junct_UserSubscriptionsInline,
               Junct_UserTagsInline,
               UserStats_Inline]
    list_display = ['username', 'id', ]
    search_fields = ['username', 'id', ]
    exclude = ['is_active', 'groups', 'user_permissions', 'password']


@admin.register(UserWeb)
class UserWebAdmin(admin.ModelAdmin):
    list_display = ['user', 'user_id']
    search_fields = ['user__username', 'user__id', ]


@admin.register(UserApk)
class UserApkAdmin(admin.ModelAdmin):
    list_display = ['user', 'user_id']
    search_fields = ['user__username', 'user__id', ]


@admin.register(UserExe)
class UserExeAdmin(admin.ModelAdmin):
    list_display = ['user', 'user_id']
    search_fields = ['user__username', 'user__id', ]
