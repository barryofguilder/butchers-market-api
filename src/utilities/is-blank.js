export const isBlank = function (field) {
  return field === undefined || field === null || field.trim() === '';
};
