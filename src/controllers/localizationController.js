const { localizationService } = require('../services');

const orderDistances = (distanceList, asc = true) => {
    return distanceList.sort((currentDistance, nextDistance) => {
        const { distanceBetween: currentDistanceBetween } = currentDistance;
        const { distanceBetween: nextDistanceBetween } = nextDistance;

        if (currentDistanceBetween > nextDistanceBetween) {
            return 1;
        }
        if (currentDistanceBetween < nextDistanceBetween) {
            return -1;
        }

        return 0;
    });
}
//TODO: fazer por injeção;
exports.post = async (req, res, next) => {
    try {
        const { body: addresses } = req;
        const geoCodedAddresses = await localizationService.resolveAddressesToGeoCoding(addresses);
        //TODO: verificar se o endereço é o mesmo que foi passado

        //TODO: renomear
        const responseFromDistanceCalc = localizationService.calculateDistanceBeetweenCodedAddresses(geoCodedAddresses.flatMap(it => it && it.results));
        
        return res.status(201).send(orderDistances(responseFromDistanceCalc));
    } catch (error) {
        console.log('OOPs')
        console.error(error);
    }    
};