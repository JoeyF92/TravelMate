from application import db, app
from application.models import Preference
from flask import request, jsonify, render_template, redirect, url_for
