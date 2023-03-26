import json
from flask import Flask, request
import xgboost as xgb
import pandas as pd


from model import load_model, get_prediction, get_contributions

app = Flask(__name__)
model = load_model()


def classify_percentage(percentage):
    """Classify the given percentage as Good, Bad, or Average."""
    if percentage >= 75:
        return "Good"
    elif percentage < 50:
        return "Bad"
    else:
        return "Average"


@app.route('/api/diagnosis', methods=['POST'])
def getDiagnosis():
    input_data = request.get_json()
    names = list(input_data['InputContributionMapJson'].keys())

    data = list(input_data['InputContributionMapJson'].values())
    data.append(0)
    names.append('user_number')
    print([names])
    print([data])
    passingShit = pd.DataFrame(data).T
    passingShit.columns = names
    xgbMat = xgb.DMatrix(passingShit)

    score = get_prediction(xgbMat, model)
    return str(score)


if __name__ == '__main__':
    app.run(debug=True)
