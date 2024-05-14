import express, { Express } from 'express';
import cors from 'cors';
import { router } from '../routes';
import { morganMiddleware as morgan } from '../middlewares';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import apiHealth from '../api-health/api-health.routes';

export class Server {
  public app: Express;
  private port: string;
  private httpTerminator: HttpTerminator;

  constructor() {
    this.app = express();
    this.port = process.env.PORT as string;
    this.middlewares();
    this.routes();
    this.httpTerminator = {} as HttpTerminator;
  }

  middlewares() {
    this.app.use(morgan);
    this.app.use(cors({ origin: true }));

    /* Paseo atumatico de requests */
    /* body: content-type x-ww-form-urlencoded */
    this.app.use(
      express.urlencoded({
        parameterLimit: 100000,
        limit: '50mb',
        extended: true
      })
    );

    /* body: content-type application/json */
    this.app.use(
      express.json({
        limit: '50mb'
      })
    );

    /* body: content-type text/plain*/
    this.app.use(express.text());
  }

  routes() {
    this.app.use(router);
    /* Rutas para monitorear la salud de la API */
    this.app.use('/', apiHealth);
  }

  start = () => {
    const server = this.app
      .listen(this.port, () => {
        console.log('[EXPRESS] Esta inicializado en el puerto: ', this.port);
        this.httpTerminator = createHttpTerminator({ server });
        console.log('[EXPRESS] => httpTerminator inicializado');
      })
      .on('error', (e) => {
        console.log('[EXPRESS] => Error al inicializar express: ', e.message);
        process.kill(process.pid, 'SIGINT');
      });
  };

  stop = async () => {
    if (!this.httpTerminator) {
      console.log('[EXPRESS] - httpTerminator no está definido');
      return;
    }
    console.log('[EXPRESS] - Terminando servicios rest');
    return await this.httpTerminator.terminate();
  };
}
