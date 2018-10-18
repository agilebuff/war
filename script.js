       //Global Variables
       var suits = ["spades", "hearts", "clubs", "diams"];
       var cardFace = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
       var cards = [];
       var players = [[],[]];
       var firstRun = true;
       var gameover = false;
       var timer;
       var r = 0;
       var fightButton = document.querySelector("#btnBattle");
       var fightButton10 = document.querySelector("#btnBattle10");
       var fightButton50 = document.querySelector("#btnBattle50");
       var p1 = document.querySelector("#player1 .hand");
       var p2 = document.querySelector("#player2 .hand");
       var s1 = document.querySelector("#player1 .score");
       var s2 = document.querySelector("#player2 .score");
       //Event Listeners
       fightButton.addEventListener('click', battle);
       fightButton10.addEventListener('click', function(){
           rounds(10);
       });
       fightButton50.addEventListener('click', function(){
           rounds(50);
       });
       //Functions
       //rounds function used by multiple runs buttons
       function rounds(a) {
           r=a;
           timer = setInterval(function(){
              battle() 
           },100);
       }
       //battle function queues the game
       function battle() {
           if(timer){
               r--;
               outputMessage("Rounds remaining " + r);
               if(r<1){
                   window.clearInterval(timer);
               }
           }
           if(firstRun){
               firstRun = false;
               buildCards();
               shuffleArray(cards);
               dealCards(cards);
           }
           attack();
           //console.log('works');
       }
       //attack function is players playing the game
       function attack() {
           if (!gameover) {
               var card1 = players[0].shift();
               var card2 = players[1].shift();
               var pot = [card1, card2];
               //Update html
               p1.innerHTML = showCard(card1, 0);
               p2.innerHTML = showCard(card2, 0);
               //Check winner
               checkWinner(card1,card2,pot);
               //Update scores
               s1.innerHTML = players[0].length;
               s2.innerHTML = players[1].length;
           } else {
               outputMessage("Game over");
           }
       }

       //message instead of console log
       function outputMessage(message) {
           document.getElementById("message").innerHTML = message;
       }
       //checkWinner compares the card values and picks a winner!
       function checkWinner(card1,card2,pot) {
           if ((players[0].length < 4) || (players[1].length < 4)) {
               message.innerHTML = ("Game Over");
               gameover = true;
               return;
           }

           if(card1.cardValue > card2.cardValue) {
               outputMessage("Player 1 WINS");
               players[0] = players[0].concat(pot);
           } 
           else if (card1.cardValue < card2.cardValue) {
               outputMessage("Player 2 WINS!");
               players[1] = players[1].concat(pot);
           }
           else {
               outputMessage("tie");
               //enter battle mode
               battleMode(pot);
               outputMessage("BattleMode Entered!");
           }
           //console.log(players);
       }

       //battleMode is the ultimate decider of ties
       function battleMode(pot) {
           var card1, card2;
           var position = (pot.length/2);
           if ((players[0].length < 4) || (players[1].length < 4)) {
               return;
           } else {
               for(var i = 0; i < 4; i++) {
                   card1 = players[0].shift();
                   pot = pot.concat(card1);
                   p1.innerHTML += showCard(card1,(position+i));
               }
               for(var i = 0; i < 4; i++) {
                   card2 = players[1].shift();
                   pot = pot.concat(card2);
                   p2.innerHTML += showCard(card2,(position+i));
               }
               checkWinner(card1, card2, pot);
           }
       }

       //showCard function displays the card
       function showCard(c, p) {
           var move = p * 40;
           //var bgColor = (c.icon == "H" || c.icon == "D") ? "red" : "black";
           var bCard = '<div class="icard '+c.suit+' " style="left:'+move+'px">';
           bCard += '<div class="cardtop suit">' + c.num + '<br></div>';
           bCard += '<div class="cardmid suit"></div>';
           bCard += '<div class="cardbottom suit">' + c.num + '<br></div></div>';
           //console.log(c, move);
           return bCard;
       }
       //buildCards function creates a deck of cards (52)
       function buildCards() {
           cards = [];
           for(s in suits){
               var suitNew = suits[s][0].toUpperCase();
               for(n in cardFace) {
                   var card = {
                       suit: suits[s],
                       num: cardFace[n],
                       cardValue: parseInt(n) + 2,
                       icon: suitNew
                   }
                   cards.push(card);
               }
           }
           //console.log(cards);
       }
       //dealCards function pushes cards into each players (2) hands
       function dealCards(array) {
           for (var i = 0; i < array.length; i++) {
               var m = i % 2;
               players[m].push(array[i]);
           }
       }
           //shuffleArray function mixes up the cards randomly before dealing them
           function shuffleArray(array){
               for(var x = array.length -1; x > 0; x--) {
                   var ii = Math.floor(Math.random() * (x + 1));
                   var temp = array[x];
                   array[x] = array[ii];
                   array[ii] = temp;
               }
               return array;
           }