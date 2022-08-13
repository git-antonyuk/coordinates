import express from "express";
import cors from "cors";
import {
  getRandomLocations,
  DEFAULT_PARAMS,
  getCenter,
} from "./getRandomLocations.js";

const PORT = 5050;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/random-coordinates", (req, res) => {
  const LIMIT = 1000;

  const southWest = req.body?.southWest || DEFAULT_PARAMS.southWest;
  const northWest = req.body?.northWest || DEFAULT_PARAMS.northWest;
  const count = req.body?.count || DEFAULT_PARAMS.count;

  if (count > LIMIT) {
    res.status(422).send(`Count limit, max is ${LIMIT}`);
    return;
  }

  const result = {
    center: getCenter(southWest, northWest),
    items: getRandomLocations(southWest, northWest, count),
  };

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
