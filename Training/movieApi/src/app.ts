import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { movieRouter } from "./routers/movie.router";
import { logger } from "./middleware/logger.middleware";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(logger);
app.use("/movies", movieRouter);

app.use((error: Error, req: Request, res: Response) => {
  console.log(`${error}, ${req}, ${res}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
