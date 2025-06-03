# generateSyntheticData.py
import pandas as pd
import numpy as np
import random

# ---------------------------
# CROP PROFILES (tailored to South Africa)
# ---------------------------
crops = [
    {
        "name": "spinach",
        "seasons": ["winter", "summer"],
        "soil": ["loamy", "clay"],
        "sunlight": (4, 7),
        "water_mm": (15, 30),
        "temp": (10, 25),
        "humidity": (50, 80)
    },
    {
        "name": "amaranth",
        "seasons": ["summer"],
        "soil": ["sandy", "loamy"],
        "sunlight": (6, 9),
        "water_mm": (10, 20),
        "temp": (20, 35),
        "humidity": (30, 60)
    },
    {
        "name": "kale",
        "seasons": ["winter"],
        "soil": ["loamy", "clay"],
        "sunlight": (5, 8),
        "water_mm": (20, 40),
        "temp": (10, 22),
        "humidity": (50, 75)
    },
    {
        "name": "tomatoes",
        "seasons": ["summer"],
        "soil": ["loamy"],
        "sunlight": (6, 9),
        "water_mm": (30, 50),
        "temp": (20, 30),
        "humidity": (50, 70)
    },
    {
        "name": "lettuce",
        "seasons": ["winter"],
        "soil": ["loamy", "sandy"],
        "sunlight": (4, 6),
        "water_mm": (15, 25),
        "temp": (10, 20),
        "humidity": (60, 85)
    },
    {
        "name": "chillies",
        "seasons": ["summer"],
        "soil": ["loamy", "sandy"],
        "sunlight": (7, 9),
        "water_mm": (15, 30),
        "temp": (22, 32),
        "humidity": (40, 65)
    },
    {
        "name": "carrots",
        "seasons": ["winter"],
        "soil": ["loamy", "sandy"],
        "sunlight": (6, 8),
        "water_mm": (20, 30),
        "temp": (12, 25),
        "humidity": (50, 75)
    },
    {
        "name": "cabbage",
        "seasons": ["winter"],
        "soil": ["loamy", "clay"],
        "sunlight": (5, 7),
        "water_mm": (25, 40),
        "temp": (10, 22),
        "humidity": (60, 85)
    },
    {
        "name": "green beans",
        "seasons": ["summer"],
        "soil": ["loamy"],
        "sunlight": (6, 8),
        "water_mm": (25, 35),
        "temp": (18, 30),
        "humidity": (50, 70)
    },
    {
        "name": "beetroot",
        "seasons": ["winter", "summer"],
        "soil": ["loamy", "sandy"],
        "sunlight": (5, 7),
        "water_mm": (20, 30),
        "temp": (15, 28),
        "humidity": (50, 80)
    },
    {
        "name": "lentils",
        "seasons": ["winter"],
        "soil": ["loamy", "sandy"],
        "sunlight": (6, 8),
        "water_mm": (10, 25),
        "temp": (10, 25),
        "humidity": (30, 60)
    },
    {
        "name": "spring onions",
        "seasons": ["winter", "summer"],
        "soil": ["loamy", "sandy"],
        "sunlight": (5, 7),
        "water_mm": (20, 30),
        "temp": (12, 28),
        "humidity": (50, 75)
    },
]

# ---------------------------
# SEASONAL CLIMATE DATA (Makers Valley)
# ---------------------------
seasonal_conditions = {
    "summer": {"temperature": 26, "humidity": 55, "rainfall": 80},  # mm per week
    "winter": {"temperature": 16, "humidity": 70, "rainfall": 10},
}

soil_types = ["loamy", "sandy", "clay"]

# ---------------------------
# Generate synthetic rows
# ---------------------------
rows = []
for _ in range(5000):
    season = random.choice(["summer", "winter"])
    soil = random.choice(soil_types)
    sunlight = np.random.randint(4, 10)
    plot_size = np.random.randint(3, 15)  # m^2
    water_supplied = np.random.randint(0, 50)  # L/week

    # Convert all water to mm/m^2/week (1 L = 1 mm over 1 m^2)
    rainfall = seasonal_conditions[season]["rainfall"]
    water_per_m2 = (water_supplied / plot_size) + rainfall
    temp = seasonal_conditions[season]["temperature"]
    humidity = seasonal_conditions[season]["humidity"]

    # Pick a valid crop based on growing constraints
    valid_crops = []
    for crop in crops:
        if season not in crop["seasons"]:
            continue
        if soil not in crop["soil"]:
            continue
        if not (crop["sunlight"][0] <= sunlight <= crop["sunlight"][1]):
            continue
        if not (crop["water_mm"][0] <= water_per_m2 <= crop["water_mm"][1]):
            continue
        if not (crop["temp"][0] <= temp <= crop["temp"][1]):
            continue
        if not (crop["humidity"][0] <= humidity <= crop["humidity"][1]):
            continue
        valid_crops.append(crop["name"])

    if valid_crops:
        crop_name = random.choice(valid_crops)
        rows.append([soil, sunlight,temp, humidity, water_per_m2, crop_name])

# ---------------------------
# Save to CSV
# ---------------------------
cols = ["soil", "sunlight","temperature", "humidity", "water_per_m2", "crop"]
df = pd.DataFrame(rows, columns=cols)
df.to_csv("urban_crop_dataset.csv", index=False)
print("✅ Synthetic dataset with valid conditions saved to 'urban_crop_dataset.csv'")
