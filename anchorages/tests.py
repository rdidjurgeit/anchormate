from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Anchorage, Bookmark


class AnchorageTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        # Log this user in using the default client session
        self.client.login(username='testuser', password='testpass123')
        # Alternatively, if you use token or JWT auth, do something like:
        # token_response = self.client.post('/api/auth/token/', {
        #     'username': 'testuser',
        #     'password': 'testpass123'
        # }, format='json')
        # token = token_response.data.get('token', '')
        # self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        # Assuming you have DRF ViewSets with routers:
        # e.g. "anchorage-list" is the route name for GET/POST /anchorages/
        #      "anchorage-detail" is the route name for GET/PUT/DELETE /anchorages/<id>/
        self.anchorage_list_url = reverse('anchorage-list')

        # If detail route uses `pk` or `id`, define a quick lambda for convenience:
        # reverse('anchorage-detail', kwargs={'pk': anchorage_id})

    def test_create_anchorage(self):
        """
        Ensure we can create a new anchorage object.
        """
        data = {
            "title": "Test Anchorage",
            "description": "A quiet spot in the harbor.",
            "location": "51.5074, -0.1278",
        }
        response = self.client.post(self.anchorage_list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Anchorage.objects.count(), 1)
        self.assertEqual(Anchorage.objects.first().title, "Test Anchorage")

    def test_list_anchorages(self):
        """
        Ensure we can retrieve a list of existing anchorages.
        """
        # Create one or more Anchorages
        Anchorage.objects.create(
            title="Anchorage 1",
            description="Description 1",
            location="12.3456, -12.3456",
            owner=self.user  # If your model has an 'owner' ForeignKey
        )
        response = self.client.get(self.anchorage_list_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Anchorage 1")

    def test_retrieve_single_anchorage(self):
        """
        Ensure we can retrieve one anchorage by ID.
        """
        anchorage = Anchorage.objects.create(
            title="Anchorage Single",
            description="Just for single get test",
            location="0.000,0.000",
            owner=self.user
        )
        detail_url = reverse('anchorage-detail', kwargs={'pk': anchorage.pk})
        response = self.client.get(detail_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "Anchorage Single")

    def test_update_anchorage(self):
        """
        Ensure we can update an existing anchorage.
        """
        anchorage = Anchorage.objects.create(
            title="Before Update",
            description="Update me",
            location="1,1",
            owner=self.user
        )
        detail_url = reverse('anchorage-detail', kwargs={'pk': anchorage.pk})
        updated_data = {
            "title": "After Update",
            "description": "Now updated",
            "location": "2,2"
        }
        response = self.client.put(detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        anchorage.refresh_from_db()
        self.assertEqual(anchorage.title, "After Update")
        self.assertEqual(anchorage.description, "Now updated")

    def test_delete_anchorage(self):
        """
        Ensure we can delete an existing anchorage.
        """
        anchorage = Anchorage.objects.create(
            title="Delete Me",
            description="This will be gone soon",
            location="3,3",
            owner=self.user
        )
        detail_url = reverse('anchorage-detail', kwargs={'pk': anchorage.pk})
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Anchorage.objects.count(), 0)


class BookmarkTests(APITestCase):
    """
    Test suite for Bookmark CRUD functionality.
    """

    def setUp(self):
        self.user = User.objects.create_user(
            username='bookmarkuser',
            email='bookmark@example.com',
            password='testpass123'
        )
        self.client.login(username='bookmarkuser', password='testpass123')

        # Create one anchorage for bookmarking
        self.anchorage = Anchorage.objects.create(
            title="Bookmark Anchorage",
            description="Test anchorage for bookmarking",
            location="10,10",
            owner=self.user
        )

        # If you have a router for bookmarks:
        self.bookmark_list_url = reverse('bookmark-list')
        # For detail: reverse('bookmark-detail', kwargs={'pk': bookmark.pk})

    def test_create_bookmark(self):
        """
        Ensure we can bookmark an anchorage.
        """
        data = {
            "anchorage": self.anchorage.pk,
            # If your Bookmark model also needs to specify 'user',
            # you can either pass it or handle it automatically in the view.
            # "user": self.user.pk
        }
        response = self.client.post(self.bookmark_list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Bookmark.objects.count(), 1)
        self.assertEqual(Bookmark.objects.first().anchorage, self.anchorage)

    def test_list_bookmarks(self):
        """
        Ensure we can list a user's bookmarks.
        """
        Bookmark.objects.create(
            user=self.user,
            anchorage=self.anchorage
        )
        response = self.client.get(self.bookmark_list_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['anchorage'], self.anchorage.pk)

    def test_delete_bookmark(self):
        """
        Ensure we can delete a bookmark.
        """
        bookmark = Bookmark.objects.create(user=self.user, anchorage=self.anchorage)
        detail_url = reverse('bookmark-detail', kwargs={'pk': bookmark.pk})
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Bookmark.objects.count(), 0)

