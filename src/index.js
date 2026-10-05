import app from './app';
import config from './config/app';

app.listen(config.port, () => {
  console.log(`Started ${config.environment} server on port ${config.port}`);
});

export const butcher = app;
