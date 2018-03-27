import flask
import mathmagic
from flask import (
    redirect, session, url_for,
    render_template, request, abort)
import http
import json



# ROUTES

@mathmagic.app.route('/', methods=['GET', 'POST'])
def show_index():
    """Display home page route."""

    context = {}

    return render_template("index.html", **context)



