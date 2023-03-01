export const delay = (s): Promise<void> =>
  new Promise((rs) => setTimeout(rs, s * 1000));

export function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
