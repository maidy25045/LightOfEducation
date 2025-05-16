from flask import Flask, render_template, request
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

mongo_uri = os.environ.get("MONGO_URI")
client = MongoClient(mongo_uri)

db = client["leowebsite"]

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/exams')
def exams():
    exam_data = list(db.exams.find())
    return render_template("exams.html", exams=exam_data)

@app.route('/pdfs')
def pdfs():
    pdf_data = list(db.pdfs.find())
    return render_template("pdfs.html", pdfs=pdf_data)

@app.route('/notes')
def notes():
    notes_data = list(db.notes.find())
    return render_template("notes.html", notes=notes_data)

@app.route('/leaderboard')
def leaderboard():
    leaders = list(db.leaderboard.find().sort("points", -1))
    return render_template("leaderboard.html", leaderboard=leaders)

@app.route("/search")
def search():
    query = request.args.get("q", "")
    return render_template("search-result.html", query=query)

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)
