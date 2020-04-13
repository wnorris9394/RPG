var gameData = {
    charHP: 100,
    charHPmax: 100,
    charMinAtk: 1,
    charMaxAtk: 5,
    charDef: 0,

    charLvl: 1,
    charSkillPts: 0,
    charExp: 0,
    charExpToLvL: 5,

    charUp_minAtk_cost: 1,
    charUp_maxAtk_cost: 1,

    charGold: 0,

    enemiesKilled: 0,

    enemy1_HP: 10,
    enemy1_HPmax: 10,
    enemy1_minAtk: 1,
    enemy1_maxAtk: 3,
    enemy1_def: 0,
    enemy1goldMin: 5,
}

 {      // Things to hide at beginning/show later
    document.getElementById("combat").style.display = "inline-block";
    document.getElementById("inventory").style.display = "none";
    document.getElementById("gathering").style.display = "none";
    document.getElementById("crafting").style.display = "none";
    document.getElementById("upgrades").style.display = "none";
    document.getElementById("stats").style.display = "none";

    document.getElementById("fight_enemy1").style.display ="none";
    document.getElementById("enemyHP_bar").style.width = 0 + '%';

    document.getElementById("enemyDeath").style.display = "none";
    document.getElementById("charDeath").style.display = "none";
 }

function charHP_change(x) {
    var elemChar = document.getElementById("charHP_bar");
    gameData.charHP += x;
    checkHP();
    elemChar.style.width = gameData.charHP * 1 + '%';
    elemChar.innerHTML = gameData.charHP * 1 + '/' + gameData.charHPmax * 1;
}

function enemy1HP_change(x) {
    var elemEnemy1 = document.getElementById("enemyHP_bar");
    gameData.enemy1_HP += x;
    checkHP();
    elemEnemy1.style.width = gameData.enemy1_HP * 10 + '%';
    elemEnemy1.innerHTML = gameData.enemy1_HP * 1 + '/' + gameData.enemy1_HPmax * 1;
}

function fight_enemy1() {
    var fightAuto = setInterval(function() {
        document.getElementById("charDeath").style.display = "none";
        document.getElementById("enemyDeath").style.display = "none";
        document.getElementById("fight_enemy1").style.visibility = "hidden";

        var randGold = getRange(gameData.enemy1goldMin, (gameData.enemy1goldMin + 5));
        document.getElementById("enemyGold").innerHTML = randGold;

        var charAtkRange = getRange(gameData.charMinAtk, gameData.charMaxAtk);
        var enemyAtkRange = getRange(gameData.enemy1_minAtk, gameData.enemy1_maxAtk);
        var charActualDamage = charAtkRange - gameData.enemy1_def;
        var enemyActualDamage = enemyAtkRange - gameData.charDef;

        if(gameData.enemy1_HP <= 0) {
            gameData.charHP += enemyActualDamage;
            gameData.charGold += randGold;
            gameData.enemy1_HP = gameData.enemy1_HPmax;
            gameData.enemiesKilled += 1;
            gainExp(1);
            clearInterval(fightAuto);
            document.getElementById("statsKilled").innerHTML = gameData.enemiesKilled * 1;
            document.getElementById("invGold").innerHTML = gameData.charGold;
            document.getElementById("enemyDeath").style.display = "inline-block";
            document.getElementById("fight_enemy1").style.display ="none";
            document.getElementById("respawn_enemy1").style.display ="inline-block";
            document.getElementById("charGold").innerHTML = gameData.charGold * 1;
            document.getElementById("enemyHP_bar").style.width = 0 + '%';
            document.getElementById("enemyHP_bar").innerHTML = 0 + '/' + gameData.enemy1_HPmax * 1;
            document.getElementById("charHP_bar").innerHTML = gameData.charHP * 1 + '/' + gameData.charHPmax * 1;
        } else {
            enemy1HP_change(-charActualDamage);
            document.getElementById("enemyHP_bar").innerHTML = gameData.enemy1_HP * 1 + '/' + gameData.enemy1_HPmax * 1;
        }
        if(gameData.charHP <= 0) {
            gameData.enemy1_HP = gameData.enemy1_HPmax;
            gameData.charExp = 0;
            clearInterval(fightAuto);
            document.getElementById("expBar").innerHTML = gameData.charExp * 1 + '/' + gameData.charExpToLvL;
            document.getElementById("expBar").style.width = 0 + '%';
            document.getElementById("charDeath").style.display = "inline-block";
            document.getElementById("charHP_bar").style.width = 0 + '%';
            document.getElementById("charHP_bar").innerHTML = 0 + '/' + gameData.charHPmax * 1;
            document.getElementById("enemyHP_bar").style.width = 100 + '%';
            document.getElementById("enemyHP_bar").innerHTML = gameData.enemy1_HP * 1 + '/' + gameData.enemy1_HPmax * 1;
        } else {
            charHP_change(-enemyActualDamage);
            document.getElementById("charHP_bar").innerHTML = gameData.charHP * 1 + '/' + gameData.charHPmax * 1;
        }
        checkHP();

        
    }, 100);
    
}

