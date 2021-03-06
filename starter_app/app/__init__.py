import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate

from .models import db, User
from .api.user_routes import user_routes
from .api.subdomains import subdomain_routes
from .api.forms import form_routes
from .api.sections import section_routes
from .api.questions import question_routes
from .api.question_responses import question_response_routes

from .config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(subdomain_routes, url_prefix='/api/subdomains')
app.register_blueprint(form_routes, url_prefix='/api/forms')
app.register_blueprint(section_routes, url_prefix='/api/sections')
app.register_blueprint(question_routes,url_prefix='/api/questions')
app.register_blueprint(question_response_routes,url_prefix='/api/question_responses')
db.init_app(app)
Migrate(app, db)

## Application Security
CORS(app)
@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        print("favicon route_____")
        return app.send_static_file('favicon.ico')
    print("index route_____")
    return app.send_static_file('index.html')
