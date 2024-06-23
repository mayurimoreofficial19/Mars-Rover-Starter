const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

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
      new Rover(position);
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
    });
  });

  //Rover Test 8
  test("response returned by receiveMessage contains the name of the message", function () {
    let rover = new Rover({ a: 0, b: 0 });
    let message = {};
    let response = rover.receiveMessage(message);
    expect(response).toBe("Test message with two commands");
  });

  //Rover Test 9
});
