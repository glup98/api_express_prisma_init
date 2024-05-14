import morgan, { StreamOptions } from 'morgan';

//log http
const stream: StreamOptions = {
  write: (message) => console.log(`[REQUEST] => ${message.trim()}`)
};

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);
