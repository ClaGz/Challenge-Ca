const GoogleBadRequest = require("../errors/googleBadRequest");
const GoogleRequestDenied = require("../errors/googleRequestDenied");

//TODO: refatorar;
const httpRequest = (axios) => {
  return {
    get: (
      endpoint,
      headers = ["Content-Type: text-plain"],
      options = { timeout: 0 }
    ) => {
      return axios
        .get(endpoint)
        .then(function (response) {
          const { data } = response;

          if (data.error_message) {
            throw new GoogleRequestDenied(data.error_message);
          }
          return response.data;
        })
        .catch(function (error) {
          console.error(
            JSON.stringify({
              statusCode: error.response.status,
              message: error.response.data.error_message,
            })
          );
          if (error.response.status === 400) {
            throw new GoogleBadRequest(
              "Erro ao realizar request para o a API do Google."
            );
          }

          throw error;
        });
    },
  };
};

module.exports = httpRequest;
