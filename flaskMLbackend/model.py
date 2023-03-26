import numpy as np
import pandas as pd
import xgboost as xgb


def load_model():
    loaded_model = xgb.Booster()
    loaded_model.load_model("./model/best_xgb_model2.json")
    return loaded_model


def get_prediction(sample, model):
    symptom_val = model.predict(sample)
    return symptom_val


def get_contributions(model):
    values = model.feature_importances_
    labels = model.feature_names_in_
    return values, labels
