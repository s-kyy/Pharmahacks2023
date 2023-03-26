import json
from flask import Flask, request

app = Flask(__name__)


@app.route('/api/diagnosis', methods=['POST'])
def getDiagnosis():
    input_data = request.get_json()

    return input_data


if __name__ == '__main__':
    app.run(debug=True)
