const readline = require("readline");

class Player {
    constructor(name) {
        this.name = name;
        this.choice = null;
        this.score = 0;
    }

}

class HumanPlayer extends Player {
    constructor(human){
        super(human);
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
    
    resetChoice() {
        this.choice = null;
    }
}

class ComputerPlayer extends Player {
    constructor(name = "Computer") {
        super(name);
        this.choice = null;
    }
    
    makeChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        this.choice = choices[Math.floor(Math.random() * choices.length)];
    }

    resetChoice() {
        this.choice = null;
    }
}

class Game {
    static rules = {
        rock: "scissors",
        paper: "rock", 
        scissors: "paper"
    };
    
    constructor(humanPlayer, computerPlayer) {
        this.humanPlayer = humanPlayer;
        this.computerPlayer = computerPlayer;
    }
    
    playRound() {
        if (!this.humanPlayer.choice || !this.computerPlayer.choice) {
            console.log("Both players must make a choice!");
            return;
        }

        const humanChoice = this.humanPlayer.choice;
        const computerChoice = this.computerPlayer.choice;

        console.log(`${this.humanPlayer.name} chose ${humanChoice}`);
        console.log(`${this.computerPlayer.name} chose ${computerChoice}`);

        if (humanChoice === computerChoice) {
            console.log("It's a tie!");
        } else if (Game.rules[humanChoice] === computerChoice) {
            console.log(`${this.humanPlayer.name} wins!`);
            this.humanPlayer.score++;
        } else {
            console.log(`${this.computerPlayer.name} wins!`);
            this.computerPlayer.score++;
        }

        // Reset choices for next round
        this.humanPlayer.resetChoice();
        this.computerPlayer.resetChoice();

        console.log(`Score: ${this.humanPlayer.name}: ${this.humanPlayer.score}, ${this.computerPlayer.name}: ${this.computerPlayer.score}`);
    }

}

// Game loop implementation
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const human = new HumanPlayer("You");
const computer = new ComputerPlayer("Computer");
const game = new Game(human, computer);

function askForChoice() {
    rl.question("Enter rock, paper, scissors, or type 'exit' to quit: ", (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log("Thanks for playing!");
            game.score;
            rl.close();
            return;
        }

        human.makeChoice(input);
        if (!human.choice) {
            askForChoice();
            return;
        }

        computer.makeChoice();
        game.playRound();
        game.score;
        askForChoice();
    });
}

console.log("Welcome to Rock Paper Scissors!");
askForChoice();
