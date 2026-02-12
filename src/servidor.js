const { aplicacao } = require('./aplicacao');
const port = aplicacao.get('port');

aplicacao.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
