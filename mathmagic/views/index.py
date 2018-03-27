import flask
import mathmagic
from flask import (
    redirect, session, url_for,
    render_template, request, abort)
from mathmagic.db import get_db
import http
import json



# ROUTES

@mathmagic.app.route('/', methods=['GET', 'POST'])
def show_index():
    """Display home page route."""

    context = {}

    return render_template("index.html", **context)


@mathmagic.app.route('/accounts/login', methods=['GET', 'POST'])
def show_login():
    """Display /accounts/login/ route."""

    context = {}

    # Redirect to home page if already logged in
    if 'username' in session:
        return redirect(url_for('show_index'))

    # Login request
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if not verify_password(username, password):
            context['error'] = ["Invalid credentials, please try again"]
            return render_template('login.html', **context)


        # Open session with user info
        session["username"] = username

        return redirect(url_for('show_index'))

    if request.method == 'GET':
        return render_template('login.html', **context)


@mathmagic.app.route('/accounts/logout/', methods=['GET', 'POST'])
def redirect_logout():
    """Logout immediately redirects to home page."""
    session.clear()
    return redirect(url_for('show_index'))


def verify_password(username, plaintext_pwd):
    db = get_db()
    query = 'SELECT password FROM users WHERE username=?'
    user_entry = db.execute(query, (username,)).fetchone()

    if not user_entry:
        return False

    stored_pw = user_entry['password']

    return (stored_pw == plaintext_pwd)



