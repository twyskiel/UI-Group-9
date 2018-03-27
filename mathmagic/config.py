"""
Math Magic development configuration.

"""

import os

APPLICATION_ROOT = '/'

# Secret key for encrypting cookies
SECRET_KEY = b'\xab\x08\xef\xe5\xcb}I"\xfe\xe9}:\xfd\x9dJ\xaf\x08\xb0\xffP\x89\x87\x01 '  
SESSION_COOKIE_NAME = 'login'

# Database file is var/mathmagic.sqlite3
DATABASE_FILENAME = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    'var', 'mathmagic.sqlite3'
)
