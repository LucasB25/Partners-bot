const { ChalkError } = require("./CustomError");
const chalk = require("chalk");
let chalkcolor = {
  red(message) {
    if (!message) throw new ChalkError("Not text found !");
    return chalk.red(message);
  },
  black(message) {
    if (!message) throw new ChalkError("Not text found !");
    return chalk.black(message);
  },
  green(message) {
    if (!message) throw new ChalkError("Not text found !");
    return chalk.green(message);
  },
  yellow(message) {
    if (!message) throw new ChalkError("Not text found !");
    return chalk.yellow(message);
  },
  magenta(message) {
    if (!message) throw new ChalkError("Not text found !");
    return chalk.magenta(message);
  },
  blue(message) {
    if (!message) throw new ChalkError("Not text found !");
    return chalk.blue(message);
  },
  cyanBright(message) {
    if (!message) throw new ChalkError("Not text found !");
    return chalk.cyanBright(message);
  },
};

let messagecolor = {
  red: 0xf52e2e,
  yellow: 0xf5f52e,
  orange: 0xf5ad2e,
  green: 0x76d813,
  cyan: 0x13d8cf,
  blue: 0x33a2ff,
  darkblue: 0x131cd8,
  purple: 0x8a13d8,
  pink: 0xd813d8,
  white: 0xffffff,
  gray: 0x9e9e9e,
  black: 0x000000,
  blurple: 0x7289da,
  greyple: 0x99aab5,
};

module.exports = {
  chalkcolor,
  messagecolor,
};
