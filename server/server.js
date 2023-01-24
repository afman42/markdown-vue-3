const fs = require("node:fs");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
const { mdToPdf } = require("md-to-pdf");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "*" }));

app.post("/save", async (req, res) => {
  const body = req.body.text;
  const pdf = await mdToPdf(
    { content: body },
    { dest: "./public/hello.pdf" }
  ).catch((err) => {
    return res.json({
      fileSave: false,
      err,
    });
  });

  if (pdf) {
    return res.json({
      fileSave: true,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server Listening on port : ${PORT}`);
});
