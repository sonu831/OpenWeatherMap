const axios = require('axios');
const { getTemperatureCategory } = require('../utils/helpers');

class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds
  }

  /**
   * Get weather data from OpenWeatherMap API with caching
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise<Object>} Weather data
   */
  async getWeatherData(lat, lon) {
    const cacheKey = `${lat},${lon}`;
    const cachedData = this.getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const { main, weather, wind, sys, name } = response.data;
      const weatherData = {
        location: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          city: name,
          country: sys.country
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

      // Cache the data
      this.cacheData(cacheKey, weatherData);
      return weatherData;
    } catch (error) {
      if (error.response) {
        throw new Error(`OpenWeatherMap API Error: ${error.response.data.message}`);
      }
      throw new Error('Failed to fetch weather data');
    }
  }

  /**
   * Get cached weather data if available and not expired
   * @param {string} key - Cache key
   * @returns {Object|null} Cached data or null
   */
  getCachedData(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Cache weather data with timestamp
   * @param {string} key - Cache key
   * @param {Object} data - Weather data to cache
   */
  cacheData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
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