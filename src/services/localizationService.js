const localizationService = (geoIntegrationImpl) => ({
    
    resolveAddressesToGeoCoding: (addresses) => {
        if(!Array.isArray(addresses)) throw 'There is no address to process';
        
        geoIntegrationImpl.build(addresses);

        return geoIntegrationImpl.do();
    },
});

module.exports = localizationService;