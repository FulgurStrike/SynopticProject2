# predict.py
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Load the dataset
df = pd.read_csv("urban_crop_dataset.csv")

# Encode categorical features
soil_encoder = LabelEncoder()
crop_encoder = LabelEncoder()

df["soil_enc"] = soil_encoder.fit_transform(df["soil"])
df["crop_enc"] = crop_encoder.fit_transform(df["crop"])

# Select features (numerical + encoded)
features = ["soil_enc", "sunlight", "temperature", "humidity", "water_per_m2"]
X = df[features]
y = df["crop_enc"]

# Train KNN model (k=25)
model = KNeighborsClassifier(n_neighbors=50)
model.fit(X, y)

# Save model and encoders
joblib.dump(model, "knn_crop_model.pkl")
joblib.dump(soil_encoder, "soil_encoder.pkl")
joblib.dump(crop_encoder, "crop_encoder.pkl")

print("✅ Model and encoders saved.")
