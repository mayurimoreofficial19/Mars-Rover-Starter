const Message = require("./message.js");
const Command = require("./command.js");

class Rover {
  // Write code here!
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    let results = [];
    for (let index = 0; index < commands.length; index++) {
      if (commands[index].commandType === "STATUS_CHECK") {
        results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
      } else if (commands[index].commandType === "MODE_CHANGE") {
        results.push({ completed: true });
      } else if (commands[index].value === "LOW_POWER") {
        results.push({ completed: false });
        this.mode = commands.value;
      } else if (commands[index].value === "NORMAL") {
        results.push({ completed: true });
      } else if (commands[index].commandType === "MOVE") {
        results.push({
          completed: true,
          roverStatus: {
            position: this.position,
          },
        });
      }
    }
    return { message: message.name, results: results };
  }
}

let commands = [
  new Command("MODE_CHANGE", "LOW_POWER"),
  new Command("STATUS_CHECK"),
];
let rover = new Rover(4321);
let message = new Message("Test message with two commands", commands);
let responds = rover.receiveMessage(message);

console.log("{");
for (let key in responds) {
  console.log(key + " : ", responds[key]);
  // if (responds.hasOwnProperty(key)) {
  //   console.log(key + " : ", responds[key]);
  //   //console.log(key, response[key]);
  // }
}
console.log("}");

module.exports = Rover;
