
//Viking class
var Viking = function(name) {
  this.name = name;
  this.health = Math.floor(Math.random() * (100 - 50 + 1) + 50);
  this.strength = Math.floor(Math.random() * (15 - 5 + 1) + 5);
  //Viking health (50-100)
  //Viking strength (5-15)

  this.attack = function (damage) {
    this.health = this.health - damage; 
  }

  this.introduceMyself = function (){
    console.log("Name: " + this.name + "\nHealth: " + this.health +"\nStrength: " + this.strength);
  }
}

//Saxon class
var Saxon = function() {
  this.health = Math.floor(Math.random() * (50 - 20 + 1) + 20);
  this.strength = Math.floor(Math.random() * (8 - 1 + 1) + 1);
  //Saxon health (20-50)
  //Saxon strength (1-8)

  this.attack = function (damage) {
    this.health = this.health - damage; 
  }

  this.introduceMyself = function (){
    console.log("Health: " + this.health +"\nStrength: " + this.strength);
  }
}

//Create Vikings ready to fight and introduce them
var v1 = new Viking("Viking1");
var v2 = new Viking("Viking2");
var v3 = new Viking("Viking3");
console.log("- - - Vikings - - -");
v1.introduceMyself();
v2.introduceMyself();

//Create Saxons and introduce them
var s1 = new Saxon();
var s2 = new Saxon();
var s3 = new Saxon();
var s4 = new Saxon();
var s5 = new Saxon();
var s6 = new Saxon();
var s7 = new Saxon();
var s8 = new Saxon();
var s9 = new Saxon();
var s10 = new Saxon();
console.log("- - - Saxons - - -");
s1.introduceMyself();
s2.introduceMyself();
s3.introduceMyself();
//s4.introduceMyself();
//s5.introduceMyself();

//Create the 2 armies
//var vikings = [v1,v2,v3];
//var saxons = [s1,s2,s3,s4,s5,s6,s7,s8,s9,s10];
var vikings = new Array(v1,v2);
var saxons = new Array(s1,s2,s3);


//Training fight between Vikings
function pitFight(viking1,viking2){
  return function(){
    var turns = 1;

    //Keep fighting until one of the two has no health
    while (viking1.health > 0 || viking2.health > 0){
      if (viking1.strength >= viking2.health){
        return console.log("Training finished. Winner: " + viking1.name);
      } else if (viking2.strength >= viking1.health){
          return console.log("Training finished. Winner: " + viking2.name);
      } else {
          v1.attack(v2.strength);
          v2.attack(v1.strength);
          console.log("Turn " + turns);
          console.log("Viking 1 health: "+ v1.health);
          console.log("Viking 2 health: "+ v2.health);
      }
      turns++;  
    }
  }
}

//Real war fight between Vikings and Saxons
function realWar(vikings,saxons){
  return function(){
    var i = 0;
    var j = 0;
    var shift = 0;
    var vikingsWin = false;
    var saxonsWin = false;

    //Keep fighting until one of the armies dies
    do {
      if (vikings.length == 0){ 
        saxonsWin = true;
        console.log("Saxons win");
      } else if (saxons.length == 0) {
        vikingsWin = true; 
        console.log("Vikings win");
      } else {
        if (shift >= 8){
          //Add both fighters to the last position in the array
          vikings.splice(vikings.length,0,vikings[i]);
          saxons.splice(saxons.length,0,saxons[j]);
          //Delete the first fighter of each army
          vikings.splice(i,1);
          saxons.splice(j,1);
          //Reset shifts
          shift = 0;
        }
        vikings[i].attack(saxons[j].strength);
        saxons[j].attack(vikings[i].strength);
        console.log("Viking " + i + " health: " + vikings[i].health);
        console.log("Saxons " + j + " health: " + saxons[j].health);
        if (vikings[i].health <= 0){
          vikings.splice(i,1);
          shift = 0;
          console.log("Viking is dead, shifts reset");
        } else if (saxons[j].health <= 0){
          saxons.splice(j,1);
          shift = 0;
          console.log("Saxon is dead, shifts reset");
        } else {
          console.log("Keep fighting!!");
        }
        shift++; 
        console.log("Shift: " + shift + " finished");         
      }
    } while (vikingsWin === false && saxonsWin === false)
  }
}
  
//var startTraining = pitFight(v1,v2);
var startWar = realWar(vikings,saxons);