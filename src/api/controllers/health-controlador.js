const { version } = require('../../../package.json');

function obterSaude(req, res) {
  res.status(200).json({
    status: 'ok',
    servico: 'kronox-customer-wallet-core',
    versao: version,
    ambiente: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
}

module.exports = { obterSaude };
