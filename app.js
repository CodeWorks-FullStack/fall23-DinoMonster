let cavePeople = [
  {
    name: 'Grunt',
    damage: 5, 
    health: 50,
    maxHealth: 50,
    level: 1,
    meat: 0,
    meatToLevel: 15
  },
  {
    name: 'Thok',
    damage: 5,
    health: 50,
    maxHealth: 50,
    level: 1,
    meat: 0,
    meatToLevel: 15
  }
]

let monsters = [
  {
    name: 'White Meat',
    img: 'rooster',
    damage: 1,
    health: 25,
    maxHealth: 25,
    level: 1
  },
  {
    name: 'Pink Snarf',
    img: 'pig',
    damage: 10,
    health: 50,
    maxHealth: 50,
    level: 1
  },
  {
    name: 'Cutty Cat',
    img: 'tiger',
    damage: 15,
    health: 75,
    maxHealth: 75,
    level: 1
  },
  {
    name: 'Long Boy',
    img: 'long-neck',
    damage: 30,
    health: 150,
    maxHealth: 150,
    level: 1
  },
  {
    name: 'Danger Tooth',
    img: 't-rex',
    damage: 40,
    health: 200,
    maxHealth: 200,
    level: 1
  },
]

let meat = 0

let activeMonster = monsters[0]

function attackMonster(){
  let totalDamage = 0
  // adds up all the damage the cavePeople can do
  cavePeople.forEach(cavePerson => {
    if(cavePerson.health > 0)
    totalDamage += cavePerson.damage
  })

  // deals that damage to the monster
  activeMonster.health -= totalDamage
  if(activeMonster.health <= 0){ // checks if the monster is dead
     activeMonster.health = 0
    console.log('☠️ monster dead')
    slayMonster()
  }
  // TODO change monster

  drawBoss()
  drawDamage(totalDamage)
}

function drawDamage(damage){
  let damageElm = document.getElementById('damage')
  damageElm.innerHTML = `<span class="damage">${damage}</span>`
}

function slayMonster(){
  console.log('slayMonster', activeMonster);
  meat += activeMonster.maxHealth
  drawMeat() // draw updates after changes are made
  
  let foundIndex = monsters.findIndex(monster => activeMonster.name == monster.name)
  console.log('foundMonster', foundIndex);
  let newMonster = monsters[foundIndex+1]

  if(newMonster){
    console.log('newMonster', newMonster);
    activeMonster = newMonster // change active monster to new monster
  } else {
    console.log('no mo monsters');
    restartMonsters()
  }
}

function attackPeople(){
  cavePeople.forEach( person => {
    person.health -= activeMonster.damage * activeMonster.level
    if(person.health < 0 ) person.health = 0
  })
  drawPeople()
}

function healPerson(personName){
  console.log('healing', personName)
  let person = cavePeople.find(person => person.name == personName)
  if(meat >= 25){
    person.health += 10
    person.meat += 10
    meat -= 25
    drawMeat()
    //TODO level up cave person
    if(person.meat >= person.meatToLevel){
      levelUpPerson(person)
    }
    if(person.health > person.maxHealth) person.health = person.maxHealth
  }
  drawPeople()
}

function levelUpPerson(person){
  console.log('levelUp!', person);
  person.meat = 0
  person.meatToLevel += 25
  person.level++
  person.maxHealth += 25
  person.damage += 5
  person.health = person.maxHealth
  drawPeople()
}

function restartMonsters(){
  monsters.forEach(monster => {
    monster.level++
    monster.maxHealth = monster.maxHealth * monster.level
    monster.health = monster.maxHealth
  })
  activeMonster = monsters[0]
}

function drawBoss(){
  let monsterElm = document.getElementById('monster')
  let monsterHealthBar = monsterElm.querySelector('.progress-bar')
  let percentHealth = calculatePercentage(activeMonster.health, activeMonster.maxHealth)
  monsterHealthBar.setAttribute('style', `width: ${percentHealth}%`)
  monsterHealthBar.innerText = activeMonster.health.toString()

  let monsterImg = monsterElm.querySelector('img')
  // console.log('monsterImg', monsterImg);
  monsterImg.src = `./imgs/${activeMonster.img}.png`

  let monsterName = monsterElm.querySelector('h2')
  // console.log('monsterName', monsterName)
  monsterName.innerText = `${activeMonster.name} lvl: ${activeMonster.level}`
}

function drawPeople(){
  cavePeople.forEach(person => {
    let personColumn = document.getElementById(person.name)
    let healthBar = personColumn.querySelector('.progress-bar')
    let percentHealth = calculatePercentage(person.health, person.maxHealth)
    healthBar.setAttribute('style', `width: ${percentHealth}%`)
    healthBar.innerHTML = person.health.toString()

    let personName = personColumn.querySelector('h3')
    personName.innerText = `${person.name} lvl: ${person.level}`
  })
}

function drawMeat(){
  let meatElm = document.getElementById('meat')
  meatElm.innerText = meat.toString()
}

function calculatePercentage(min, max){
  return Math.round((min / max)*100)
}

drawBoss()
drawPeople()
drawMeat()
setInterval(attackPeople, 5000)