const metronomeDOM = $("#metronome");
const title = document.querySelector("h1");
let counter = 0;
var metronome;

const keyDOM = $("#key");
const availableKeys = ["C major", "C minor"];
let availableKeysHTML = availableKeys.map(
  key => `<option value="${key}">${key}</option>`
);
keyDOM.html(availableKeysHTML.join());

function bpmToMilliseconds(bpm) {
  return Math.round(60000 / bpm);
}

function getRandomNote(notes, lastNote) {
  do {
    var randomIndex = Math.floor(Math.random() * notes.length);
    var randomNote = notes[randomIndex];
  } while (randomNote == lastNote);
  return randomNote;
}

function nextNote(note, halfSteps = 1) {
  switch (String(note).length) {
    case 1:
      note = String(note).toUpperCase();
      break;
    case 2:
      note =
        String(note)
          .substr(0, 1)
          .toUpperCase() +
        String(note)
          .substr(1, 1)
          .toLowerCase();
      break;
    default:
      throw console.error("Note length > 2 passed into nextNote()");
  }
  const notes = [
    "A",
    "Bb",
    "B",
    "C",
    "C#",
    "D",
    "Eb",
    "E",
    "F",
    "F#",
    "G",
    "G#"
  ];
  if (notes.indexOf(note) + halfSteps + 1 > notes.length) {
    return notes[notes.indexOf(note) + halfSteps - notes.length];
  } else {
    return notes[notes.indexOf(note) + halfSteps];
  }
}

function notesInTheKeyOf(key) {
  let scale;
  key = String(key)
    .toLowerCase()
    .split(" ");
  switch (key.length) {
    case 2:
      scale = key[1];
      key = key[0];
      break;
    case 3:
      scale = key[1] + " " + key[2];
      key = key[0];
      break;
    default:
      key = key[0];
      scale = "major";
  }
  let notes = [nextNote(key, 0)];
  scale = String(scale).toLowerCase();
  const scaleIntervals = {
    major: [2, 4, 5, 7, 9, 11],
    minor: [2, 3, 5, 7, 8, 10]
  };
  for (let i = 0; i <= 5; i++) {
    notes.push(nextNote(key, scaleIntervals[scale][i]));
  }
  return notes;
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
          .html(
            getRandomNote(notesInTheKeyOf(userEnteredKey), $("#note").html())
          )
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
