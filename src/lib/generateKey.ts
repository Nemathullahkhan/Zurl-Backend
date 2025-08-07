export const generateKey = (num: number) => {
  const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let res = "";

  while (num > 0) {
    var b = num % 62;
    var a = s[b] ? s[b] : "";
    res = a + res;
    num = Math.floor(num / 62);
  }
  return res;
};
