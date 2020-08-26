let sequence = [];
let userIndex = 0;

let pressedDuration = 1000;
let betweenDuration = 100;

let buttons = [
  document.getElementById('button-1'),
  document.getElementById('button-2'),
  document.getElementById('button-3'),
  document.getElementById('button-4')
];

function reset() {
  pressedDuration = 1000;
  betweenDuration = 100;

  sequence = [];
  userIndex = 0;

  addToSequence();
  showSequence();
}

function addToSequence() {
  sequence.push(Math.floor(Math.random() * 4));

  pressedDuration *= 0.85;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function unpressButtons() {
  for (let b of buttons) {
    b.className = '';
  }
}

async function showSequence() {
  unpressButtons();

  for (let s of sequence) {
    await pressButton(s);
  }
}

async function pressButton(number) {
  let el = buttons[number];

  el.className = 'pressed';

  await sleep(pressedDuration);

  el.className = '';

  await sleep(betweenDuration);
}


async function buttonClicked(number) {
  if (sequence[userIndex] === number) {
    userIndex++;

    if (userIndex >= sequence.length) {
      userIndex = 0;

      await sleep(betweenDuration);

      addToSequence();
      showSequence();
    }

    return;
  } // Else: Wrong - flash all buttons and reset

  unpressButtons();

  for (let j = 0; j < 4; j++) pressButton(j);
  
  await sleep(pressedDuration * 2)

  reset();

  return;
}

for (let b of buttons) {
  b.onclick = function () { buttonClicked(parseInt(this.id.replace('button-', '')) - 1); };
}

reset();