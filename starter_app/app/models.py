from typing import Text
from sqlalchemy.sql.schema import ForeignKey
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }

class Form(db.Model):
  __tablename__ = 'forms'

  id = db.Column(db.Integer, primary_key = True)
  subdomain_id = db.Column(db.Integer,db.ForeignKey("subdomains.id"),nullable=False)
  form_name = db.Column(db.String(1000), nullable = False)
  form_title = db.Column(db.String(255), nullable = True)
  form_intro_text = db.Column(db.String(5000), nullable= True)
  custom_color_primary = db.Column(db.String(300), nullable=True)
  custom_color_secondary = db.Column(db.String(300),nullable=True)
  custom_color_primary_light = db.Column(db.String(300), nullable=True)
  custom_color_secondary_light = db.Column(db.String(300), nullable=True)
  custom_color_primary_dark = db.Column(db.String(300), nullable=True)
  custom_color_secondary_dark = db.Column(db.String(300), nullable=True)

  
  sections = db.relationship("Section",back_populates="form")
  subdomain = db.relationship("Subdomain",back_populates="forms")

  def to_dict(self):
    return {
      "id": self.id,
      "form_name": self.form_name,
      "form_intro_text": self.form_intro_text,
      "form_title":self.form_title,
      "custom_color_primary":self.custom_color_primary,
      "custom_color_secondary":self.custom_color_secondary,
      "subdomain_name":self.subdomain.subdomain,
      "subdomain_id":self.subdomain.id
    }
  

class Section(db.Model):
  __tablename__ = 'sections'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(1000), nullable = True)
  description = db.Column(db.String(2000), nullable=True)
  form_id = db.Column(db.Integer, db.ForeignKey("forms.id"),nullable=False)
  order = db.Column(db.Integer,nullable=True)
  
  form = db.relationship("Form",back_populates="sections")
  questions = db.relationship("Question",back_populates="section")

  def to_dict(self):
    return {
      "id":self.id,
      "name":self.name,
      "description":self.description,
      "form_id":self.form_id,
      "order":self.order,
      "questions": [question.to_dict() for question in self.questions]
    }


class Subdomain(db.Model):
  __tablename__ = 'subdomains'

  id = db.Column(db.Integer, primary_key = True)
  subdomain = db.Column(db.String(1000), nullable = False)

  forms = db.relationship("Form",back_populates="subdomain")

  def to_dict(self):
    return {
      "id":self.id,
      "subdomain":self.subdomain
    }


class Question(db.Model):
  __tablename__ = 'questions'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(1000), nullable = False)
  label = db.Column(db.String(1000), nullable = False)
  description = db.Column(db.String(1000), nullable = False)
  help_text = db.Column(db.String(300),nullable=True)
  required = db.Column(db.Boolean, default=False,nullable=False)
  is_active = db.Column(db.Boolean, default=True,nullable=False)
  type = db.Column(db.String(50),nullable=False,default={"mc"})
  order = db.Column(db.Integer)
  section_id = db.Column(db.Integer, db.ForeignKey("sections.id"))

  section = db.relationship("Section",back_populates="questions")
  question_responses = db.relationship("Question_Response",back_populates="question")

  def to_dict(self):
    return {
      "id":self.id,
      "name":self.name,
      "label":self.label,
      "description":self.description,
      "help_text":self.help_text,
      "required":self.required,
      "is_active":self.is_active,
      "type":self.type,
      "order":self.order,
      "section_id":self.section_id,
      "question_responses":[response.to_dict() for response in self.question_responses]
    }


class Question_Response(db.Model):
  __tablename__ = 'question_responses'
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(1000), nullable = False)
  question_id = db.Column(db.Integer, db.ForeignKey("questions.id"))
  order = db.Column(db.Integer)

  question = db.relationship("Question",back_populates="question_responses")

  def to_dict(self):
    return {
      "id":self.id,
      "name":self.name,
      "question_id":self.question_id,
      "order":self.order
    }


class Program_Tags(db.Model):
  __tablename__ = 'program_tags'
  
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(1000), nullable = False)


class Goals(db.Model):
  __tablename__ = 'goals'
  
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(1000), nullable = False)