//set initial object values

var aP = 0;

var luke = {
	name: "Luke Skywalker",
	healthPoints: 120,
	attackPower: 12,
	counterAttackPower: 5,
	amChosen: false,
	isDefender: false,
	isDefeated: false
};

var han = {
	name: "Han Solo",
	healthPoints: 100,
	attackPower: 9,
	counterAttackPower: 20,
	amChosen: false,
	isDefender: false,
	isDefeated: false
};

var darth = {
	name: "Darth Vader",
	healthPoints: 180,
	attackPower: 6,
	counterAttackPower: 25,
	amChosen: false,
	isDefender: false,
	isDefeated: false
};

var boba = {
	name: "Boba Fett",
	healthPoints: 150,
	attackPower: 8,
	counterAttackPower: 20,
	amChosen: false,
	isDefender: false,
	isDefeated: false
};

// set up cards in initial area

$("div.luke-hp").text(luke.healthPoints);
$("div.han-hp").text(han.healthPoints);
$("div.darth-hp").text(darth.healthPoints);
$("div.boba-hp").text(boba.healthPoints);

$("div.message").html("Please select your character, then choose which enemy you would like to attack first.");


// move cards into either your character or Enemies based on click

$(".luke-yc").on( "click", function() {
	luke.amChosen = true;
	$(".han-yc").hide();
	$(".darth-yc").hide();
	$(".boba-yc").hide();
	$(".han-ea").show();
	$(".darth-ea").show();
	$(".boba-ea").show();
});

$(".han-yc").on( "click", function() {
	han.amChosen = true;
	$(".luke-yc").hide();
	$(".darth-yc").hide();
	$(".boba-yc").hide();
	$(".luke-ea").show();
	$(".darth-ea").show();
	$(".boba-ea").show();
});

$(".darth-yc").on( "click", function() {
	darth.amChosen = true;
	$(".han-yc").hide();
	$(".luke-yc").hide();
	$(".boba-yc").hide();
	$(".han-ea").show();
	$(".luke-ea").show();
	$(".boba-ea").show();
});

$(".boba-yc").on( "click", function() {
	boba.amChosen = true;
	$(".han-yc").hide();
	$(".darth-yc").hide();
	$(".luke-yc").hide();
	$(".han-ea").show();
	$(".darth-ea").show();
	$(".luke-ea").show();
});



// move selected enemy to Defender section

$(".luke-ea").on( "click", function() {
	if (han.isDefender === false && boba.isDefender === false && darth.isDefender === false){
		luke.isDefender = true;
		$(".luke-ea").hide();
		defender();
	}
});

$(".han-ea").on( "click", function() {
	if (luke.isDefender === false && boba.isDefender === false && darth.isDefender === false){
		han.isDefender = true;
		$(".han-ea").hide();
		defender();
	}
});

$(".darth-ea").on( "click", function() {
	if (luke.isDefender === false && boba.isDefender === false && han.isDefender === false){
		darth.isDefender = true;
		$(".darth-ea").hide();
		defender();
	}
});

$(".boba-ea").on( "click", function() {
	if (luke.isDefender === false && han.isDefender === false && darth.isDefender === false){
		boba.isDefender = true;
		$(".boba-ea").hide();
		defender();
	}
});

function defender(){
	if(luke.isDefender === true){
		$(".luke-d").show();
	}

	if(han.isDefender === true){
		$(".han-d").show();
	}

	if(darth.isDefender === true){
		$(".darth-d").show();
	}

	if(boba.isDefender === true){
		$(".boba-d").show();
	}
}


// listen for attack button and recalc health and attack power

