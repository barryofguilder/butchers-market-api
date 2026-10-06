/**
 * Creates an error with an HTTP status. The error middleware sends 4xx errors back with their
 * message as the `detail`, so the message should make sense to the person using the admin UI.
 *
 * @param status The HTTP status to respond with.
 * @param message The message to send back as the error's `detail`.
 * @returns Returns the error, ready to throw.
 */
export function httpError(status: number, message: string) {
  return Object.assign(new Error(message), { status });
}
