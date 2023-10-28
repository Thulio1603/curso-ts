const fs = require("fs").promises;
const path = require("path");

module.exports = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data, {
      flag: "w",
      encoding: "utf-8",
    });
    console.log("Arquivo criado.");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(path.dirname(filePath));
      await fs.writeFile(filePath, data, {
        flag: "w",
        encoding: "utf-8",
      });
      console.log("Arquivo criado e conteúdo escrito com sucesso.");
    } else {
      console.error("Erro ao criar ou escrever no arquivo:", error);
    }
  }
};
