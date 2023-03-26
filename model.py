import numpy as np
import pandas as pd
import xgboost as xgb

def load_model()
    xgb_model.load_model("best_xgb_model.json")
    return model

def get_prediction(sample)
    symptom_val = model.predict(sample)
    return symptom_val

def get_contributions()
    values = best_xgb_model.feature_importances_
    labels = best_xgb_model.feature_names_in_
    return values, labels
