# UI-Group-9
Group 9 final project

To set up the virtual environment:
~~~~
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
~~~~

To set up the virtual environment on Linux:
~~~~
sudo apt-get install python3-venv python3-wheel python3-setuptools
python3 -m venv env
source env/bin/activate
pip install --upgrade pip setuptools wheel
pip install -e .
~~~~

To set up the virtual environment on Windows using PowerShell:
~~~~
virtualenv venv
.\venv\Scripts\activate
pip install -r win_requirements
~~~~


To create database
~~~~
mkdir -p var
sqlite3 var/mathmagic.sqlite3 < sql/schema.sql
~~~~

To run the project on MAC:
~~~~
cd mathmagic
export FLASK_APP=__init__.py
export PYTHONPATH="/UI-Group-9/mathmagic/config.py"
flask run --host 0.0.0.0 --port 5000
~~~~

To run the project on Linux:
~~~~
export FLASK_APP=mathmagic
export MATHMAGIC_SETTINGS=config.py
flask run --host 0.0.0.0 --port 5000
~~~~

To run the project on Windows using PowerShell:
~~~~
cd mathmagic
$env:FLASK_APP = "__init__.py"
$env:MATHMAGIC_SETTINGS = "config.py"
flask run --host 0.0.0.0 --port 5000
~~~~


Navigate to localhost:5000 in your browser



Code Documentation:

1. content (HTML)
	- base.html: create the hearder and footer that applies to all webpages
	- create.html: create the page when click the "create account" button
	- index.html: include all componets either in flash card mode or race mode based on the data from JS
	- login.html: create the page when click the "log-in" button

2. layout(CSS)
	- style.css: This file describes the presentation of all html files, including style, color, size and animations, etc. 

3. functionality (JS)
	- vue.js: listen to all the events that users create, run the functions in methods, and then send data back to the HTML files simultaneously. 



Back-end: Python/Flask, sqlite
    - mathmagic/views/index.py
    - mathmagic/db.py
    - sql/schema.sql

