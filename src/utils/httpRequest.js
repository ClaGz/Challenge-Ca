const httpRequest = (axios) => {    
    return {
        get: (endpoint, headers = ['Content-Type: text-plain'], options = { timeout: 0 }) => {
            return axios.get(endpoint)
                .then(function (response) {
                    // handle success
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    };
}

module.exports = httpRequest;