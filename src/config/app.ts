import { getEnvironment } from '../utilities/environment';

export default {
  environment: getEnvironment(),
  port: Number(import.meta.env.VITE_PORT),
};
