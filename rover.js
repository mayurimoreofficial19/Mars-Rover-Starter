const Message = require("./message.js");
const Command = require("./command.js");

let commands = [
  new Command("MODE_CHANGE", "LOW_POWER"),
  new Command("STATUS_CHECK"),
];

let message = new Message("Test message with two commands", commands);

class Rover {
  // Write code here!
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    let results = [];
    for (let index = 0; index < Command.length; index++) {
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
        // mode: this.mode;
        results.push({ completed: true });
      } else if (commands[index].value === "LOW_POWER") {
        results.push({
          completed: false,
          roverStatus: {
            mode: "LOW_POWER",
            generatorWatts: 110,
            position: 4321,
          },
        });
      } else if (commands[index].value === "NORMAL") {
        results.push({
          completed: true,
          roverStatus: {
            mode: "NORMAL",
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
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

let rover = new Rover(4321);
let response = rover.receiveMessage(message);
console.log("{");
for (let key in response) {
  if (response.hasOwnProperty(key)) {
    console.log(key + " : ", response[key]);
    //console.log(key, response[key]);
  }
}
console.log("}");

module.exports = Rover;
