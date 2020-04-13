var gameData = {
    charHP: 100,
    charHPmax: 100,
    charAtk: 5,
    charDef: 0,

    gold: 0,

    enemy1_HP: 10,
    enemy1_HPmax: 10,
    enemy1_atk: 1,
    enemy1_def: 0,
}

 {      // Things to hide at beginning/show later
    document.getElementById("combat").style.display = "inline-block";
    document.getElementById("inventory").style.display = "none";
    document.getElementById("gathering").style.display = "none";
    document.getElementById("crafting").style.display = "none";
    document.getElementById("upgrades").style.display = "none";
    document.getElementById("stats").style.display = "none";
 }

function charHP_change(x) {
    var elem = document.getElementById("charHP_bar");
    gameData.charHP += x;
    checkHP();
    elem.style.width = gameData.charHP * 1 + '%';
    elem.innerHTML = gameData.charHP * 1 + '/' + gameData.charHPmax * 1;
}

function fightEnemy1() {
    if(gameData.charHP > 0) {

    }
}

function checkHP() {
    if(gameData.charHP <= 0) {
        gameData.charHP = 0;
    }
    if(gameData.charHP >= gameData.charHPmax) {
        gameData.charHP = gameData.charHPmax;
    }
    if(gameData.enemy1_HP <= 0) {
        gameData.enemy1_HP = 0;
    }
    if(gameData.enemy1_HP >= gameData.enemy1_HPmax) {
        gameData.enemy1_HP = gameData.enemy1_HPmax;
    }
}

function screenCombat() {
    document.getElementById("combat").style.display = "inline-block";
    document.getElementById("inventory").style.display = "none";
    document.getElementById("gathering").style.display = "none";
    document.getElementById("crafting").style.display = "none";
    document.getElementById("upgrades").style.display = "none";
    document.getElementById("stats").style.display = "none";
}
function screenInventory() {
    document.getElementById("combat").style.display = "none";
    document.getElementById("inventory").style.display = "inline-block";
    document.getElementById("gathering").style.display = "none";
    document.getElementById("crafting").style.display = "none";
    document.getElementById("upgrades").style.display = "none";
    document.getElementById("stats").style.display = "none";
}
function screenGathering() {
    document.getElementById("combat").style.display = "none";
    document.getElementById("inventory").style.display = "none";
    document.getElementById("gathering").style.display = "inline-block";
    document.getElementById("crafting").style.display = "none";
    document.getElementById("upgrades").style.display = "none";
    document.getElementById("stats").style.display = "none";
}
function screenCrafting() {
    document.getElementById("combat").style.display = "none";
    document.getElementById("inventory").style.display = "none";
    document.getElementById("gathering").style.display = "none";
    document.getElementById("crafting").style.display = "inline-block";
    document.getElementById("upgrades").style.display = "none";
    document.getElementById("stats").style.display = "none";
}
function screenUpgrades() {
    document.getElementById("combat").style.display = "none";
    document.getElementById("inventory").style.display = "none";
    document.getElementById("gathering").style.display = "none";
    document.getElementById("crafting").style.display = "none";
    document.getElementById("upgrades").style.display = "inline-block";
    document.getElementById("stats").style.display = "none";
}
function screenStats() {
    document.getElementById("combat").style.display = "none";
    document.getElementById("inventory").style.display = "none";
    document.getElementById("gathering").style.display = "none";
    document.getElementById("crafting").style.display = "none";
    document.getElementById("upgrades").style.display = "none";
    document.getElementById("stats").style.display = "inline-block";
}