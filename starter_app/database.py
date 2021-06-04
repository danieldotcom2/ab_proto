from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Subdomain, Form

with app.app_context():
  db.drop_all()
  db.create_all()

  ian = User(username = 'Ian', email = 'ian@aa.io')
  javier = User(username = 'Javier', email = 'javier@aa.io')
  dean = User(username = 'Dean', email = 'dean@aa.io')
  angela = User(username = 'Angela', email = 'angela@aa.io')
  soonmi = User(username = 'Soon-Mi', email = 'soonmi@aa.io')
  alissa = User(username = 'Alissa', email = 'alissa@aa.io')

  subdomain_1 = Subdomain(subdomain="healthstaff")
  subdomain_2 = Subdomain(subdomain="healthhelp")
  subdomain_3 = Subdomain(subdomain="healthsupport")

  form_1 = Form(subdomain_id=1,form_name="Teen Seeker Form",form_title="Teen Seeker Form")

  db.session.add(form_1)
  db.session.add(subdomain_1)
  db.session.add(subdomain_2)
  db.session.add(subdomain_3)
  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)

  db.session.commit()