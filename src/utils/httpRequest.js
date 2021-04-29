const httpRequest = (axios, endpoint, apiKey) => {
    // const API_KEY = process.env.GOOGLE_API_KEY;
    // const ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`;
    // ?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}
    const attributes = {
        apiKey,
        endpoint,
        addresses: [],
    };

    console.log('APIO - ', apiKey);

    return {
        build: (addresses) => {
            attributes.addresses = addresses;
        },
        do: ({
            method = 'GET',
            getParams = {},
            headers = ['Content-Type: text-plain'],
            timeout = 0,
          } = {}) => {
            //TODO: precisaremos criar um endpoint com os valores da lista de endereços ou fazer um map para um promise.all
            const { endpoint } = attributes;
            
            return axios.get(endpoint)
                .then(function (response) {
                    // handle success
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    };
}

module.exports = httpRequest;