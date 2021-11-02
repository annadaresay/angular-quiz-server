import express from "express";
import fetch from "node-fetch";
import { parse } from "node-html-parser";
import { getPersonData } from "./getPersonData.js";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.send(`Hello, World!`);
});

app.get("/api/persons", async (_req, res) => {
  const response = await fetch("https://daresay.co/about-us/people/");
  const body = await response.text();

  const root = parse(body);
  const personGrid = root.querySelector(".personGrid");
  const persons = personGrid.querySelectorAll(".gridItem");

  let result = [];
  for (const person of persons) {
    const data = getPersonData(person);

    if (data) {
      result.push(data);
    }
  }

  res.send({ persons: result });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
