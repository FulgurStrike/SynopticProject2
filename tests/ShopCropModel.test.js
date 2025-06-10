const mockingoose = require('mockingoose');
const ShopCropModel = require('../models/ShopCropModel');
const mongoose = require('mongoose')

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true }); 
})

describe('Fetch Crops', () => {
  it('should return a list of Shop Crops', async () => {
    mockingoose(ShopCropModel).toReturn([
      {
        name: "Test Crop 1",
        quantity: 25,
      },
      {
        name: "Test Crop 2",
        quantity: 999
      }
    ], "find");
    const results = await ShopCropModel.find({});
    expect(results[1].quantity).toBe(999);
  });
});

describe('Attempt to find a Shop Crop that does not exist', () => {
  it('should return undefined when a Shop Crop does not exist', async () => {
    const result = await ShopCropModel.findById('23483025824809234');
    expect(result).toBeUndefined();
  });
});


describe('Attempt to save a Trade with an invalid quantity value', () => {
  it('should return an error', async () => {

    const ShopCrop = new ShopCropModel({
      name: "Error",
      quantity: "Error value"
    });

    await(expect(ShopCrop.save())).rejects.toThrow();
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});
