const readline = require("readline");

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0
    }
    getName(){
        return this.name;
    }

    getScore() {
        return this.score;
    }

    incrementScore() {
        this.score++;
    }

    resetScore() {
        this.score = 0;
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

class HumanPlayer extends Player {
    constructor(name = "human"){
        super(name);
        this.choice = null;
    }

    makeChoice() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`${this.name}, please enter your choice (rock, paper, scissors): `, (answer) => {
            super.makeChoice(answer);
            rl.close();
        });
    }
    
    resetChoice() {
        this.choice = null;
    }
}

class ComputerPlayer extends Player {
    constructor(name = "computer") {
        super(name);
        this.choice = null;}
    
    makeChoice() {
        const choices = ['rock', 'paper', 'scissors']
        this.choice = [Math.floor(Math.random() * choices.length)];
        console.log(`${this.name} chose ${this.choice}`);
    }

}

class Game {
    static rules = {
        rock: "rock",
        paper: "paper",
        scissors: "scissors"
    };
    
    constructor(HumanPlayer, ComputerPlayer) {
        this.HumanPlayer = HumanPlayer
        this.ComputerPlayer = ComputerPlayer
    };
    
    static random() {
        const choices = ["rock", "paper", "scissors"]
    }
}
