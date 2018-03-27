"""
Math Magic package initializer.

"""
import flask

app = flask.Flask(__name__) 
app.config.from_object('mathmagic.config')
app.config.from_envvar('MATHMAGIC_SETTINGS', silent=True)
import mathmagic.views  
