const weatherService = require('../services/weatherService');
const { validateCoordinates } = require('../utils/helpers');

/**
 * Get weather information by coordinates
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getWeatherByCoordinates = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    // Validate coordinates
    const validationError = validateCoordinates(lat, lon);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Get weather data
    const weatherData = await weatherService.getWeatherData(lat, lon);
    res.json(weatherData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWeatherByCoordinates
}; 