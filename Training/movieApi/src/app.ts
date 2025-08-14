import express from "express";
import bodyParser from "body-parser";
import { movieRouter } from "./routers/movie.router.js";
import {logger} from "./middleware/logger.middleware.js"

const app = express();
const port = process.env.PORT;

// basically tells the system that you want json to be used.
app.use(bodyParser.json());
app.use(logger);
app.use("/movies", movieRouter);


// start a server and make it listen for incoming requests on a specified port and host
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
