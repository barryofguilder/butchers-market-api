import app from './app';
import config from './config/app';

// In dev, vite-plugin-node serves the app through Vite's own server, and this module is
// re-evaluated on every reload, so listening here would collide with the previous instance.
if (import.meta.env.PROD) {
  app.listen(config.port, () => {
    console.log(`Started ${config.environment} server on port ${config.port}`);
  });
}

export const butcher = app;
