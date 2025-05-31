const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OpenWeatherMap Service API',
      version: '1.0.0',
      description: 'A RESTful API service that provides weather information using OpenWeatherMap API',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        WeatherResponse: {
          type: 'object',
          properties: {
            location: {
              type: 'object',
              properties: {
                latitude: { type: 'number', example: 40.7128 },
                longitude: { type: 'number', example: -74.0060 },
                city: { type: 'string', example: 'New York' },
                country: { type: 'string', example: 'US' }
              }
            },
            current: {
              type: 'object',
              properties: {
                condition: { 
                  type: 'string', 
                  enum: ['clear', 'cloudy', 'rain', 'thunderstorm', 'snow', 'foggy'],
                  example: 'clear'
                },
                temperature: {
                  type: 'object',
                  properties: {
                    celsius: { type: 'number', example: 22 },
                    fahrenheit: { type: 'number', example: 72 },
                    category: { 
                      type: 'string', 
                      enum: ['hot', 'moderate', 'cold'],
                      example: 'moderate'
                    }
                  }
                },
                description: { type: 'string', example: 'clear sky' },
                humidity: { type: 'number', example: 65 },
                windSpeed: { type: 'number', example: 3.5 },
                pressure: { type: 'number', example: 1012 },
                timestamp: { type: 'string', format: 'date-time' }
              }
            },
            alerts: {
              type: 'object',
              properties: {
                hasAlerts: { type: 'boolean', example: false },
                alerts: {
                  type: 'array',
                  items: {
                    type: 'object'
                  }
                }
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                status: { type: 'number' }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the API docs
};

module.exports = swaggerJsdoc(options); 