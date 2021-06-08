from app.models import Form,db,Section,Question,Question_Response
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)


question_response_routes = Blueprint('question_responses', __name__)

@question_response_routes.route('/create',methods=["POST"])
def create_response():
    data = request.json
    question_response = Question_Response(name=data["label"],label=data["label"],question_id=data["question_id"])
    db.session.add(question_response)
    db.session.commit()
    format_response = question_response.to_dict()
    return {"question_response":format_response}
    