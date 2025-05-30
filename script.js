//canvas er et eget element i HTML som du bruker Javascript til å tegne over.
let canvas = document.querySelector('#canvas');

let context;

//her bestemmes hvor stor canvas skal være, altå 400 piksler * 400 piksler
canvas.height = 400;
canvas.width = 400;

context = canvas.getContext('2d');

//start pikslene til spilleren
let playerX = 0;
let playerY = 375;

//brukes seinere for å endre hvilken vei spilleren går
let velocityX = 0;
let velocityY = 0;

//velger hastighet på spillet, og hvor mange piksler player skal hoppe
let updateSpeed = 30;
let jumpSpeed = 5;

//brukes for å unngå double jump
let isJumping = false;

//starter en interval, som gjør funksjonen update, hvert 30 ms
let gameUpdating = setInterval(update, updateSpeed);

//update funksjonen blir laget for å tegne på brettet.
//her velges da først hvilken farge, deretter hvilken plass den skal starte, og så hvor stor den skal tegnes.
function update() {
  //endres "malekosten" til å være svart
  context.fillStyle = 'black';
  //og tegner en firkant fra posisjon 0, 0 (som er verdiene for kordinatene helt opp i venstre hjørne)
  //og tenger til canvas.width, canvas.height som er størrelsen på brettet (400 piksler til høyre, og 400 piksler ned)
  context.fillRect(0, 0, canvas.width, canvas.height);

  //her endres posisjonen til spilleren hver gang den oppdateres, ut ifra hvilken retning den går.
  //når man starter, så står den i ro
  playerX += velocityX;
  playerY += velocityY;

  //deretter endrer den malekosten til rød
  context.fillStyle = 'red';
  //og tegner en firkant fra playerX, playerY (som er definert i starten av koden, 0 og 375), altså helt i venstre enden, og 25 piksler fra bunnen.
  //og tenger den 25 piksler til høyre, og 25 piksler ned
  context.fillRect(playerX, playerY, 25, 25);
}

//en eventlitener, som i dette tilfelle ser etter en "keydown" (om en knapp er trykket på tastaturet)
//og gjør deretter funksjonen jump
document.addEventListener('keydown', jump);

//brukes for å begrense hvor høyt man hopper
let counting = 0;

//jump funksjonen har en e i parantesen, som kalles en event.
//her sjekker den om e.code er pil opp (om knappen som er trykket ned, er ArrowUp)
//hvis den er det, så kjører den koden, så lenge man ikke hopper for øyeblikket.
function jump(e) {
  if (e.code === 'ArrowUp' && !isJumping) {
    //endrer jumping til true, for å unngå double jump
    isJumping = true;

    //lager en interval, som gjør at velocity blir -1 (som bestemt lengre oppe)
    //og endrer counting til å øke med en hver gang den oppdateres.
    let timerId = setInterval(() => {
      //velocityY, brukes lengre i koden for å flytte verdien til playerY nedover, eller oppover på kordinatsystemet på canvas hver gang update funksjonen blir kjørt.
      velocityY = -jumpSpeed;
      counting += 1;

      //etter den teller opp til 15, så fjerner intervallet som den er på, og lager en ny interval om gjør at den detter ned
      if (counting === 15) {
        clearInterval(timerId);

        //den resetter også farten til å være 0
        velocityY = 0;

        //her endres velocityY til å være positiv, som gjør at den teller oppover, eller nedover på kortdinatsystemet på canvas.
        let fallingTimerId = setInterval(() => {
          velocityY = +jumpSpeed;
          counting -= 1;

          //når den er tilbake til 0, så fjerner den intervallet, og gjør at du kan hoppe igjen.
          if (counting === 0) {
            clearInterval(fallingTimerId);
            velocityY = 0;
            isJumping = false;
          }
        }, updateSpeed);
      }
    }, updateSpeed);
  }
}
