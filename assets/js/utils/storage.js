export const getLocal = (key) => localStorage.getItem(key) || "";
export const setLocal = (key, value) => localStorage.setItem(key, value);