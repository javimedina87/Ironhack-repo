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
    console.log("Name: " + this.name + "\nHealth: " + this.health +"\nStrength " + this.strength + "\n----------");
  }
}

//Create 2 vikings ready to fight and introduce them
var v1 = new Viking("Viking1");
var v2 = new Viking("Viking2");
v1.introduceMyself();
v2.introduceMyself();

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

var startTraining = pitFight(v1,v2);