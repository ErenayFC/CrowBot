module.exports = (sayi) => {
  let sayiStr = sayi.toString();
  let sonuc = "";

  if (sayiStr.length <= 3) {
    return sayiStr;
  }

  for (let i = sayiStr.length - 1, k = 0; i >= 0; i--, k++) {
    if (k > 0 && k % 3 === 0) {
      sonuc = "," + sonuc;
    }
    sonuc = sayiStr[i] + sonuc;
  }

  return sonuc;
};
