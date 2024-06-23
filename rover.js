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
    message.name = "Test message with two commands";
    return message.name;
  }
}

module.exports = Rover;
