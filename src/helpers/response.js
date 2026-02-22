const positive = (service, message, data = null) => {
  return { error: false, service, message, data };
};

const negative = (service, message, err = null, data = null) => {
  if (err) console.error(`[${service}] ${message}:`, err);
  return { error: true, service, message, data };
};

module.exports = { positive, negative };
