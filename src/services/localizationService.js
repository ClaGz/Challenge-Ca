const localizationService = (integrationServiceImpl) => ({
    
    resolveAddressesToGeoCoding: (addresses) => {
        if(!Array.isArray(addresses)) throw 'There is no address to process';
        
        return Promise.all(addresses.map((address) => {
            return integrationServiceImpl.getGeoLocalization(address);
        }));
    },
});

module.exports = localizationService;