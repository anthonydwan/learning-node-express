const fs = require("fs");
try {
  const data = fs.readFileSync(
    "/home/anthony/git_projects/node-learning/testing.txt",
    "utf8"
  );
  console.log(data);
} catch (err) {
  console.log(err);
}
