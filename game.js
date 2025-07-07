const readline = require("readline");

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0
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

/*class HumanPlayer extends Player {
    constructor(name = "human"){

    }
}

class ComputerPlayer extends Player {
    constructor

}

class Game {

}*/