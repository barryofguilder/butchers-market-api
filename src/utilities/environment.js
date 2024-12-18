/**
 * Gets the name of the current environment.
 *
 * @returns Returns the name of the current environment.
 */
export function getEnvironment() {
  return import.meta.env.PROD === true ? 'production' : 'development';
}
