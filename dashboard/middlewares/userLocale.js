// Locale table
const locales = {
    'id': 'Indonesian',
    'da': 'Danish',
    'de': 'German',
    'en-GB': 'English, UK',
    'en-US': 'English, US',
    'es-ES': 'Spanish',
    'es-419': 'Spanish, LATAM',
    'fr': 'French',
    'hr': 'Croatian',
    'it': 'Italian',
    'lt': 'Lithuanian',
    'hu': 'Hungarian',
    'nl': 'Dutch',
    'no': 'Norwegian',
    'pl': 'Polish',
    'pt-BR': 'Portuguese, Brazilian',
    'ro': 'Romanian, Romania',
    'fi': 'Finnish',
    'sv-SE': 'Swedish',
    'vi': 'Vietnamese',
    'tr': 'Turkish',
    'cs': 'Czech',
    'el': 'Greek',
    'bg': 'Bulgarian',
    'ru': 'Russian',
    'uk': 'Ukrainian',
    'hi': 'Hindi',
    'th': 'Thai',
    'zh-CN': 'Chinese, China',
    'ja': 'Japanese',
    'zh-TW': 'Chinese, Taiwan',
    'ko': 'Korean'
  };
  
  // Middleware to get user's language and match it with locale
  module.exports = ((req, res, next) => {
    const acceptLanguage = req.headers['accept-language'];
    if (acceptLanguage) {
      const userLanguage = acceptLanguage.split(',')[0];
      req.userLocale = Object.keys(locales).find(locale => userLanguage.startsWith(locale)) || 'en-US'; // Default to 'en-US' if not specified
    } else {
      req.userLocale = 'en-US';
    }
    next();
  });