import serverless from "serverless-http";
import express from "express";
const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

module.exports.handler = serverless(app);