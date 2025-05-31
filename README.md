# Weather Service API

A clean and efficient RESTful API service that provides real-time weather information using the OpenWeatherMap API. This service offers a simple, well-documented interface for retrieving weather data based on geographical coordinates.

## 🌟 Features

- **Real-time Weather Data**: Get current weather conditions, temperature, humidity, and wind speed
- **Temperature Categorization**: Automatically categorizes temperatures as hot (≥25°C), cold (≤10°C), or moderate
- **Standardized Weather Conditions**: Consistent weather condition mapping across different weather states
- **Comprehensive API Documentation**: Interactive Swagger UI documentation for easy API exploration
- **Input Validation**: Robust coordinate validation and error handling
- **Clean Architecture**: Well-structured codebase following separation of concerns

## 🛠️ Technical Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Axios**: HTTP client for API requests
- **Swagger/OpenAPI**: API documentation
- **dotenv**: Environment variable management

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-service-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
OPENWEATHER_API_KEY=your_api_key_here
```

4. Get your API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - The free tier includes 60 calls/minute and 1,000,000 calls/month

## 🚀 Usage

Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:3000`

## 📚 API Documentation

Interactive API documentation is available at `http://localhost:3000/api-docs`

### Available Endpoints

#### GET /api/weather
Retrieve current weather information for a location.

**Query Parameters:**
- `lat` (required): Latitude (-90 to 90)
- `lon` (required): Longitude (-180 to 180)

**Example Request:**
```bash
curl "http://localhost:3000/api/weather?lat=40.7128&lon=-74.0060"
```

**Example Response:**
```json
{
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "city": "New York",
    "country": "US"
  },
  "current": {
    "condition": "clear",
    "temperature": {
      "celsius": 22,
      "fahrenheit": 72,
      "category": "moderate"
    },
    "description": "clear sky",
    "humidity": 65,
    "windSpeed": 3.5,
    "pressure": 1012,
    "timestamp": "2024-02-20T15:30:00.000Z"
  },
  "alerts": {
    "hasAlerts": false,
    "alerts": []
  }
}
```

## 🏗️ Project Structure

```
weather-service-api/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Helper functions
│   └── config/         # Configuration files
├── .env               # Environment variables
├── .gitignore        # Git ignore file
├── package.json      # Project dependencies
└── server.js         # Application entry point
```

## 🔍 Implementation Details

### Architecture
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and API integration
- **Routes**: Define API endpoints and middleware
- **Utils**: Provide helper functions and validations

### Key Features Implementation
1. **Weather Service**
   - Uses OpenWeatherMap's Current Weather API
   - Implements temperature conversion and categorization
   - Standardizes weather conditions for consistent responses

2. **Input Validation**
   - Validates geographical coordinates
   - Provides clear error messages for invalid inputs
   - Handles API errors gracefully

3. **API Documentation**
   - Swagger UI for interactive documentation
   - Detailed endpoint descriptions
   - Request/response examples
   - Error response schemas

## 🧪 Testing

The application includes comprehensive error handling and input validation. To test the API:

1. Start the server
2. Visit `http://localhost:3000/api-docs`
3. Use the Swagger UI to test endpoints
4. Try different coordinate combinations
5. Test error scenarios (invalid coordinates, missing API key)

## 🔒 Security Considerations

- API keys are stored in environment variables
- Input validation prevents invalid requests
- Error messages don't expose sensitive information
- Rate limiting (handled by OpenWeatherMap API)

## 📝 Future Enhancements

Potential improvements for future versions:
- Add more weather data points
- Support for weather forecasts
- Add unit and integration tests
- Implement caching for better performance
- Add request logging for monitoring

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the ISC License. 