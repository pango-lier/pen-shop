export const delay = (s): Promise<void> =>
  new Promise((rs) => setTimeout(rs, s * 1000));

export function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function objectToString(obj, ndeep = 5) {
  const res = {};
  for (const key in obj) {
    res[key] = {};
    for (const prop in obj[key]) {
      const parsed = parseInt(obj[key][prop], 10);
      res[key][prop] = isNaN(parsed) ? obj[key][prop] : parsed;
    }
  }
  return res;
}
