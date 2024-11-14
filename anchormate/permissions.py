from rest_framework.permissions import BasePermission

SAFE_METHODS = ['GET', 'HEAD']

class IsOwnerOrEditOnly(BasePermission):
    """
    Custom permission to only allow owners of an anchorage to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Allow read-only permissions for any request
        if request.method in SAFE_METHODS:
            return True

        # Allow write permissions only to the owner of the anchorage
        return obj.added_by.id == request.user.id