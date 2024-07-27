const moment = require("moment");

class Konsol {
  constructor() {
    this.log = this.log.bind(this);
  }

  convertHexToRgb(hex) {
    const hexValue = hex.replace("#", "");
    const red = parseInt(hexValue.substring(0, 2), 16);
    const green = parseInt(hexValue.substring(2, 4), 16);
    const blue = parseInt(hexValue.substring(4, 6), 16);
    return { red, green, blue };
  }

  log(text, name = "Crow", options = { hex: this.randomHexCode(), timeout: 1 }) {
    const rgbColor = this.convertHexToRgb(options.hex);
    const white = this.convertHexToRgb("#ffffff");
    let beyaz = `\x1b[38;2;${white.red};${white.green};${white.blue}m`;
    const coloredText = `\x1b[1m\x1b[38;2;${rgbColor.red};${rgbColor.green};${
      rgbColor.blue
    }m[${moment().format("DD-MM-YYYY HH:mm:ss")}]${beyaz} - \x1b[38;2;${
      rgbColor.red
    };${rgbColor.green};${
      rgbColor.blue
    }m[${name}]\x1b[0m${beyaz} ${text}\x1b[0m`;
    if (!options.timeout) return console.log(coloredText);
    setTimeout(() => {
      console.log(coloredText);
    }, options.timeout);
  }

  error(text, name = "Crow", options = { timeout: 1 }) {
    this.log(text, name, { hex: "#ff0000", timeout: options.timeout });
  }

  randomHexCode() {
    let letters = "0123456789abcdef";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

module.exports = Konsol;