function respawn_enemy1() {
    document.getElementById("fight_enemy1").style.display ="inline-block";
    document.getElementById("fight_enemy1").style.visibility ="visible";
    document.getElementById("respawn_enemy1").style.display ="none";
    document.getElementById("enemyDeath").style.display = "none";
    document.getElementById("enemyHP_bar").style.width = 100 + '%';
    document.getElementById("enemyHP_bar").innerHTML = gameData.enemy1_HP * 1 + '/' + gameData.enemy1_HPmax * 1;
}

function healChar() {
    var healOverTime = setInterval(function() {
        if(gameData.charHP >= gameData.charHPmax) {
            gameData.charHP = gameData.charHPmax;
            document.getElementById("charDeath").style.display = "none";
            document.getElementById("fight_enemy1").style.visibility ="visible";
            clearInterval(healOverTime);  
        }
        charHP_change(1);
    }, 50)
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

function getRange(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gainExp(x) {
    gameData.charExp += x;
    if (gameData.charExp >= gameData.charExpToLvL) {
        gameData.charExp -= gameData.charExpToLvL;
        gameData.charExpToLvL += 5;
        gameData.charLvl += 1;
        gameData.charSkillPts += 1;
        document.getElementById("skillPts").innerHTML = "Current Skill Points: " + gameData.charSkillPts * 1;
        document.getElementById("upgradesSkillPts").innerHTML = gameData.charSkillPts * 1;
        document.getElementById("charLvl").innerHTML = "Level " + gameData.charLvl * 1;
        document.getElementById("expBar").innerHTML = gameData.charExp * 1 + '/' + gameData.charExpToLvL * 1;
        document.getElementById("expBar").style.width = 0 + '%';
    }
    document.getElementById("expBar").innerHTML = gameData.charExp * 1 + '/' + gameData.charExpToLvL * 1;
    document.getElementById("expBar").style.width = (gameData.charExp / gameData.charExpToLvL) * 100 + '%';
}

function upgradeMinAtk() {
    if(gameData.charSkillPts >= gameData.charUp_minAtk_cost) {
        gameData.charSkillPts -= gameData.charUp_minAtk_cost;
        gameData.charUp_minAtk_cost += 2;
        gameData.charMinAtk += 1;
        document.getElementById("skillPts").innerHTML = gameData.charSkillPts * 1;
        document.getElementById("upgradesSkillPts").innerHTML = gameData.charSkillPts * 1;
        document.getElementById("upgradesMinAtk_cost").innerHTML = gameData.charUp_minAtk_cost * 1;
        document.getElementById("statsMinAtk").innerHTML = gameData.charMinAtk * 1;
    }
}

function upgradeMaxAtk() {
    if(gameData.charSkillPts >= gameData.charUp_maxAtk_cost) {
        gameData.charSkillPts -= gameData.charUp_maxAtk_cost;
        gameData.charUp_maxAtk_cost += 2;
        gameData.charMaxAtk += 1;
        document.getElementById("skillPts").innerHTML = gameData.charSkillPts * 1;
        document.getElementById("upgradesSkillPts").innerHTML = gameData.charSkillPts * 1;
        document.getElementById("upgradesMaxAtk_cost").innerHTML = gameData.charUp_maxAtk_cost * 1;
        document.getElementById("statsMaxAtk").innerHTML = gameData.charMaxAtk * 1;
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