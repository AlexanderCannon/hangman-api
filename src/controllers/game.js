const generateWord = () => "ouch";

const startGame = (req, res) => {
  const { word, solved, failed } = req.session;
  if ((req.session.word = word && (!solved || !failed))) {
    const message = "game still in progress";
    res.json({ message });
  } else {
    req.session.word = generateWord();
    const message = "new word generated";
    res.json({ message });
  }
};

const guess = (req, res) => {
  const { guesses, word } = req.session;
  const { guess } = req.params;
  console.log(typeof guesses, guess);
  if (!word) {
    res.json({ message: "start game before guessing!" });
  } else {
    if (typeof guesses === "undefined") {
      req.session.guesses = [guess];
      res.json({ message: `you guessed ${guess}` });
    } else if (guesses.includes(guess)) {
      res.json({ message: "already guessed that letter" });
    } else {
      req.session.guesses.push(guess);
      res.json({ message: `you guessed ${guess}` });
    }
  }
};

const guesses = (req, res) => {
  const { guesses } = req.session;
  if (guesses)
    res.json({
      message: "you have guessed",
      guesses
    });
};

module.exports = { generateWord, startGame, guess, guesses };
