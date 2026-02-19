const { aplicacao } = require('./aplicacao');
const portaInicial = Number(aplicacao.get('port')) || 3000;
const usarPortaFixa = Boolean(process.env.PORT);

function iniciarServidor(porta, tentativa = 0) {
  const servidor = aplicacao.listen(porta);

  servidor.once('listening', () => {
    const endereco = servidor.address();
    const portaFinal = Number(endereco && endereco.port ? endereco.port : porta);
    aplicacao.set('port', portaFinal);
    console.log(`Servidor rodando na porta ${portaFinal}`);
  });

  servidor.once('error', (erro) => {
    if (erro && erro.code === 'EADDRINUSE') {
      if (usarPortaFixa) {
        console.error(`Porta ${porta} em uso. Defina outra porta em PORT.`);
        process.exit(1);
      }

      const proximaPorta = porta + 1;
      const proximaTentativa = tentativa + 1;

      if (proximaTentativa > 20) {
        console.error('Nao foi possivel iniciar o servidor: portas 3000-3020 ocupadas.');
        process.exit(1);
      }

      console.warn(`Porta ${porta} em uso, tentando ${proximaPorta}...`);
      iniciarServidor(proximaPorta, proximaTentativa);
      return;
    }

    throw erro;
  });
}

iniciarServidor(portaInicial);
