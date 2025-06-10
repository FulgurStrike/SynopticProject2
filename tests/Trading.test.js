const mockingoose = require('mockingoose');
const Trades = require('../models/Trading');
const mongoose = require('mongoose')

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true }); 
})

describe('Fetch Trades', () => {
  it('should return a list of Trades', async () => {
    mockingoose(Trades).toReturn([
      {
        name: "Trade 1",
        description: "Description 1",
        Price: 13.50
      },
      {
        name: "Trade 2",
        description: "Description 2",
        Price: 25
      }
    ], "find");
    const results = await Trades.find({});
    expect(results[1].Price).toBe(25);
  });
});

describe('Attempt to find a Trade which does not exist', () => {
  it('should return undefined when a Trade does not exist', async () => {
    const result = await Trades.findById("203493252424");
    expect(result).toBeUndefined();
  });
});

describe('Attempt to save a Trade with a invalid price', () => {
  it('should return an error', async () => {

    const Trade = new Trades({
      name: "Error Trade",
      description: "This will throw error",
      price: "hello"
    });

    await(expect(Trade.save())).rejects.toThrow();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
