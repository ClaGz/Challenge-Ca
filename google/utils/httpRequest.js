const httpRequest = (axios) => {
  console.log("Realizando o request");
  return {
    get: (endpoint) => {
      return axios.get(endpoint);
    },
  };
};

module.exports = httpRequest;
