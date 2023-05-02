import platform
from flask_restful import Resource

class Info(Resource):

    def get(self):
        return {
            "system": platform.system(),
            "release": platform.release(),
            "version": platform.version(),
            "machine": platform.machine(),
            "processor": platform.processor(),
            "node": platform.node()
        }