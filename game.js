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
    
    constructor(humanPlayer, computerPlayer, maxRounds) {
        this.humanPlayer = humanPlayer;
        this.computerPlayer = computerPlayer;
        this.maxRounds = maxRounds;
        this.currentRound = 0;
    }
    
    playRound() {
        if (!this.humanPlayer.choice || !this.computerPlayer.choice) {
            console.log("Both players must make a choice!");
            return;
        }

        this.currentRound++;
        const humanChoice = this.humanPlayer.choice;
        const computerChoice = this.computerPlayer.choice;

        console.log(`\n--- Round ${this.currentRound} ---`);
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
        
        if (this.currentRound >= this.maxRounds) {
            this.endGame();
            return true; // Game is over
        }
        
        return false; // Game continues
    }
    
    endGame() {
        console.log(`\n=== GAME OVER ===`);
        console.log(`Final Score: ${this.humanPlayer.name}: ${this.humanPlayer.score}, ${this.computerPlayer.name}: ${this.computerPlayer.score}`);
        
        if (this.humanPlayer.score > this.computerPlayer.score) {
            console.log(`${this.humanPlayer.name} wins the game!`);
        } else if (this.computerPlayer.score > this.humanPlayer.score) {
            console.log(`${this.computerPlayer.name} wins the game!`);
        } else {
            console.log(`It's a tie game!`);
        }
        
        this.askPlayAgain();
    }
    
    askPlayAgain() {
        rl.question("\nWould you like to play again? (yes/no): ", (answer) => {
            const response = answer.toLowerCase().trim();
            
            if (response === 'yes' || response === 'y') {
                // Reset scores and start new game with same player name
                this.humanPlayer.score = 0;
                this.computerPlayer.score = 0;
                this.currentRound = 0;
                
                const askForRounds = () => {
                    rl.question("How many rounds would you like to play this time? ", (rounds) => {
                        const maxRounds = parseInt(rounds);
                        
                        if (isNaN(maxRounds) || maxRounds <= 0) {
                            console.log("Please enter a valid number of rounds (1 or more).");
                            askForRounds();
                            return;
                        }
                        
                        this.maxRounds = maxRounds;
                        console.log(`\nGreat! ${this.humanPlayer.name} vs Computer`);
                        console.log(`Playing ${maxRounds} round${maxRounds > 1 ? 's' : ''}.\n`);
                        
                        askForChoice();
                    });
                };
                
                askForRounds();
            } else if (response === 'no') {
                console.log("Thanks for playing!");
                rl.close();
            } else {
                console.log("Please enter 'yes' or 'no'.");
                this.askPlayAgain();
            }
        });
    }
}

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let human, computer, game;

function startGame() {
    console.log("=== Welcome to Rock Paper Scissors! ===\n");
    
    rl.question("Enter your name: ", (playerName) => {
        const name = playerName.trim() || "Player";
        
        function askForRounds() {
            rl.question("How many rounds would you like to play? ", (rounds) => {
                const maxRounds = parseInt(rounds);
                
                if (isNaN(maxRounds) || maxRounds <= 0) {
                    console.log("Please enter a valid number of rounds (1 or more).");
                    askForRounds(); // Only re-ask for rounds
                    return;
                }
                
                human = new HumanPlayer(name);
                computer = new ComputerPlayer("Computer");
                game = new Game(human, computer, maxRounds);
                
                console.log(`\nGreat! ${name} vs Computer`);
                console.log(`Playing ${maxRounds} round${maxRounds > 1 ? 's' : ''}.\n`);
                
                askForChoice();
            });
        }
        
        askForRounds();
    });
}

function askForChoice() {
    rl.question(`(Round ${game.currentRound + 1}/${game.maxRounds}) Enter rock, paper, scissors, or type 'quit' to stop playing `, (input) => {
        if (input.toLowerCase() === 'quit') {
            console.log("Thanks for playing!");
            if (game.currentRound > 0) {
                game.endGame();
            } else {
                rl.close();
            }
            return;
        }

        human.makeChoice(input);
        if (!human.choice) {
            askForChoice();
            return;
        }

        computer.makeChoice();
        const gameOver = game.playRound();
        
        if (gameOver) {
            // Don't close rl here, let endGame handle it
            return;
        }
        
        askForChoice();
    });
}

startGame();
