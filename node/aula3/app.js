const path = require("path");
const writeFile = require("./modules/writeFile");
const readFile = require("./modules/readFile");

const filePath = path.resolve(__dirname, "", "data/data.json");
const pessoas = [
  { nome: "Mario", idade: 15, peso: null },
  { nome: "Maria", idade: 13, peso: null },
];

writeFile(filePath, JSON.stringify(pessoas, "", 2))
  .then(() => readFile(filePath).then((data) => console.log("data", data)))
  .catch((err) => console.log("nao foi possivel criar o arquivo"));
