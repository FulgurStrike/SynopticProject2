# cropRecML/predictFromInput.py
import sys
import json
import joblib
import pandas as pd
from collections import Counter

# load model and encoders
model = joblib.load('cropRecML/knn_crop_model.pkl')
soil_encoder = joblib.load('cropRecML/soil_encoder.pkl')
crop_encoder = joblib.load('cropRecML/crop_encoder.pkl')

# read input from stdin
data = json.loads(sys.stdin.read())

soil_enc = soil_encoder.transform([data["soil"]])[0]

X = pd.DataFrame([{
    "soil_enc": soil_enc,
    "sunlight": data["sunlight"],
    "temperature": data["temperature"],
    "humidity": data["humidity"],
    "water_per_m2": data["water_per_m2"]
}])

# make prediction
prediction = model.predict(X)
recommended_crop = crop_encoder.inverse_transform(prediction)[0]

# get top 3 crops from neighbors
_, indices = model.kneighbors(X)
neighbor_labels = model._y[indices[0]]
neighbor_crops = crop_encoder.inverse_transform(neighbor_labels)
top_3 = Counter(neighbor_crops).most_common(3)

# return result
result = {
    "recommended_crop": recommended_crop,
    "top_3": [{"crop": crop, "votes": votes} for crop, votes in top_3]
}
print(json.dumps(result))