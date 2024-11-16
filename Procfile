release: mv django-staticfiles/* staticfiles/ && python manage.py makemigrations && python manage.py migrate
web: gunicorn anchormate.wsgi