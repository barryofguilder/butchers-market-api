export type Environment = 'development' | 'test' | 'production';

/**
 * Gets the name of the current environment.
 *
 * @returns Returns the name of the current environment.
 */
export function getEnvironment(): Environment {
  if (import.meta.env.MODE === 'test') {
    return 'test';
  }

  return import.meta.env.PROD === true ? 'production' : 'development';
}
