const { rotasApi } = require('./api');
const { criarAplicacaoExpress } = require('./config');
const { naoEncontrado, tratadorErro } = require('./compartilhado');

const aplicacao = criarAplicacaoExpress();
aplicacao.use('/api/v1', rotasApi);

aplicacao.use(naoEncontrado);
aplicacao.use(tratadorErro);

module.exports = { aplicacao };
