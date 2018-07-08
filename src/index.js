const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const { startGame, guess, guesses } = require("./controllers/game");

const app = express();

app.use(bodyParser.json());
app.use(
  expressSession({
    saveUninitialized: true,
    secret: "life is a beach",
    cookie: { maxAge: 1200000 },
    resave: true
  })
);

app.get("/", (req, res) => {
  const { inProgress } = req.session;
  if (!inProgress) {
    req.session.inProgress = true;
  }
  res.json({ message: inProgress ? "welcome back" : "hello new person" });
});

app.get("/start", startGame);
app.get("/start/:guesses", startGame);
app.get("/guess/:guess", guess);
app.get("/guesses", guesses);
const port = process.env.port || 1989;

app.listen(port, () => process.stdout.write(`listening on ${port}`));
