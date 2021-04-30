const googleAPIService = (httpRequestImpl, baseEndpoint, apiKey) => {

    return {
        getGeoLocalization: (address) => {
            const { 
                city, 
                state,
                number,
                street,
                postalCode,
                neighborhood  
            } = address;
            const endpoint = `${baseEndpoint}?address=${number} ${street}, ${city}, ${state}&key=${apiKey}`.replace(/\s+/g, '+'); 
            return httpRequestImpl.get(endpoint);
        },
    };
};

module.exports = googleAPIService;