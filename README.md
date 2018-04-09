# UI-Group-9
Group 9 final project

To set up the virtual environment:
~~~~
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
~~~~

To run the project:
~~~~
cd mathmagic
export FLASK_APP=__init__.py
export MATHMAGIC_SETTINGS=config.py
flask run --host 0.0.0.0 --port 5000
~~~~

Navigate to localhost:5000 in your browser
