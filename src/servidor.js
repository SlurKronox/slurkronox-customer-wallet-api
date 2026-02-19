const { aplicacao } = require('./aplicacao');
const { logger } = require('./compartilhado');

const portaInicial = Number(aplicacao.get('port')) || 3000;
const usarPortaFixa = Boolean(process.env.PORT);
const MAX_TENTATIVAS = 20;

let servidorAtivo = null;
let encerrando = false;

function iniciarServidor(porta, tentativa = 0) {
  const servidor = aplicacao.listen(porta);

  servidor.once('listening', () => {
    servidorAtivo = servidor;
    const endereco = servidor.address();
    const portaFinal = Number(endereco && endereco.port ? endereco.port : porta);
    aplicacao.set('port', portaFinal);
    logger.info('Servidor iniciado com sucesso', { porta: portaFinal });
  });

  servidor.once('error', (erro) => {
    if (erro && erro.code === 'EADDRINUSE') {
      if (usarPortaFixa) {
        logger.error('Porta fixa em uso. Defina outra porta em PORT.', { porta });
        process.exit(1);
      }

      const proximaPorta = porta + 1;
      const proximaTentativa = tentativa + 1;

      if (proximaTentativa > MAX_TENTATIVAS) {
        logger.error('Nao foi possivel iniciar o servidor: limite de tentativas atingido.', {
          portaInicial,
          ultimaPortaTentada: porta,
          tentativas: proximaTentativa,
        });
        process.exit(1);
      }

      logger.warn('Porta em uso, tentando proxima porta', {
        portaAtual: porta,
        proximaPorta,
      });
      iniciarServidor(proximaPorta, proximaTentativa);
      return;
    }

    logger.error('Falha inesperada ao iniciar servidor', {
      erro: erro && erro.message ? erro.message : 'Sem mensagem',
    });
    process.exit(1);
  });
}

function encerrarServidor(sinal) {
  if (encerrando) {
    return;
  }

  encerrando = true;

  if (!servidorAtivo) {
    logger.info('Processo encerrado sem servidor ativo', { sinal });
    process.exit(0);
  }

  logger.info('Encerrando servidor', { sinal });
  servidorAtivo.close((erro) => {
    if (erro) {
      logger.error('Falha ao encerrar servidor', {
        sinal,
        erro: erro.message,
      });
      process.exit(1);
    }

    logger.info('Servidor encerrado com sucesso', { sinal });
    process.exit(0);
  });
}

process.on('SIGINT', () => encerrarServidor('SIGINT'));
process.on('SIGTERM', () => encerrarServidor('SIGTERM'));

iniciarServidor(portaInicial);
