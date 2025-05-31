const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const logger = require('./src/middleware/logger');

// Load environment variables
dotenv.config();

// Import routes
const weatherRoutes = require('./src/routes/weatherRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "OpenWeatherMap Service API Documentation"
}));

// Routes
app.use('/api/weather', weatherRoutes);

// Root route for API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'OpenWeatherMap Service API',
    documentation: {
      swagger: '/api-docs',
      endpoints: {
        '/api/weather': {
          method: 'GET',
          description: 'Get weather information by coordinates',
          parameters: {
            lat: 'Latitude (required)',
            lon: 'Longitude (required)'
          },
          example: '/api/weather?lat=40.7128&lon=-74.0060'
        }
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server is running on port ${PORT}`);
  console.log(`[${new Date().toISOString()}] API Documentation available at http://localhost:${PORT}/api-docs`);
}); 