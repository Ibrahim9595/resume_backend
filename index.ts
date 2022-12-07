import express from "express";
import bodyParser from "body-parser";
import { errorHandlerMiddleware } from "./src/utils/error-handler-middleware";
import { authRouter } from "./src/services/auth";
import { resumeRouter } from "./src/services/resume";

const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/resume", resumeRouter);
app.use(errorHandlerMiddleware);

app.get("/health", (_, res) => res.json({ success: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
