const fs = require("fs").promises;
const path = require("path");

const walk = async (files, rootdir) => {
  for (let file of files) {
    const filePath = path.resolve(rootdir, file);
    console.log(filePath);
  }
};

const readdir = async (rootdir) => {
  const dir = rootdir || path.resolve(__dirname);
  const files = await fs.readdir(dir);
  await walk(files, dir);
};

// readdir("/home/thulio");
readdir();
