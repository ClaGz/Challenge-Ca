//TODO: Tratar erros e refatorar;
const httpRequest = (axios) => {    
    return {
        get: (endpoint, headers = ['Content-Type: text-plain'], options = { timeout: 0 }) => {
            return axios.get(endpoint)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
}

module.exports = httpRequest;