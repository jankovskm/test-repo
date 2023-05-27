const express = require("express");
const config = require("./pkg/config");

// we require db so that we connect
require("./pkg/db");
const { expressjwt: jwt } = require("express-jwt");

const { getAll, getOne, create, update, remove } = require("./handlers/pets");
const { login, register, refreshToken, forgotPassword, resetPassword } = require("./handlers/auth");

const api = express();

api.use(express.json());
api.set("view engine", "ejs");

api.use(
  jwt({
    secret: config.get("development").jwt_key,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/v1/auth/login",
      "/api/v1/auth/register",
      "/api/v1/auth/forgot-password",
      "/api/v1/auth/reset-password",
    ],
  })
);

api.post("/api/v1/auth/login", login);
api.post("/api/v1/auth/register", register);
api.get("/api/v1/auth/refresh-token", refreshToken);
api.post("/api/v1/auth/forgot-password", forgotPassword);
api.post("/api/v1/auth/reset-password", resetPassword);
api.get("/forgot-password", (req, res) => {
  res.render("forgot_password");
});

api.get("/api/pets", getAll);
api.get("/api/pets/:id", getOne);
api.post("/api/pets", create);
api.put("/api/pets/:id", update);
api.delete("/api/pets/:id", remove);

api.listen(config.get("development").port, (err) => {
  err
    ? console.log(err)
    : console.log(`Server started on port ${config.get("development").port}`);
});
