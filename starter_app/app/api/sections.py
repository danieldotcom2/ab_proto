from app.models import Form,db,Section
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)


section_routes = Blueprint('sections', __name__)

@section_routes.route('/form/<id>')
def get_form_sections(id):
    form = Form.query.get(id)
    sections = form.sections
    format_sections = [section.to_dict() for section in sections]
    return {"sections":format_sections}

@section_routes.route('/create/<form_id>',methods=['POST'])
def create_section(form_id):
    new_section = Section(form_id=form_id)
    db.session.add(new_section)
    db.session.commit()
    format_section = new_section.to_dict()
    return {"section":format_section}

@section_routes.route('/update-name/<id>',methods=['PATCH'])
def update_name(id):
    data = request.json
    section = Section.query.get(id);
    section.name=data["section_name"]
    db.session.add(section)
    db.session.commit()
    format_section = section.to_dict()
    return {"section":format_section}

@section_routes.route('/update-description/<id>',methods=['PATCH'])
def update_description(id):
    data = request.json
    section = Section.query.get(id);
    section.description=data["description"]
    db.session.add(section)
    db.session.commit()
    format_section = section.to_dict()
    return {"section":format_section}

# @section_routes.route('/delete-section/<id>',methods={'DELETE'})
# def delete_section(id):
