import { getEnvironment } from '../utilities/environment';

export default {
  environment: getEnvironment(),
  port: import.meta.env.VITE_PORT,
};
