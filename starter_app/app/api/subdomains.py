from app.models import Subdomain, db, Form
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)

subdomain_routes = Blueprint('subdomains', __name__)

@subdomain_routes.route('/')
def index():
  response = Subdomain.query.all()
  print("subdomain route______")
  return { "subdomains": [subdomain.to_dict() for subdomain in response]}

@subdomain_routes.route('/<id>/forms')
def get_forms(id):
    subdomain = Subdomain.query.get(id)
    subdomain_forms = db.session.query(Form).filter(Form.subdomain == subdomain).all()
    format_forms = [form.to_dict() for form in subdomain_forms]
    format_subdomain = subdomain.to_dict()
    return {"forms":format_forms, "subdomain":format_subdomain}
