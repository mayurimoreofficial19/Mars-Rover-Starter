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
    if (!position) {
      throw Error("position required.");
    }
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    let results = [];
    for (let index = 0; index < Command.length; index++) {
      if (commands[index].commandType == "STATUS_CHECK") {
        results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
      } else if (commands[index].commandType == "MODE_CHANGE") {
        results.push({ completed: true });
      } else if (commands[index].value == "LOW_POWER") {
        results.push({ completed: false });
      }
    }
    let response = { message: message.name, results: results };
    return response;
  }
}

let rover = new Rover(98382);

let response = rover.receiveMessage(message);
console.log("Object length : " + Object.keys(response).length);
console.log(response);

module.exports = Rover;
