# Weather Service API

A simple RESTful API service that provides weather information using OpenWeatherMap API.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in root directory:
```env
PORT=3000
OPENWEATHER_API_KEY=your_api_key_here
```

3. Get API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Copy your API key from your account dashboard
   - Paste it in `.env` file

4. Start server:
```bash
npm start
```

## API Usage

- Base URL: `http://localhost:3000`
- API Documentation: `http://localhost:3000/api-docs`

### Get Weather
```
GET /api/weather?lat={latitude}&lon={longitude}
```

Example:
```bash
curl "http://localhost:3000/api/weather?lat=40.7128&lon=-74.0060"
```
