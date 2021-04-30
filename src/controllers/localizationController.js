const { localizationService } = require('../services');

//TODO: fazer por injeção;
//FIXME: Validar timeout com requests muito grandes
exports.post = async (req, res, next) => {
    try {
        const { body: addresses } = req;
        const geoCodedAddresses = await localizationService.resolveAddressesToGeoCoding(addresses);
        //TODO: verificar se o endereço é o mesmo que foi passado

        //TODO: renomear
        const responseFromDistanceProcessor = localizationService.processDistanceBeetweenCodedAddresses(geoCodedAddresses.flatMap(it => it && it.results));

        return res.status(201).send(responseFromDistanceProcessor);
    } catch (error) {
        console.error(error);
        //FIXME: Tratar esse erro
        throw error;
    }    
};