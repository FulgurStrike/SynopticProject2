import joblib
import pandas as pd
import matplotlib.pyplot as plt
from collections import Counter

# Load model and encoders
model = joblib.load('knn_crop_model.pkl')
soil_encoder = joblib.load('soil_encoder.pkl')
crop_encoder = joblib.load('crop_encoder.pkl')

# Input from user
print("\n🌾 Smart Crop Advisor — Test Interface\n")
sunlight = float(input("☀️  Sunlight (hours/day): "))
water = float(input("💧 Water available (L/week): "))

print("\n🌱 Soil Types:", soil_encoder.classes_)
soil = input("🌍 Soil type (type exactly): ").strip().lower()
if soil not in soil_encoder.classes_:
    print(f"❌ Error: '{soil}' is not a known soil type.")
    exit()

print("\n🗓️ Seasons:", season_encoder.classes_)
season = input("📆 Season (type exactly): ").strip().lower()
if season not in season_encoder.classes_:
    print(f"❌ Error: '{season}' is not a known season.")
    exit()

temperature = float(input("🌡️  Avg Temperature (°C): "))
humidity = float(input("💦 Humidity (%): "))

# Encode
soil_enc = soil_encoder.transform([soil])[0]
season_enc = season_encoder.transform([season])[0]

features_df = pd.DataFrame([{
    'sunlight': sunlight,
    'water': water,
    'soil_enc': soil_enc,
    'season_enc': season_enc,
    'temperature': temperature,
    'humidity': humidity
}])

# Predict
prediction = model.predict(features_df)
predicted_crop = crop_encoder.inverse_transform(prediction)[0]

# Get top 3 from neighbors
_, indices = model.kneighbors(features_df)
neighbor_labels = model._y[indices[0]]
neighbor_crops = crop_encoder.inverse_transform(neighbor_labels)

top_3 = Counter(neighbor_crops).most_common(3)

# Print top 3
print("\n🎯 Top 3 Recommended Crops:")
for i, (crop, count) in enumerate(top_3, 1):
    print(f"{i}. {crop} ({count} votes)")

# Visualise
labels, values = zip(*top_3)
plt.figure(figsize=(6, 4))
plt.bar(labels, values, color='green')
plt.title("Top 3 Crop Recommendations")
plt.xlabel("Crop")
plt.ylabel("Votes (Nearest Neighbors)")
plt.tight_layout()
plt.show()
