//TODO: Fazer as validações do que chega no request com middlewares
exports.post = (req, res, next) => {
    res.status(201).send('Requisição recebida com sucesso!');
};