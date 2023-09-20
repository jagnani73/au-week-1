const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x8f4172a37f62d488fb649960a07dfa5ef346d34b": 100,
  "0x60423826f10aaca6f4b1e37a324c67ef2ffafa4a": 50,
  "0xa568bae0c72e7e60d4418c5fd040e524e1bdc582": 75,
};

app.get("/balance", (req, res) => {
  const { address, signature } = req.query;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
