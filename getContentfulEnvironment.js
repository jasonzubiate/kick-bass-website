const { managementClient } = require("./src/lib/contentful/managementClient");

module.exports = function () {
  return managementClient
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) =>
      space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || "master")
    );
};
