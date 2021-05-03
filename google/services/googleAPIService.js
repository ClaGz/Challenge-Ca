const GoogleBadRequest = require('../errors/googleBadRequest');
const GoogleRequestDenied = require('../errors/googleRequestDenied');

const erroHandler = (error) => {
  const { response } = error;
  if (response) {
    console.error(
      JSON.stringify({
        statusCode: response.status,
        message: response.data.error_message,
      }),
    );
    if (response.status === 400) throw new GoogleBadRequest('Erro ao realizar request para o a API do Google.');
  }
  throw error;
};

const googleAPIService = (httpRequestImpl, baseEndpoint, apiKey) => {
  return {
    getGeoLocalization: (address) => {
      console.log('GoogleAPIService - Iniciando a construção do request para buscara as geolocalizações do endereço');
      console.debug(address);

      const { city, state, number, street } = address;
      const endpoint = `${baseEndpoint}?address=${number} ${street}, ${city}, ${state}&key=${apiKey}`.replace(
        /\s+/g,
        '+',
      );
      return httpRequestImpl
        .get(endpoint)
        .then(({ data }) => {
          if (data.error_message) throw new GoogleRequestDenied(data.error_message);

          return data;
        })
        .catch(erroHandler);
    },
  };
};

module.exports = googleAPIService;
