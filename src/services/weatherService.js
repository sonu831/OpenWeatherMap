const axios = require('axios');
const { getTemperatureCategory } = require('../utils/helpers');

class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY;
    this.weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
    this.geoUrl = 'http://api.openweathermap.org/geo/1.0/reverse';
  }

  /**
   * Get location details using reverse geocoding
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise<Object>} Location data
   */
  async getLocationDetails(lat, lon) {
    try {
      const response = await axios.get(this.geoUrl, {
        params: {
          lat,
          lon,
          limit: 1,
          appid: this.apiKey
        }
      });

      if (response.data && response.data.length > 0) {
        const location = response.data[0];
        return {
          city: location.name,
          country: location.country,
          state: location.state
        };
      }
      return { city: 'Unknown', country: 'Unknown' };
    } catch (error) {
      console.error('Geocoding API Error:', error.message);
      return { city: 'Unknown', country: 'Unknown' };
    }
  }

  /**
   * Get weather data from OpenWeatherMap API
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise<Object>} Weather data
   */
  async getWeatherData(lat, lon) {
    try {
      // Get location details first
      const locationDetails = await this.getLocationDetails(lat, lon);

      // Get weather data
      const response = await axios.get(this.weatherUrl, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const { main, weather, wind } = response.data;

      return {
        location: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          city: locationDetails.city,
          country: locationDetails.country,
          state: locationDetails.state
        },
        current: {
          condition: this.getWeatherCondition(weather[0].main),
          temperature: {
            celsius: Math.round(main.temp),
            fahrenheit: Math.round((main.temp * 9/5) + 32),
            category: getTemperatureCategory(main.temp)
          },
          description: weather[0].description,
          humidity: main.humidity,
          windSpeed: wind.speed,
          pressure: main.pressure,
          timestamp: new Date().toISOString()
        },
        alerts: {
          hasAlerts: false,
          alerts: []
        }
      };
    } catch (error) {
      if (error.response) {
        throw new Error(`OpenWeatherMap API Error: ${error.response.data.message}`);
      }
      throw new Error('Failed to fetch weather data');
    }
  }

  /**
   * Get standardized weather condition
   * @param {string} condition - Weather condition from API
   * @returns {string} Standardized condition
   */
  getWeatherCondition(condition) {
    const conditions = {
      'Clear': 'clear',
      'Clouds': 'cloudy',
      'Rain': 'rain',
      'Drizzle': 'rain',
      'Thunderstorm': 'thunderstorm',
      'Snow': 'snow',
      'Mist': 'foggy',
      'Fog': 'foggy',
      'Smoke': 'foggy',
      'Haze': 'foggy'
    };
    return conditions[condition] || condition.toLowerCase();
  }
}

module.exports = new WeatherService(); 