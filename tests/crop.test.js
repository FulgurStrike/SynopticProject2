const mockingoose = require('mockingoose');
const crop = require('../models/crop');

describe('Fetch Crops', () => {
  it('should return a list of crops', async () => {
    mockingoose(crop).toReturn([
      {
        name: "Test Crop",
        description: "Description",
        cycle: "Annual",
        droughttolerant: "Yes",
        watering: "Average",
        sun: ["Full Sun"],
        growthrate: "Low",
        fruitsin: "Ready in Autumn"
      },
      {
        name: "Test Crop 2",
        description: "Description 2",
        cycle: "Winter",
        droughttolerant: "No",
        watering: "High",
        sun: ["Partial Shade"],
        growthrate: "High",
        fruitsin: "Ready in Spring"
      }
    ], "find");
    const results = await crop.find({});
    expect(results[1].cycle).toBe('Winter');
  });
});

describe('Attempt to find a crop which does not exist', () => {
  it('should return undefined when a crop does not exist', async () => {
    const result = await crop.findById("203493252424");
    expect(result).toBeUndefined();
  });
});

describe('Attempt to save a crop with a invalid cycle value', () => {
  it('should return an error', async () => {
    mockingoose(crop).toReturn(new Error('Invalid cycle value'), 'save');

    return crop.create({
      name: "Test Crop 2",
      description: "Description 2",
      cycle: 4,
      droughttolerant: "No",
      watering: "High",
      sun: ["Partial Shade"],
      growthrate: "High",
      fruitsin: "Ready in Spring"
    }).catch(err => { expect(err.message).toBe('Invalid cycle value') });
  });
});

