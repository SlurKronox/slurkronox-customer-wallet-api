const { version } = require('../../../package.json');
const { sucesso } = require('../../compartilhado');

function obterSaude(req, res) {
  sucesso(res, 200, {
    status: 'ok',
    servico: 'kronox-customer-wallet-core',
    versao: version,
    ambiente: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
}

module.exports = { obterSaude };
