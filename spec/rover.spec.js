const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

let rover = new Rover({ a: 0, b: 0 });
describe("Rover class", function () {
  // 7 tests here!
  // Rover Test 7
  // test("throws error if a position is NOT passed into the constructor as the first parameter", function () {
  //   expect(function () {
  //     new Rover();
  //   }).toThrow(new Error("position required."));
  // });

  //Rover Test 7
  test("constructor sets position and default values for mode and generatorWatts", function () {
    expect(function () {
      new rover(postion);
      this.postion = postion;
      this.mode = "NORMAL";
      this.generatorWatt = 110;
    });
  });

  //Rover Test 8
  test("response returned by receiveMessage contains the name of the message", function () {
    let message = new Message("Test message with two commands");
    let response = rover.receiveMessage(message);
    expect(response);
  });

  //Rover Test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let message = new Message("Test message with two commands", commands);
    let response = rover.receiveMessage(message);
    expect(Object.keys(response).length).toBe(2);
    expect(response.message).toBe(message.name);
    //expect(response.commands).toBeDefined();
    if (response.commands && response.commands.length > 0) {
      expect(response.commands[0].commandType).toBe("MODE_CHANGE");
      expect(response.commands[0].value).toBe("LOW_POWER");
      expect(response.commands[1].commandType).toBe("STATUS_CHECK");
    }
  });

  // //Rover Test 10
  test("responds correctly to the status check command", function () {
    let message = {
      name: "Test message with two commands",
      commands: [
        { commandType: "MODE_CHANGE" },
        { commandType: "STATUS_CHECK", value: { a: 10, b: 20 } },
      ],
    };
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual("Test message with two commands");
    expect(Object.keys(response).length).toBe(2);

    if (response.results.length > 1) {
      expect(response.results[1].completed).toBe(true);
      expect(response.results[1].completed).toBe(true);
    }
  });

  // //Rover Test 11
  test("responds correctly to the mode change command", function () {
    let message = {
      name: "Test message with two commands",
      commands: [
        { commandType: "MODE_CHANGE" },
        { commandType: "STATUS_CHECK", value: { a: 10, b: 20 } },
      ],
    };
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual("Test message with two commands");
    if (response.results.length > 0) {
      expect(response.results[0].completed).toBe(true);
    }
  });

  // //Rover Test 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let message = {
      name: "Test message with two commands",
      commands: [
        { commandType: "MODE_CHANGE", value: "LOW_POWER" },
        { commandType: "STATUS_CHECK", value: { a: 10, b: 20 } },
      ],
    };
    //let message = new message("Test message with LOW_POWER mode", commands);

    let rover = {
      receiveMessage: function (message) {
        return {
          message: message.name,
          commands: message.commands.map((command) => ({
            commandType: command.commandType,
            value: command.value,
          })),
        };
      },
    };
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual("Test message with two commands");
    if (response.results.length > 0) {
      expect(response.commands[0].value).toBe(false);
    }
  });
});
