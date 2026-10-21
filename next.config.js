const path = require('path');
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    loadPaths: [path.join(__dirname, "styles/Base")],
  },
};
