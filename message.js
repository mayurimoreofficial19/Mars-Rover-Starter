class Message {
  // Write code here!
  constructor(name, command) {
    this.name = name;
    if (!name) {
      throw Error("name required.");
    }
    this.command = command;
  }
}

// let command = [
//   new command("MODE_CHANGE", "LOW_POWER"),
//   new command("STATUS_CHECK"),
// ];
// let message = new message("Test message with two commands", command);

module.exports = Message;
