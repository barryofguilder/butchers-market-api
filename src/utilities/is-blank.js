/**
 * Checks if a field is blank.
 *
 * @param field The field to check if it is blank.
 * @returns Returns true if the field is blank, otherwise false.
 */
export function isBlank(field) {
  return field === undefined || field === null || field.trim() === '';
}
