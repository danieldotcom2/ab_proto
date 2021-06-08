from app.models import Form,db,Section,Question,Question_Response
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)


question_routes = Blueprint('questions', __name__)

@question_routes.route('/create',methods=["POST"])
def create_question():
    data = request.json
    question = Question(name=data["label"],label=data["label"],required=False,is_active=False,type=data["type"],section_id=data["section_id"])
    db.session.add(question)
    db.session.commit()
    format_question = question.to_dict()
    return {"question":format_question}
    