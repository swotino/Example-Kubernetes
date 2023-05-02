import os
import socket
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flaskext.mysql import MySQL
from waitress import serve
from dotenv import load_dotenv

from lib.controller import Controller
from lib.info import Info
from lib.constants import Database

# Load environment variables
load_dotenv()

# Resolve the DNS
host = os.getenv("MYSQL_DATABASE_HOST")
try:
    host = socket.gethostbyname(host)
except Exception as e:
    print(e)

# Create Flask app
app = Flask(__name__)
app.config["MYSQL_DATABASE_USER"] = os.getenv("MYSQL_DATABASE_USER")
app.config["MYSQL_DATABASE_PASSWORD"] = os.getenv("MYSQL_DATABASE_PASSWORD")
app.config["MYSQL_DATABASE_DB"] = os.getenv("MYSQL_DATABASE_DB")
app.config["MYSQL_DATABASE_HOST"] = host
app.config["MYSQL_DATABASE_PORT"] = int(os.getenv("MYSQL_DATABASE_PORT"))
CORS(app, resources={r"/accounts*": { "origins": "*" }})

# Configure MySQL
try:
    Database.instance = MySQL()
    Database.instance.init_app(app)
except Exception as e:
    print(e)

# Configure the controllers
api = Api(app)
api.add_resource(Controller, "/accounts")
api.add_resource(Info, "/info")

# Run the app
if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=10000)
