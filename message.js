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

module.exports = Message;
