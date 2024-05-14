import { Server } from '@/infrastructure/express';
import 'dotenv/config';

const server = new Server();

async function shutDown(signal: NodeJS.Signals) {
  console.log('[POD-CONTROL] => Señal arrojada terminacion de proceso', signal);

  //Cerrando conexiones y servidores
  await Promise.all([server.stop()]).then(() => {
    console.log('[POD-CONTROL] => Terminando aplicacion...');
    process.nextTick(process.exit(0));
  });

  setTimeout(() => {
    console.log('[API] => Conexiones no cerradas a tiempo, forzando cierre');
    process.exit(1);
  }, 10000);
}

async function startup() {
  console.log('[APP] => Inicializando aplicacion.');
  try {
    server.start();
  } catch (error) {
    console.log(
      '[API] => No fue posible iniciar la aplicacion, saliendo...',
      error
    );
    shutDown('SIGINT');
  }
}

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);

/* Inicio de la aplicacion */
startup();
