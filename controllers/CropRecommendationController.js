const cropRecommendtionContent = {
  title: "Crop Recommendation"
};

exports.renderCropRecommendationPage = (req, res) => {
  res.render("cropRecommendationPage", cropRecommendtionContent);
}

const { spawn } = require('child_process');
const path = require('path');

exports.getPrediction = (req, res) => {
  const {
    soil, sunlight, water_added, plot_size, season
  } = req.body;

  const seasonalConditions = {
    summer: { temperature: 26, humidity: 55, rainfall: 80 },
    winter: { temperature: 16, humidity: 70, rainfall: 10 }
  };
  console.log("Request body:", req.body);

  const { temperature, humidity, rainfall } = seasonalConditions[season];
  const water_per_m2 = (parseFloat(water_added) / parseFloat(plot_size)) + rainfall;

  const python = spawn('python', [
    path.join(__dirname, '../cropRecML/predictFromInput.py')
  ]);

  const input = {
    soil: soil,
    sunlight: Number(sunlight),
    temperature,
    humidity,
    water_per_m2
  };

  let output = '';

  python.stdout.on('data', data => {
    output += data.toString();
  });

  python.stderr.on('data', err => {
    console.error(`Python error: ${err.toString()}`);
  });

  python.on('close', code => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Python script failed.' }); // only res status for now
    }

    try {
      const result = JSON.parse(output);
      res.json(result); // e.g. { recommended_crop: "spinach", top_3: [...] }
    } catch (e) {
      res.status(500).json({ error: 'Invalid response from Python script.' }); // only res status for now
    }
  });

  python.stdin.write(JSON.stringify(input));
  python.stdin.end();
};
