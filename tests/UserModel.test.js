const mockingoose = require('mockingoose');
const User = require('../models/UserModel');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
});

describe('Fetch Users', () => {
  it('should return a list of users', async () => {
    mockingoose(User).toReturn([
      {
        firstName: "Test",
        lastName: "User",
        email: "test@user.com",
        password: "password"
      },
      {
        firstName: "Test",
        lastName: "User 2",
        email: "test2@user.com",
        password: "password2"
      }
    ], "find");
    const results = await User.find({});
    expect(results[0].firstName).toBe("Test");
  });
});

describe('Attempt to find a User which does not exist', () => {
  it('should return undefined when a User does not exist', async () => {
    const result = await User.findById("203493252424");
    expect(result).toBeUndefined();
  });
});

describe('Attempt to save a user without a first name', () => {
  it('should return an error', async () => { 
    const user = new User({
      lastName: "User",
      email: "test@user.com",
      password: "password"
    })

    await expect(user.save()).rejects.toThrow();
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});
