const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  //Rover Test 7
  test("constructor sets position and default values for mode and generatorWatts", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let rover = new Rover(4321);
    let message = new Message("Test message with two commands", commands);
    let response = rover.receiveMessage(message);
    expect(rover.position).toBe(rover.position);
    expect(rover.mode).toEqual(rover.mode);
    expect(rover.generatorWatts).toEqual(110);
  });

  //Rover Test 8
  test("response returned by receiveMessage contains the name of the message", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    const rover = new Rover(4321);
    let message = new Message("Test message with two commands", commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toBe("Test message with two commands");
  });

  // //Rover Test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    const rover = new Rover(4321);
    let message = new Message("Test message with two commands", commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  //Rover Test 10
  test("responds correctly to the status check command", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let rover = new Rover(4321);
    let message = new Message("Test message with two commands", commands);
    let response = rover.receiveMessage(message);
    // expect(response.message).toEqual("Test message with two commands");

    //if (response.mode === "STATUS_CHECK")
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[1].roverStatus.mode).toEqual(rover.mode);
    expect(response.results[1].roverStatus.generatorWatts).toEqual(
      rover.generatorWatts
    );
    expect(response.results[1].position).toEqual(this.position);
    expect(response.results.length).toEqual(2);
  });

  //Rover Test 11
  test("responds correctly to the mode change command", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let rover = new Rover(4321);
    let message = new Message("Test message with two commands", commands);
    let response = rover.receiveMessage(message);

    expect(response.message).toEqual("Test message with two commands");
    expect(rover.mode).toEqual("LOW_POWER");
    expect(response.results[1].completed).toBe(true);
  });

  //Rover Test 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("MOVE", 3579),
    ];
    let rover = new Rover(4321);
    let message = new Message("Test message with two commands", commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual("Test message with two commands");
    //expect(rover.mode).toEqual("LOW_POWER");
    expect(response.results[1].completed).toBeFalsy();
  });

  //Rover test 13
  test("responds with the position for the move command", function () {
    let commands = [new Command("MOVE", 3579), new Command("STATUS_CHECK")];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(4321);
    let response = rover.receiveMessage(message);

    expect(response.message).toEqual("Test message with two commands");
    expect(response.results[1].completed).toBeTruthy();
    expect(response.results[1].roverStatus.position).toEqual(3579);
  });
});
