const contentfulManagement = require("contentful-management");
require("dotenv").config();

const managementClient = contentfulManagement.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

module.exports = { managementClient };
