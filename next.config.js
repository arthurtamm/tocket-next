const path = require('path');

module.exports = {
  // ... outras configurações ...
  webpack: (config) => {
    config.resolve.alias['@components'] = path.join(__dirname, 'caminho/para/seu/diretorio/components');
    return config;
  },
};
