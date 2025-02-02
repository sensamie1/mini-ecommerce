const request = require('supertest');
const app = require('../index'); // Import the Express app
const sequelize = require('../config/sequelize'); // Import Sequelize instance

// Increase Jest timeout to 20 seconds (default is 5s)
jest.setTimeout(20000);

beforeAll(async () => {
  try {
    await sequelize.authenticate(); // Ensure DB connection before tests
    console.log('Test DB connected successfully');
  } catch (error) {
    console.error('Test DB connection failed:', error);
  }
});

afterAll(async () => {
  try {
    await sequelize.close(); // Close DB connection after tests
    console.log('Test DB connection closed');
  } catch (error) {
    console.error('Error closing DB connection:', error);
  }
});

describe('Mini E-Commerce API', () => {
  it('should return a success message from the home route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Success! Welcome to Mini-Ecommerce App.');
  });

  it('should return a 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toEqual(404);
  });
});
