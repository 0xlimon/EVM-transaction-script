// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PositiveMessages {
    string[] private messages;

    constructor() {
        messages.push("Keep going!");
        messages.push("You're amazing!");
        messages.push("Stay positive!");
        messages.push("Believe in yourself!");
        messages.push("You can do it!");
        messages.push("Great job!");
        messages.push("Never give up!");
        messages.push("Success is near!");
        messages.push("Stay focused!");
        messages.push("Keep pushing forward!");
        messages.push("You're a star!");
        messages.push("Keep smiling!");
        messages.push("You're doing great!");
        messages.push("Stay strong!");
        messages.push("You rock!");
        messages.push("Dream big!");
        messages.push("Be awesome!");
        messages.push("You are loved!");
        messages.push("Stay humble!");
        messages.push("Keep learning!");
        messages.push("Stay kind!");
        messages.push("Keep shining!");
        messages.push("You can achieve anything!");
        messages.push("Stay motivated!");
        messages.push("You have the power!");
        messages.push("Be unstoppable!");
        messages.push("You are capable!");
        messages.push("Stay brave!");
        messages.push("Keep moving forward!");
        messages.push("Stay determined!");
        messages.push("You are resilient!");
        messages.push("Keep thriving!");
        messages.push("You are a warrior!");
        messages.push("Stay confident!");
        messages.push("Keep dreaming!");
        messages.push("Stay hopeful!");
        messages.push("You are strong!");
        messages.push("Keep going strong!");
        messages.push("You are incredible!");
        messages.push("Stay joyful!");
        messages.push("Keep smiling bright!");
        messages.push("You are a champion!");
        messages.push("Stay patient!");
        messages.push("Keep believing!");
        messages.push("You are magnificent!");
        messages.push("Stay fearless!");
        messages.push("Keep aspiring!");
        messages.push("You are brilliant!");
    }

    function getRandomMessage() public view returns (string memory) {
        uint randomIndex = uint(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % messages.length;
        return messages[randomIndex];
    }
}