$("button.attack").on( "click", function() {


	// attack with no enemy selected

	if (luke.isDefender === false && han.isDefender === false && darth.isDefender === false && boba.isDefender === false){
		$("div.message").html("You do not have an enemy selected. <br> Please select from available enemies and attack again.");
	}


	// luke vs han

	if(han.isDefender === true && luke.amChosen === true){
		aP += luke.attackPower;
		han.healthPoints -= aP;
		$("div.han-hp").text(han.healthPoints);
		luke.healthPoints -= han.counterAttackPower;
		$("div.luke-hp").text(luke.healthPoints);
		$("div.message").html("You attacked Han Solo for a "+aP+" point loss. <br> Han Solo attacked you for a "+han.counterAttackPower+" point loss.");

		if (han.healthPoints <= 0){
			han.isDefender = false;
			han.isDefeated = true;
			$("div.message").html("You have defeated Han Solo. Please choose another enemy to attack.");
			$(".han-d").hide();
		}

		if(luke.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (han.isDefeated === true && darth.isDefeated === true && boba.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}


	// luke vs darth

	if(darth.isDefender === true && luke.amChosen === true){
		aP += luke.attackPower;
		darth.healthPoints -= aP;
		$("div.darth-hp").text(darth.healthPoints);
		luke.healthPoints -= darth.counterAttackPower;
		$("div.luke-hp").text(luke.healthPoints);
		$("div.message").html("You attacked Darth Vader for a "+aP+" point loss. <br> Darth Vader attacked you for a "+darth.counterAttackPower+" point loss.");

		if (darth.healthPoints <= 0){
			darth.isDefender = false;
			darth.isDefeated = true;
			$("div.message").html("You have defeated Darth Vader. Please choose another enemy to attack.");
			$(".darth-d").hide();
		}

		if(luke.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (darth.isDefeated === true && han.isDefeated === true && boba.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}


	// luke vs boba

	if(boba.isDefender === true && luke.amChosen === true){
		aP += luke.attackPower;
		boba.healthPoints -= aP;
		$("div.boba-hp").text(boba.healthPoints);
		luke.healthPoints -= boba.counterAttackPower;
		$("div.luke-hp").text(luke.healthPoints);
		$("div.message").html("You attacked Boba Fett for a "+aP+" point loss. <br> Boba Fett attacked you for a "+boba.counterAttackPower+" point loss.");

		if (boba.healthPoints <= 0){
			boba.isDefender = false;
			boba.isDefeated = true;
			$("div.message").html("You have defeated Boba Fett. Please choose another enemy to attack.");
			$(".boba-d").hide();
		}

		if(luke.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (boba.isDefeated === true && han.isDefeated === true && darth.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}


	// darth vs luke

	if(luke.isDefender === true && darth.amChosen === true){
		aP += darth.attackPower;
		luke.healthPoints -= aP;
		$("div.luke-hp").text(luke.healthPoints);
		darth.healthPoints -= luke.counterAttackPower;
		$("div.darth-hp").text(darth.healthPoints);
		$("div.message").html("You attacked Luke Skywalker for a "+aP+" point loss. <br> Luke Skywalker attacked you for a "+luke.counterAttackPower+" point loss.");

		if (luke.healthPoints <= 0){
			luke.isDefender = false;
			luke.isDefeated = true;
			$("div.message").html("You have defeated Luke Skywalker. Please choose another enemy to attack.");
			$(".luke-d").hide();
		}

		if(darth.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (luke.isDefeated === true && han.isDefeated === true && boba.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}


	// darth vs han

	if(han.isDefender === true && darth.amChosen === true){
		aP += darth.attackPower;
		han.healthPoints -= aP;
		$("div.han-hp").text(han.healthPoints);
		darth.healthPoints -= han.counterAttackPower;
		$("div.darth-hp").text(darth.healthPoints);
		$("div.message").html("You attacked Han Solo for a "+aP+" point loss. <br> Han Solo attacked you for a "+han.counterAttackPower+" point loss.");

		if (han.healthPoints <= 0){
			han.isDefender = false;
			han.isDefeated = true;
			$("div.message").html("You have defeated Han Solo. Please choose another enemy to attack.");
			$(".han-d").hide();
		}

		if(darth.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (luke.isDefeated === true && han.isDefeated === true && boba.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}


	// darth vs boba

	if(boba.isDefender === true && darth.amChosen === true){
		aP += darth.attackPower;
		boba.healthPoints -= aP;
		$("div.boba-hp").text(boba.healthPoints);
		darth.healthPoints -= boba.counterAttackPower;
		$("div.darth-hp").text(darth.healthPoints);
		$("div.message").html("You attacked Boba Fett for a "+aP+" point loss. <br> Boba Fett attacked you for a "+boba.counterAttackPower+" point loss.");

		if (boba.healthPoints <= 0){
			boba.isDefender = false;
			boba.isDefeated = true;
			$("div.message").html("You have defeated Boba Fett. Please choose another enemy to attack.");
			$(".boba-d").hide();
		}

		if(darth.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (luke.isDefeated === true && han.isDefeated === true && boba.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}


	// han vs luke

	if(luke.isDefender === true && han.amChosen === true){
		aP += han.attackPower;
		luke.healthPoints -= aP;
		$("div.luke-hp").text(luke.healthPoints);
		han.healthPoints -= luke.counterAttackPower;
		$("div.han-hp").text(han.healthPoints);
		$("div.message").html("You attacked Luke Skywalker for a "+aP+" point loss. <br> Luke Skywalker attacked you for a "+luke.counterAttackPower+" point loss.");

		if (luke.healthPoints <= 0){
			luke.isDefender = false;
			luke.isDefeated = true;
			$("div.message").html("You have defeated Luke Skywalker. Please choose another enemy to attack.");
			$(".luke-d").hide();
		}

		if(han.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (darth.isDefeated === true && luke.isDefeated === true && boba.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}


	// han vs darth

	if(darth.isDefender === true && han.amChosen === true){
		aP += han.attackPower;
		darth.healthPoints -= aP;
		$("div.darth-hp").text(darth.healthPoints);
		han.healthPoints -= darth.counterAttackPower;
		$("div.han-hp").text(han.healthPoints);
		$("div.message").html("You attacked Darth Vader for a "+aP+" point loss. <br> Darth Vader attacked you for a "+darth.counterAttackPower+" point loss.");

		if (darth.healthPoints <= 0){
			darth.isDefender = false;
			darth.isDefeated = true;
			$("div.message").html("You have defeated Darth Vader. Please choose another enemy to attack.");
			$(".darth-d").hide();
		}

		if(han.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (darth.isDefeated === true && luke.isDefeated === true && boba.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}


	// han vs boba

	if(boba.isDefender === true && han.amChosen === true){
		aP += han.attackPower;
		boba.healthPoints -= aP;
		$("div.boba-hp").text(boba.healthPoints);
		han.healthPoints -= boba.counterAttackPower;
		$("div.han-hp").text(han.healthPoints);
		$("div.message").html("You attacked Boba Fett for a "+aP+" point loss. <br> Boba Fett attacked you for a "+boba.counterAttackPower+" point loss.");

		if (boba.healthPoints <= 0){
			boba.isDefender = false;
			boba.isDefeated = true;
			$("div.message").html("You have defeated Boba Fett. Please choose another enemy to attack.");
			$(".boba-d").hide();
		}

		if(han.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (darth.isDefeated === true && luke.isDefeated === true && boba.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}


	// boba vs luke

	if(luke.isDefender === true && boba.amChosen === true){
		aP += boba.attackPower;
		luke.healthPoints -= aP;
		$("div.luke-hp").text(luke.healthPoints);
		boba.healthPoints -= luke.counterAttackPower;
		$("div.boba-hp").text(boba.healthPoints);
		$("div.message").html("You attacked Luke Skywalker for a "+aP+" point loss. <br> Luke Skywalker attacked you for a "+luke.counterAttackPower+" point loss.");

		if (luke.healthPoints <= 0){
			luke.isDefender = false;
			luke.isDefeated = true;
			$("div.message").html("You have defeated Luke Skywalker. Please choose another enemy to attack.");
			$(".luke-d").hide();
		}

		if(boba.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (darth.isDefeated === true && han.isDefeated === true && luke.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}


	// boba vs han

	if(han.isDefender === true && luke.amChosen === true){
		aP += luke.attackPower;
		han.healthPoints -= aP;
		$("div.han-hp").text(han.healthPoints);
		luke.healthPoints -= han.counterAttackPower;
		$("div.luke-hp").text(luke.healthPoints);
		$("div.message").html("You attacked Han Solo for a "+aP+" point loss. <br> Han Solo attacked you for a "+han.counterAttackPower+" point loss.");

		if (han.healthPoints <= 0){
			han.isDefender = false;
			han.isDefeated = true;
			$("div.message").html("You have defeated Han Solo. Please choose another enemy to attack.");
			$(".han-d").hide();
		}

		if(luke.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (darth.isDefeated === true && han.isDefeated === true && luke.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}


	// boba vs darth

	if(darth.isDefender === true && boba.amChosen === true){
		aP += boba.attackPower;
		darth.healthPoints -= aP;
		$("div.darth-hp").text(darth.healthPoints);
		boba.healthPoints -= darth.counterAttackPower;
		$("div.boba-hp").text(boba.healthPoints);
		$("div.message").html("You attacked Darth Vader for a "+aP+" point loss. <br> Darth Vader attacked you for a "+darth.counterAttackPower+" point loss.");

		if (darth.healthPoints <= 0){
			darth.isDefender = false;
			darth.isDefeated = true;
			$("div.message").html("You have defeated Darth Vader. Please choose another enemy to attack.");
			$(".darth-d").hide();
		}

		if(boba.healthPoints <= 0){
			$("div.message").html("You have been defeated. Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}

		if (darth.isDefeated === true && han.isDefeated === true && luke.isDefeated === true){
			$("div.message").html("CONGRATULTIONS! You have defeated all of your enemies. <br>Press the reset button to play again.");
			$(".attack").hide();
			$(".reset").show();
		}
		
	}

});






// check for win or lose state and reset if required

$("button.reset").on( "click", function() {
	location.reload();
});
