export const validateYear = (year) => {
  const y = Number(year);
  return y >= 1887 && y <= new Date().getFullYear();
};