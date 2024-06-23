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

  function receiveMessage(message) {
   return 'Test message with two commands';
  }
}

module.exports = Rover;
