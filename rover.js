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
    for (let index = 0; index < message.commands.length; index++) {
      if (message.commands[index].commandType === "STATUS_CHECK") {
        results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
      } else if (message.commands[index].commandType === "MODE_CHANGE") {
        results.push({ completed: true });
        this.mode = message.commands[index].value;
      } else if (message.commands[index].commandType === "MOVE") {
        if (this.mode === "NORMAL") {
          this.position = message.commands[index].value;
          results.push({ completed: true });
        } else {
          results.push({ completed: false });
        }
      }
    }
    return { message: message.name, results: results };
  }
}

// let rover = new Rover(100);
// let commands = [
//   new Command("MOVE", 4321),
//   new Command("STATUS_CHECK"),
//   new Command("MODE_CHANGE", "LOW_POWER"),
//   new Command("MOVE", 3579),
//   new Command("STATUS_CHECK"),
// ];

let commands = [
  new Command("MODE_CHANGE", "LOW_POWER"),
  new Command("STATUS_CHECK"),
];
let message = new Message("Test message with two commands", commands);
let rover = new Rover(98382);
let response = rover.receiveMessage(message);
console.log(response);

module.exports = Rover;
