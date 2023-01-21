const startDB = require("../db/connection");

class Loaders {
  start() {
    startDB();
  }
}

module.exports = new Loaders();
