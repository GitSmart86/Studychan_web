from django.contrib import admin

from .models._addon import Addon
from .models._deed import Deed
from .models._feedback_response import Feedback_Response
from .models._feedback import Feedback
from .models._informatics_tag import Informatics_Tag
from .models._news import News
from .models._theme import Theme

from .models.junct_img_addon import Junct_Img_Addon
from .models.junct_img_feedback import Junct_Img_Feedback
from .models.junct_img_feedback_response import Junct_Img_Feedback_Response
from .models.junct_img_news import Junct_Img_News
from .models.junct_img_theme import Junct_Img_Theme

from .models.junct_sub_addon import Junct_Sub_Addon
from .models.junct_sub_theme import Junct_Sub_Theme

from .models.junct_tag_addon import Junct_InformaticsTag_Addon
from .models.junct_tag_news import Junct_InformaticsTag_News
from .models.junct_tag_theme import Junct_InformaticsTag_Theme

from .models.junct_user_deed import Junct_User_Deed


# -------
#   Img
# -------


class Junct_Img_AddonInline(admin.TabularInline):
    model = Junct_Img_Addon
    extra = 1
    fk_name = "owner"
    search_fields = ['owner']


admin.site.register(Junct_Img_Addon)


class Junct_Img_FeedbackInline(admin.TabularInline):
    model = Junct_Img_Feedback
    extra = 1
    fk_name = "owner"
    search_fields = ['owner']


admin.site.register(Junct_Img_Feedback)


class Junct_Img_Feedback_ResponseInline(admin.TabularInline):
    model = Junct_Img_Feedback_Response
    extra = 1
    fk_name = "owner"
    search_fields = ['owner']


admin.site.register(Junct_Img_Feedback_Response)


class Junct_Img_NewsInline(admin.TabularInline):
    model = Junct_Img_News
    extra = 1
    fk_name = "owner"
    search_fields = ['owner']


admin.site.register(Junct_Img_News)


class Junct_Img_ThemeInline(admin.TabularInline):
    model = Junct_Img_Theme
    extra = 1
    fk_name = "owner"
    search_fields = ['owner']


admin.site.register(Junct_Img_Theme)


# --------
#   SUBS
# --------


class Junct_Sub_AddonInline(admin.TabularInline):
    model = Junct_Sub_Addon
    extra = 1
    fk_name = "subbedAddon"
    search_fields = ['subbedAddon']


admin.site.register(Junct_Sub_Addon)


class Junct_Sub_ThemeInline(admin.TabularInline):
    model = Junct_Sub_Theme
    extra = 1
    fk_name = "subbedTheme"
    search_fields = ['subbedTheme']


admin.site.register(Junct_Sub_Theme)


# ---------
#   TAGS
# ---------


admin.site.register([Informatics_Tag])


class Junct_Tag_AddonInline(admin.TabularInline):
    model = Junct_InformaticsTag_Addon
    extra = 1
    fk_name = "tagged_addon"
    search_fields = ['tagged_addon']


admin.site.register(Junct_InformaticsTag_Addon)


class Junct_Tag_NewsInline(admin.TabularInline):
    model = Junct_InformaticsTag_News
    extra = 1
    fk_name = "tagged_news"
    search_fields = ['tagged_news']


admin.site.register(Junct_InformaticsTag_News)


class Junct_Tag_ThemeInline(admin.TabularInline):
    model = Junct_InformaticsTag_Theme
    extra = 1
    fk_name = "tagged_theme"
    search_fields = ['tagged_theme']


admin.site.register(Junct_InformaticsTag_Theme)


# --------
#   DEED
# --------


class Junct_User_DeedInline(admin.TabularInline):
    model = Junct_User_Deed
    extra = 1
    fk_name = "deed"
    search_fields = ['deed']


admin.site.register(Junct_User_Deed)


# ---------------
#   FEED / RESP
# ---------------


class Feedback_ResponseInline(admin.TabularInline):
    model = Feedback_Response
    extra = 1
    fk_name = "ori_feedback"
    search_fields = ['ori_feedback']


# ---------------
#   INFORMATICS
# ---------------


@admin.register(Addon)
class AddonAdmin(admin.ModelAdmin):
    inlines = [Junct_Img_AddonInline,
               Junct_Sub_AddonInline,
               Junct_Tag_AddonInline]
    list_display = ['name', 'id', ]
    search_fields = ['name', 'id', ]


@admin.register(Deed)
class DeedAdmin(admin.ModelAdmin):
    inlines = [Junct_User_DeedInline]
    list_display = ['name', 'id', ]
    search_fields = ['name', 'id', ]


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    inlines = [Junct_Img_FeedbackInline,
               Feedback_ResponseInline]
    list_display = ['name', 'id', ]
    search_fields = ['name', 'id', ]


@admin.register(Feedback_Response)
class Feedback_ResponseAdmin(admin.ModelAdmin):
    inlines = [Junct_Img_Feedback_ResponseInline]
    list_display = ['ori_feedback', 'feedback_response_owner', 'id', ]
    search_fields = ['ori_feedback', 'feedback_response_owner', 'id', ]


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    inlines = [Junct_Img_NewsInline,
               Junct_Tag_NewsInline]
    list_display = ['name', 'id', ]
    search_fields = ['name', 'id', ]


@admin.register(Theme)
class ThemeAdmin(admin.ModelAdmin):
    inlines = [Junct_Img_ThemeInline,
               Junct_Sub_ThemeInline,
               Junct_Tag_ThemeInline]
    list_display = ['name', 'id', ]
    search_fields = ['name', 'id', ]
