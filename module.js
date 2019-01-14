const metronomeDOM = $("#metronome");
const title = document.querySelector("h1");
let counter = 0;
var metronome;

function bpmToMilliseconds(bpm) {
  return Math.round(60000 / bpm);
}

function getRandomNote(key, lastNote) {
  const keys = {
    C: ["C", "D", "E", "F", "G", "A", "B", "C^"]
  };
  key = keys[key];
  do {
    var randomIndex = Math.floor(Math.random() * key.length);
    var randomNote = key[randomIndex];
  } while (randomNote == lastNote);
  return randomNote;
}
function startMetronome() {
  const userEnteredBpm = document.querySelector("#speed").value;
  const beat = bpmToMilliseconds(userEnteredBpm);
  const noteDuration = beat * 4;
  const userEnteredKey = document.querySelector("#key").value;
  counter = 1;
  metronome = setInterval(() => {
    if (title.style.color != "rgb(0, 255, 0)") {
      title.style.color = "rgb(0, 255, 0)";
    } else {
      title.style.color = "rgb(255, 255, 255)";
    }
    switch (counter) {
      case 1:
        $("#note")
          .html(getRandomNote(userEnteredKey, $("#note").html()))
          .fadeIn(100)
          .fadeOut(Math.round(noteDuration * 0.95));
        counter++;
        break;
      case 4:
        counter = 1;
        break;
      default:
        counter++;
    }
  }, beat);
}

function stopMetronome() {
  clearInterval(metronome);
}
