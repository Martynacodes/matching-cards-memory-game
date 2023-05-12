// This is Object Oriented code

// Declare a class called AudioController
// This class will be responsible for playing the sounds
// We will create an instance of this class in the game class

class AudioController {
    constructor() {
      // Create a new audio object
      // This means that the variable belongs to that particular object
      // The class is a blueprint for the object that you're creating
  
      // Create a new audio object for background music
      this.bgMusic = new Audio("Assets/Audio/emeraldSeas.mp3");
      this.flipSound = new Audio("Assets/Audio/flip.wav");
      this.matchSound = new Audio("Assets/Audio/match.wav");
      this.victorySound = new Audio("Assets/Audio/victory.wav");
      this.gameOverSound = new Audio("Assets/Audio/gameOver.wav");
      this.bgMusic.volume = 0.05;
      this.bgMusic.loop = true;
    }
    startMusic() {
      this.bgMusic.play();
    }
    stopMusic() {
      // Pause the music
      this.bgMusic.pause();
      // Reset the time to 0
      this.bgMusic.currentTime = 0;
    }
    flip() {
      this.flipSound.play();
    }
    match() {
      this.matchSound.play();
    }
    victory() {
      this.stopMusic();
      this.victorySound.play();
    }
    gameOver() {
      this.stopMusic();
      this.gameOverSound.play();
    }
  }
  
  // The constructor is a special method that is called when you create a new instance of the class.
  // It only gets called once when you create a new instance of the class.
  // Versus when we call startGame(), it gets called every time we start a new game.
  class MatchCards {
    constructor(totalTime, cards) {
      // Properties on that class are set by the constructor
      this.cardsArray = cards;
      this.totalTime = totalTime;
      // This is the countdown timer. When you start the game it will be set to the total amount of time.
      this.timeRemaining = totalTime;
      // This is the timer that will be displayed on the screen
      this.timer = document.getElementById("time");
      // This is the number of matches that you have made
      this.ticker = document.getElementById("flips");
      // Create a new instance of the AudioController class
      this.audioController = new AudioController();
    }
    // Create a method called startGame
    // Set the properties that we need to set when the game starts
    startGame() {
      // When the game starts, there are no carred flipped over
      // So we set the property to null
      // We will use this property to check if the card is flipped or not
      this.cardToCheck = null;
      this.totalClicks = 0;
      this.timeRemaining = this.totalTime;
      // We will put all the cards that match into this empty array.
      // We will use this array to check if the game is over and if we have a victory or not.
      this.matchedCards = [];
      //
      this.busy = true;
    }
    flipCard(card) {
      if (this.canFlipCard(card)) {
        // Play the flip sound
        this.audioController.flip();
        // Add a click
        this.totalClicks++;
        // Update the flips count so it displays the current value of total flips
        this.ticker.innerText = this.totalClicks;
        card.classList.add("visible");
        // Should I check for a match?
        if (this.cardToCheck) {
          // Check for a match
          this.checkForCardMatch(card);
        }
      }
    }
    shuffleCards() {}
  
    canFlipCard(card) {
      // We will check whether the user can flip the card or not
      // If the busy property is true, then we can't flip the card
      // If the busy property is false, then we can flip the card
      // If you're clicking on a card that's already been matched, then you can't flip the card
      // This creates a boolean value
      //  If the busy property is false and the card is not in the matchedCards array and the card is not the cardToCheck, then we can flip the card
      // return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck);
      // If the above statement returns true, then we can flip the card
      return true;
    }
  }
  
  // Once the DOM content is loaded(once everything inside the HTML is loaded),
  // then we will call the ready() function
  
  // If the HTML content hasn't finished loading, create an event listener to listen for the DOMContentLoaded event
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready());
  } else {
    ready();
  }
  
  // There are 3 overlays we want to grab and also grab the cards.
  //
  function ready() {
    // If you grab the overlays only by .getElementsByClassName, you will get an HTML collection.
    // You can't use forEach on an HTML collection.
    // So we need to convert the HTML collection into an array.
    // We can use Array.from() to convert the HTML collection into an array.
    // Then we can use forEach on the array.
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new MatchCards(100, cards);
  
    // We want to loop over all of these and add an event listener to each of the overlays.
    // For each overlay, we want to add an event listener to listen for the click event.
    // When the click event happens, we want to remove the visible class from the overlay.
  
    overlays.forEach((overlay) => {
      // Add an event listener to each overlay
      overlay.addEventListener("click", () => {
        // Hide the overlay
        overlay.classList.remove("visible");
        // Start the game
        game.startGame();
        let audioController = new AudioController();
        audioController.startMusic();
      });
    });
    cards.forEach((card) => {
      // Add an event listener to each card
      card.addEventListener("click", () => {
        // Flip the card
        // We have access to "card" with forEach
        // We can pass in "card" as an argument to the flipCard function
        game.flipCard(card);
      });
    });
  }
  