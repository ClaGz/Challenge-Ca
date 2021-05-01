const { localizationService } = require("../services");

module.exports = {
  localizationController: require("./localizationController")(
    localizationService
  ),
};
