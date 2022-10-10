const app = require("express")();
const fs = require("fs");
var cors = require("cors");
const PORT = 8080;
const path = require("path");

app.use(cors());
app.get("/checkwords/:words", (req, res) => {
  var str_words = req.params.words;
  var words = str_words.split("|");

  res.status(200).send(checkExistence(words));
});

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

/* Check existence of words
 To improve performance, read the file only once.
*/
function checkExistence(words) {
  var notFound = [];

  // read file
  const filePath = path.join(__dirname, "master.txt");
  let content = fs.readFileSync(filePath, "utf8");

  for (let word of words) {
    word = word.trim();

    // continue if word is null or undefined.
    if (!word) {
      continue;
    }

    // prepare the patter for word to be searched.
    // i: Ignore case
    // m: Multi line
    if (!content.toString().match(new RegExp(`^${word}$`, "mi")))
      notFound.push(word);
  }

  return notFound;
}
