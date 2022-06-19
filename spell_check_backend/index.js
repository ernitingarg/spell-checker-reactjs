const app = require("express")();
const fs = require("fs");
var cors = require("cors");
const PORT = 8080;

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
  let content = fs.readFileSync("master.txt", "utf8");

  // lowercase the data to ignore case.
  content = content.toLowerCase();

  for (let word of words) {
    word = word.trim();

    // continue if word is null or undefined.
    if (!word) {
      continue;
    }

    // prepare the patter for word to be searched.
    var pattern = new RegExp("\r\n" + word.trim().toLowerCase() + "\r\n");
    if (!pattern.test(content)) {
      if (notFound.indexOf(word) == -1) {
        notFound.push(word);
      }
    }
  }

  return notFound;
}
