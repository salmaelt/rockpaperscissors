// Rock-Paper-Scissors Game using Class Structure

class Player {
    constructor(name) {
        this.name = name;
        this.choice = null;
    }

    makeChoice(choice) {
        const validChoices = ['rock', 'paper', 'scissors'];
        if (validChoices.includes(choice.toLowerCase())) {
            this.choice = choice.toLowerCase();
        } else {
            console.log("Invalid choice. Choose rock, paper, or scissors.");
        }
    }
}

class Game {
    static rules = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    playRound() {
        if (!this.player1.choice || !this.player2.choice) {
            console.log("Both players must make a choice!");
            return;
        }

        const p1 = this.player1.choice;
        const p2 = this.player2.choice;

        console.log(`${this.player1.name} chose ${p1}`);
        console.log(`${this.player2.name} chose ${p2}`);

        if (p1 === p2) {
            console.log("It's a tie!");
        } else if (Game.rules[p1] === p2) {
            console.log(`${this.player1.name} wins!`);
        } else {
            console.log(`${this.player2.name} wins!`);
        }

        // Reset choices for next round
        this.player1.choice = null;
        this.player2.choice = null;
    }

    static getRandomChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }
}

// Node.js input for player vs computer
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const player1 = new Player("You");
const computer = new Player("Computer");
const rpsGame = new Game(player1, computer);

readline.question("Enter rock, paper, or scissors: ", (input) => {
    player1.makeChoice(input);
    computer.makeChoice(Game.getRandomChoice());
    rpsGame.playRound();
    readline.close();
});