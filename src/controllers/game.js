const generateWord = () => "ouch";

const startGame = (req, res) => {
  if (!req.session.game) req.session.game = {}
  const { word, solved, failed } = req.session.game;
  const maxGuesses = req.params.guesses || 10;
  if ((req.session.game.word = word && (!solved || !failed))) {
    const message = "game still in progress";
    res.json({ message });
  } else {
    const newParams = {
      word: generateWord(),
      failed: false,
      solved: false,
      maxGuesses
    };
    req.session.game = { ...req.session.game, ...newParams };
    const message = "new word generated";
    res.json({ message });
  }
};

const guess = (req, res) => {
  const { guesses, word } = req.session.game;
  const { guess } = req.params;
  if (!word) {
    res.json({ message: "start game before guessing!" });
  } else {
    const answer = word.split("");
    if (typeof guesses === "undefined") {
      req.session.game.guesses = [guess];
      res.json({ message: `you guessed ${guess}` });
    } else if (guesses.includes(guess)) {
      res.json({ message: "already guessed that letter" });
    } else {
      req.session.game.guesses.push(guess);
      const intersection = guesses.filter(element => answer.includes(element));
      if (intersection.length === word.length) {
        res.json({
          message: "congratulations, you won!",
          word
        });
      } else {
        res.json({ message: `you guessed ${guess}` });
      }
    }
  }
};

const guesses = (req, res) => {
  const { guesses } = req.session.game;
  if (guesses)
    res.json({
      message: "you have guessed",
      guesses
    });
};

module.exports = { generateWord, startGame, guess, guesses };
