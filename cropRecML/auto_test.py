import joblib
import pandas as pd
from collections import Counter
print("Running auto test for crop recommendation model...\n")
# load model and encoders
model = joblib.load('knn_crop_model.pkl')
soil_encoder = joblib.load('soil_encoder.pkl')
crop_encoder = joblib.load('crop_encoder.pkl')

# define seasonal climate defaults
seasonal_conditions = {
    'summer': {'temperature': 26, 'humidity': 55, 'rainfall': 80},
    'winter': {'temperature': 16, 'humidity': 70, 'rainfall': 10}
}

# define test samples
sample_inputs = [
    {"season": "winter", "soil": "loamy", "sunlight": 5, "water_added": 15, "plot_size": 5},
    {"season": "summer", "soil": "sandy", "sunlight": 8, "water_added": 20, "plot_size": 4},
    {"season": "winter", "soil": "clay", "sunlight": 4, "water_added": 10, "plot_size": 6},
    {"season": "summer", "soil": "loamy", "sunlight": 7, "water_added": 30, "plot_size": 8},
    {"season": "winter", "soil": "sandy", "sunlight": 6, "water_added": 12, "plot_size": 5},
    {"season": "summer", "soil": "clay", "sunlight": 9, "water_added": 5, "plot_size": 5},
    {"season": "winter", "soil": "loamy", "sunlight": 7, "water_added": 8, "plot_size": 4},
    {"season": "summer", "soil": "sandy", "sunlight": 6, "water_added": 15, "plot_size": 3}
]

# process and predict for each input
for idx, farm in enumerate(sample_inputs, 1):
    print(f"\ntest case #{idx}")

    season = farm['season']
    temp = seasonal_conditions[season]['temperature']
    humidity = seasonal_conditions[season]['humidity']
    rainfall = seasonal_conditions[season]['rainfall']
    water_total = (farm['water_added'] / farm['plot_size']) + rainfall
    soil_enc = soil_encoder.transform([farm['soil']])[0]

    features_df = pd.DataFrame([{
        'soil_enc': soil_enc,
        'sunlight': farm['sunlight'],
        'temperature': temp,
        'humidity': humidity,
        'water_per_m2': water_total
    }])

    # show the actual input values used in prediction
    print("\ninputs to knn model:")
    print(f"  soil: {farm['soil']} (encoded: {soil_enc})")
    print(f"  sunlight: {farm['sunlight']} hours/day")
    print(f"  temperature: {temp} °C")
    print(f"  humidity: {humidity} %")
    print(f"  water per m^2: {water_total:.2f} mm/week")

    # predict and show result
    prediction = model.predict(features_df)
    predicted_crop = crop_encoder.inverse_transform(prediction)[0]
    print("\npredicted best crop:", predicted_crop)

    # top 3 nearest crops
    _, indices = model.kneighbors(features_df)
    neighbor_labels = model._y[indices[0]]
    neighbor_crops = crop_encoder.inverse_transform(neighbor_labels)
    top_3 = Counter(neighbor_crops).most_common(3)


    print("\nCrops you can farm:")
    for i, (crop, count) in enumerate(top_3, 1):
        if count > 15:
            print(f"{i}. {crop} ({count} votes)")