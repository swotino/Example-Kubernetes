from flaskext.mysql import MySQL
from flask_restful import Resource, request

from lib.constants import Database


class Controller(Resource):
    def get(self):
        if not Database.instance:
            return {"error": "Database not connected"}
        cursor = Database.instance.get_db().cursor()
        cursor.execute("SELECT * FROM accounts")
        result = cursor.fetchall()
        return {"data": result}

    def post(self):
        if not Database.instance:
            return {"error": "Database not connected"}

        json = request.get_json()
        cursor = Database.instance.get_db().cursor()
        cursor.execute(
            "INSERT INTO accounts (firstName, lastName) VALUES (%s, %s)",
            (json["firstName"], json["lastName"]),
        )
        Database.instance.get_db().commit()
        return {"message": "Hello, World!"}
