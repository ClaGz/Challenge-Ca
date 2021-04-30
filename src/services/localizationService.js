const calculateDistance = (from, to) => {
    if(!to || !from) throw new Error('Impossível calcular a distância sem origem e destino');

    const toLatInteger = Math.abs(Number.parseFloat(to.lat));
    const toLngInteger = Math.abs(Number.parseFloat(to.lng));
    const fromLatInteger = Math.abs(Number.parseFloat(from.lat));
    const fromLngInteger = Math.abs(Number.parseFloat(from.lng));

    const latDifference = fromLatInteger - toLatInteger;
    const lngDifference = fromLngInteger - toLngInteger;

    const sqrtSum = Math.pow(latDifference, 2) + Math.pow(lngDifference, 2);

    return Math.sqrt(sqrtSum, 2);
}

const localizationService = (integrationServiceImpl) => ({
    
    resolveAddressesToGeoCoding: (addresses) => {
        if(!Array.isArray(addresses)) throw 'Não há endereços para serem processados';

        console.log('Iniciando verificação dos endereços recebidos');
        
        return Promise.all(addresses.map((address) => {
            return integrationServiceImpl.getGeoLocalization(address);
        }));
    },
    calculateDistanceBeetweenCodedAddresses: (geoCodedAddresses) => {
        let indexMarker = 1;
        const controlObject = {};
        const response = [];
        
        for(var i = 0; i < geoCodedAddresses.length; i++ ){
            for(var y = indexMarker; y < geoCodedAddresses.length; y++ ) {
                const [ addressFromI, addressFromY ] = [ geoCodedAddresses[i], geoCodedAddresses[y] ];

                const id = `${addressFromI.place_id};#;${addressFromY.place_id}`;

                if (controlObject[id] === undefined) {
                    controlObject[id] = true;
                    const distanceBetween = calculateDistance(addressFromI.geometry.location, addressFromY.geometry.location);

                    response.push({
                        distanceBetween,
                        to: addressFromY.formatted_address,
                        from: addressFromI.formatted_address,
                    });
                }
            }
            indexMarker += 1;
        }
        return response;
    }
});

module.exports = localizationService;