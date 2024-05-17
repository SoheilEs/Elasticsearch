const { Client } = require("@elastic/elasticsearch");
const { ELASTIC_USERNAME, ELASTIC_PASSWORD, ELASTIC_URL } = process.env;
const elasticClient = new Client({
  node: ELASTIC_URL,
  auth: {
    username: ELASTIC_USERNAME,
    password: ELASTIC_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  elasticClient,
};
