from app.models import Form,db
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)


form_routes = Blueprint('forms', __name__)

@form_routes.route('/')
def index():
  response = Form.query.all()
  print("form route______")
  return { "forms": [form.to_dict() for form in response]}

@form_routes.route('/create',methods=['POST'])
def create_form():
    data = request.json
    new_form = Form(form_name=data["form_name"],subdomain_id=data["subdomain_id"])
    db.session.add(new_form)
    db.session.commit()
    format_form = new_form.to_dict()
    return {"form":format_form}
  
@form_routes.route('/update-form-name/<id>',methods=['POST','PATCH'])
def update_form_name(id):
    data = request.json
    form = Form.query.get(id)
    form.form_name=data["form_name"]
    db.session.add(form)
    db.session.commit()
    format_form = form.to_dict()
    return {"form":format_form}

@form_routes.route('/update-form-colors/<id>',methods=['POST','PATCH'])
def update_form_color(id):
    data = request.json
    form = Form.query.get(id)
    form.custom_color_secondary=data["secondary_color"]
    form.custom_color_primary=data["primary_color"]
    form.custom_color_primary_dark=data["primary_dark"]
    form.custom_color_primary_light=data["primary_light"]
    form.custom_color_secondary_dark=data["secondary_dark"]
    form.custom_color_secondary_light=data["secondary_light"]
    db.session.add(form)
    db.session.commit()
    format_form = form.to_dict()
    return {"form":format_form}

@form_routes.route('/update-form-title/<id>',methods=['POST','PATCH'])
def update_form_title(id):
    data = request.json
    form = Form.query.get(id)
    form.form_title=data["form_title"]
    db.session.add(form)
    db.session.commit()
    format_form = form.to_dict()
    return {"form":format_form}

@form_routes.route('/<id>')
def get_form(id):
  response = Form.query.get(id)
  print("form route______")
  format_form = response.to_dict()
  return { "form": format_form}


# @departments.route("/")
# def get_departments():
#     departments = db.session.query(Department).all()
#     format_departments = [department.to_dict() for department in departments]
#     return {"departments":format_departments}

# @departments.route("/id/<id>")
# def get_dept(id):
#     department = Department.query.get(id)
#     format_department = department.to_dict()
#     return {"department":format_department}

# @departments.route("/update/<id>",methods=['POST','PATCH'])
# def update_dept(id):
#     data = request.json
#     department = Department.query.get(id)
#     department.specialty = data["specialty"]
#     department.name = data["name"]
#     department.address_line_one = data["addressLineOne"]
#     department.address_line_two = data["addressLineTwo"]
#     print("!!!!",)
#     department.address_city = data["addressCity"]
#     department.address_state = data["addressState"]
#     department.address_zip = data["addressZip"]
#     db.session.add(department)
#     db.session.commit()
#     format_department = department.to_dict()
#     return {"department":format_department}

