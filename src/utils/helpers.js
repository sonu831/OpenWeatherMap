// Temperature thresholds and categories
const HOT_TEMP_THRESHOLD = 25;
const COLD_TEMP_THRESHOLD = 10;
const TEMP_CATEGORY_HOT = 'hot';
const TEMP_CATEGORY_COLD = 'cold';
const TEMP_CATEGORY_MODERATE = 'moderate';

/**
 * Validate latitude and longitude coordinates
 * @param {string|number} lat - Latitude
 * @param {string|number} lon - Longitude
 * @returns {string|null} Error message or null if valid
 */
const validateCoordinates = (lat, lon) => {
  if (!lat || !lon) {
    return 'Latitude and longitude are required';
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    return 'Invalid coordinates format';
  }

  if (latitude < -90 || latitude > 90) {
    return 'Latitude must be between -90 and 90 degrees';
  }

  if (longitude < -180 || longitude > 180) {
    return 'Longitude must be between -180 and 180 degrees';
  }

  return null;
};

/**
 * Get temperature category based on Celsius temperature
 * @param {number} tempCelsius - Temperature in Celsius
 * @returns {string} Temperature category
 */
const getTemperatureCategory = (tempCelsius) => {
  if (tempCelsius >= HOT_TEMP_THRESHOLD) return TEMP_CATEGORY_HOT;
  if (tempCelsius <= COLD_TEMP_THRESHOLD) return TEMP_CATEGORY_COLD;
  return TEMP_CATEGORY_MODERATE;
};

module.exports = {
  validateCoordinates,
  getTemperatureCategory
}; 