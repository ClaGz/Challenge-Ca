const { localizationService } = require('../services');

//TODO: fazer por injeção;
exports.post = async (req, res, next) => {
    try {
        const { body: addresses } = req;
    
        console.log('Iniciando verificação dos endereços recebidos');
        
        const geoCodedAddresses = await localizationService.resolveAddressesToGeoCoding(addresses);

        return res.status(201).send('Requisição recebida com sucesso!');
    } catch (error) {
        console.log('OOPs')
        console.error(error);
    }    
};